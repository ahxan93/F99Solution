import { NextResponse } from "next/server";
import { isValidObjectId, type UpdateQuery } from "mongoose";
import { requireAdminApi } from "@/lib/admin";
import { leadUpdateSchema } from "@/lib/admin-schemas";
import { Lead, type LeadDoc } from "@/models/Lead";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const parsed = leadUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  }
  const { status, followUpDate, addNote, removeNoteId } = parsed.data;

  // Removing and adding notes touch the same array, so they run as separate operations.
  if (removeNoteId) {
    await Lead.updateOne({ _id: id }, { $pull: { notes: { _id: removeNoteId } } });
  }

  const update: UpdateQuery<LeadDoc> = {};
  if (status) update.$set = { ...update.$set, status };
  if (followUpDate)
    update.$set = { ...update.$set, followUpDate: new Date(`${followUpDate}T00:00:00.000Z`) };
  if (followUpDate === null) update.$unset = { followUpDate: 1 };
  if (addNote) update.$push = { notes: { text: addNote, createdAt: new Date() } };

  const lead =
    Object.keys(update).length > 0
      ? await Lead.findByIdAndUpdate(id, update, { new: true }).lean()
      : await Lead.findById(id).lean();
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  return NextResponse.json({
    ok: true,
    status: lead.status,
    followUpDate: lead.followUpDate?.toISOString().slice(0, 10) ?? null,
    notes: (lead.notes ?? []).map((n) => ({
      id: String(n._id),
      text: n.text,
      createdAt: n.createdAt.toISOString(),
    })),
  });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await Lead.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}

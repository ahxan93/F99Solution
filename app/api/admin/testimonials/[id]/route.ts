import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";
import { requireAdminApi } from "@/lib/admin";
import { testimonialInputSchema } from "@/lib/admin-schemas";
import { Testimonial } from "@/models/Testimonial";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const parsed = testimonialInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  }
  const doc = await Testimonial.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

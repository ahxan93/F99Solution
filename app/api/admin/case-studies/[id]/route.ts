import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";
import { requireAdminApi } from "@/lib/admin";
import { caseStudyInputSchema } from "@/lib/admin-schemas";
import { CaseStudyModel } from "@/models/CaseStudy";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const parsed = caseStudyInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const i = parsed.error.issues[0];
    return NextResponse.json(
      { error: i ? `${i.path.join(".") || "form"}: ${i.message}` : "Invalid data" },
      { status: 400 },
    );
  }
  try {
    const doc = await CaseStudyModel.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    if (typeof err === "object" && err && "code" in err && err.code === 11000) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    throw err;
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await CaseStudyModel.findByIdAndDelete(id);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

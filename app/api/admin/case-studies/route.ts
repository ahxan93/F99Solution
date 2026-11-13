import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin";
import { caseStudyInputSchema } from "@/lib/admin-schemas";
import { CaseStudyModel } from "@/models/CaseStudy";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const parsed = caseStudyInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const i = parsed.error.issues[0];
    return NextResponse.json(
      { error: i ? `${i.path.join(".") || "form"}: ${i.message}` : "Invalid data" },
      { status: 400 },
    );
  }
  try {
    const doc = await CaseStudyModel.create(parsed.data);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
  } catch (err) {
    if (typeof err === "object" && err && "code" in err && err.code === 11000) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    throw err;
  }
}

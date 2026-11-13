import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { Testimonial } from "@/models/Testimonial";
import { TestimonialManager } from "@/components/admin/testimonial-manager";

export const metadata: Metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  await requireAdmin();
  const rows = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Testimonials</h1>
      <TestimonialManager
        items={rows.map((t) => ({
          id: String(t._id),
          quote: t.quote,
          name: t.name,
          role: t.role ?? "",
          published: t.published,
          order: t.order,
        }))}
      />
    </div>
  );
}

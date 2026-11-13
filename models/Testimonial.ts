import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const testimonialSchema = new Schema(
  {
    quote: { type: String, required: true, trim: true, maxlength: 1000 },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, trim: true, maxlength: 120 },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema>;

export const Testimonial: Model<TestimonialDoc> =
  (mongoose.models.Testimonial as Model<TestimonialDoc> | undefined) ??
  mongoose.model<TestimonialDoc>("Testimonial", testimonialSchema);

import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const resultSchema = new Schema(
  {
    label: { type: String, required: true },
    before: { type: Number, required: true },
    after: { type: Number, required: true },
    unit: String,
    lowerIsBetter: Boolean,
  },
  { _id: false },
);

const caseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    client: { type: String, required: true, trim: true },
    industry: { type: String, trim: true },
    serviceSlug: { type: String, required: true, index: true },
    serviceLabel: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, trim: true },
    metric: { type: String, required: true },
    metricLabel: { type: String, required: true },
    duration: { type: String },
    challenge: { type: String, required: true },
    strategy: { type: [String], default: [] },
    results: { type: [resultSchema], default: [] },
    trend: {
      label: String,
      unit: String,
      points: { type: [Number], default: [] },
    },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type CaseStudyDoc = InferSchemaType<typeof caseStudySchema>;

export const CaseStudyModel: Model<CaseStudyDoc> =
  (mongoose.models.CaseStudy as Model<CaseStudyDoc> | undefined) ??
  mongoose.model<CaseStudyDoc>("CaseStudy", caseStudySchema);

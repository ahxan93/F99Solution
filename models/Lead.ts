import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { leadSources } from "@/lib/validators";
import { leadStatuses } from "@/lib/lead-constants";

const noteSchema = new Schema(
  {
    text: { type: String, required: true, trim: true, maxlength: 2000 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const leadSchema = new Schema(
  {
    name: { type: String, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    source: { type: String, enum: leadSources, required: true, index: true },
    service: { type: String, trim: true, index: true },
    budget: { type: String, trim: true },
    website: { type: String, trim: true },
    businessType: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 2000 },
    /** Free-form extras, e.g. calculator inputs/results. */
    details: { type: Schema.Types.Mixed },
    status: { type: String, enum: leadStatuses, default: "new", index: true },
    notes: { type: [noteSchema], default: [] },
    followUpDate: { type: Date },
    ip: { type: String },
  },
  { timestamps: true },
);

leadSchema.index({ createdAt: -1 });

export type LeadDoc = InferSchemaType<typeof leadSchema>;

export const Lead: Model<LeadDoc> =
  (mongoose.models.Lead as Model<LeadDoc> | undefined) ??
  mongoose.model<LeadDoc>("Lead", leadSchema);

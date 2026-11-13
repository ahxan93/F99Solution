import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const rateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  /** MongoDB TTL index removes the document automatically at this time. */
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export type RateLimitDoc = InferSchemaType<typeof rateLimitSchema>;

export const RateLimit: Model<RateLimitDoc> =
  (mongoose.models.RateLimit as Model<RateLimitDoc> | undefined) ??
  mongoose.model<RateLimitDoc>("RateLimit", rateLimitSchema);

import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, trim: true, default: "Admin" },
    /** bcrypt hash — never store the plain password. */
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);

export type AdminUserDoc = InferSchemaType<typeof adminUserSchema>;

export const AdminUser: Model<AdminUserDoc> =
  (mongoose.models.AdminUser as Model<AdminUserDoc> | undefined) ??
  mongoose.model<AdminUserDoc>("AdminUser", adminUserSchema);

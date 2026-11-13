/**
 * Creates (or updates the password of) the first admin user from .env values.
 *
 *   npm run seed:admin
 *
 * Reads MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD (and optional ADMIN_NAME).
 * Self-contained on purpose: it talks to the "adminusers" collection directly
 * so it can run with plain Node, outside Next.js.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Missing MONGODB_URI, ADMIN_EMAIL or ADMIN_PASSWORD. Set them in .env.local.");
  process.exit(1);
}
if (ADMIN_PASSWORD.length < 10 || ADMIN_PASSWORD === "change-me-strong-password") {
  console.error("ADMIN_PASSWORD must be at least 10 characters and not the example value.");
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);
const users = mongoose.connection.collection("adminusers");
const email = ADMIN_EMAIL.trim().toLowerCase();
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const now = new Date();

const existing = await users.findOne({ email });
if (existing) {
  await users.updateOne({ email }, { $set: { passwordHash, updatedAt: now } });
  console.log(`Updated password for existing admin: ${email}`);
} else {
  await users.insertOne({
    email,
    name: ADMIN_NAME ?? "Admin",
    passwordHash,
    role: "admin",
    createdAt: now,
    updatedAt: now,
    __v: 0,
  });
  console.log(`Created admin user: ${email}`);
}
await mongoose.disconnect();

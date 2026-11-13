import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 }, // 8-hour sessions
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw, request) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        await connectDB();

        // Throttle brute-force attempts: 10 tries / IP / 15 min.
        const ip = getClientIp(request.headers);
        const rl = await rateLimit({ key: `login:${ip}`, limit: 10, windowSeconds: 900 });
        if (!rl.allowed) return null;

        const user = await AdminUser.findOne({ email: parsed.data.email }).select("+passwordHash");
        // Compare against a dummy hash when the user is missing to keep timing similar.
        const hash =
          user?.passwordHash ?? "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidi";
        const ok = await bcrypt.compare(parsed.data.password, hash);
        if (!user || !ok) return null;

        return { id: String(user._id), email: user.email, name: user.name ?? "Admin" };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.uid = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.uid === "string") session.user.id = token.uid;
      return session;
    },
  },
});

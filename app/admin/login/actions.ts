"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

/** Only allow redirects back into /admin (prevents open-redirect abuse). */
function safeRedirect(from: FormDataEntryValue | null): string {
  const v = typeof from === "string" ? from : "";
  return v.startsWith("/admin") && !v.startsWith("//") ? v : "/admin";
}

export async function loginAction(
  _prev: string | null,
  formData: FormData,
): Promise<string | null> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: safeRedirect(formData.get("from")),
    });
    return null;
  } catch (err) {
    if (err instanceof AuthError)
      return "Invalid email or password, or too many attempts. Try again later.";
    throw err; // lets Next.js handle the success redirect
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/admin/login" });
}

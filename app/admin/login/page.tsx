import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { siteConfig } from "@/config/site";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  if ((await auth())?.user) redirect("/admin");
  const { from } = await searchParams;

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="border-border bg-surface w-full max-w-md rounded-3xl border p-8 shadow-xl">
        <h1 className="text-2xl font-bold">{siteConfig.name} Admin</h1>
        <p className="text-muted mt-1 mb-6 text-sm">Sign in to manage leads and content.</p>
        <LoginForm from={from ?? "/admin"} />
      </div>
    </div>
  );
}

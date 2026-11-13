import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { getServiceNav } from "@/lib/service-nav";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteShell } from "@/components/layout/site-shell";
import { DeferredCookieConsent } from "@/components/layout/deferred-cookie-consent";
import { Analytics } from "@/components/analytics/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

// Variable fonts: one file per family covers every weight in use (400-700), which is fewer
// requests than separate static weights. Only the heading font (Sora, used by the hero H1) is
// preloaded; the body font loads right after, with a size-matched fallback so nothing shifts.
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Digital Marketing Agency in Mumbai`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a17" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <SiteShell navbar={<Navbar nav={getServiceNav()} />} footer={<Footer />}>
              {children}
            </SiteShell>
          </SmoothScroll>
          <DeferredCookieConsent />
          <Analytics />
          <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        </ThemeProvider>
      </body>
    </html>
  );
}

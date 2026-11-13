"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";

// IDs come from NEXT_PUBLIC_* env vars. Each tracker loads ONLY if its ID is set
// and passes a strict format check (so a bad value can never inject script).
const clean = (v: string | undefined, rx: RegExp): string | null => (v && rx.test(v) ? v : null);
const GA4 = clean(process.env.NEXT_PUBLIC_GA4_ID, /^G-[A-Z0-9]{4,20}$/);
const GTM = clean(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]{4,12}$/);
const PIXEL = clean(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d{5,20}$/);

/** Sends a Meta Pixel PageView on client-side route changes (the first one is in the snippet). */
function PixelRouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);
  return null;
}

/** Loads analytics only after the visitor accepts cookies. Renders nothing if no IDs are configured. */
export function Analytics() {
  const consent = useConsent();
  if (consent !== "granted" || (!GA4 && !GTM && !PIXEL)) return null;

  return (
    <>
      {GTM && (
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      )}
      {GA4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`}
            strategy="lazyOnload"
          />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {PIXEL && (
        <>
          <Script id="meta-pixel" strategy="lazyOnload">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
          </Script>
          <PixelRouteTracker />
        </>
      )}
    </>
  );
}

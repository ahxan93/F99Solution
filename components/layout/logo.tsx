import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Brand logo. Both theme variants are rendered and toggled with CSS (`dark:` variant on the
 * `.dark` class that next-themes sets before first paint), so there is no flash on theme change.
 * Under 380px wide only the square mark is shown. SVGs are served as-is (`unoptimized`).
 */
export function Logo({ className, height = 40 }: { className?: string; height?: number }) {
  const alt = siteConfig.name;
  const width = Math.round((height * 758) / 160);
  return (
    <Link
      href="/"
      aria-label={alt}
      className={`inline-flex shrink-0 items-center ${className ?? ""}`}
    >
      <Image
        src="/brand/f99-mark.svg"
        alt={alt}
        width={height}
        height={height}
        unoptimized
        className="block min-[380px]:hidden"
        style={{ height, width: height }}
      />
      <Image
        src="/brand/f99-logo-light.svg"
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="hidden w-auto min-[380px]:block dark:min-[380px]:hidden"
        style={{ height }}
      />
      <Image
        src="/brand/f99-logo-dark.svg"
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        unoptimized
        className="hidden w-auto dark:min-[380px]:block"
        style={{ height }}
      />
    </Link>
  );
}

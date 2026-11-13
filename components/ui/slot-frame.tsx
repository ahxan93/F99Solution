import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ServiceIconName } from "@/data/services";
import { cn } from "@/lib/utils";
import { BrandIllustration } from "@/components/ui/brand-illustration";

type Overlay =
  | "none"
  /** Page background: theme-aware and light. The images are dark navy already, so dark mode needs little; light mode needs enough page colour for dark text (AA). */
  | "background"
  /** Light navy tint for the CTA band (white text on top, both themes). */
  | "navy";

/** Lean photo data (no credits), safe to pass to client components. */
export interface SlotPhoto {
  src: string;
  alt: string;
  blurDataURL: string;
}

interface SlotFrameProps {
  /** The photo, or null/undefined to show the branded illustration. */
  asset?: SlotPhoto | null;
  /** Icon for the branded illustration shown when the slot has no photo. */
  icon: ServiceIconName | LucideIcon;
  /** Required: the rendered width of the image across breakpoints. */
  sizes: string;
  overlay?: Overlay;
  /** Only for the above-the-fold image of a page (Next.js 16 `preload`). Others lazy-load. */
  preload?: boolean;
  /** Overrides the descriptive alt text from the credits file. Use "" for purely decorative images. */
  alt?: string;
  /** Sizing / positioning of the frame, e.g. "aspect-video rounded-2xl" or "absolute inset-0". */
  className?: string;
  imgClassName?: string;
}

const overlays: Record<Exclude<Overlay, "none">, string> = {
  background:
    "bg-gradient-to-b from-background/80 via-background/75 to-background dark:from-background/70 dark:via-background/65 dark:to-background/90",
  navy: "bg-gradient-to-br from-[#0a2a8a]/70 via-[#0b1c5c]/62 to-[#060a17]/75",
};

/**
 * A photo frame. Renders the downloaded photo with next/image (fill, blur placeholder, lazy unless
 * `preload`), or a branded illustration when there is no photo. Always a positioned,
 * overflow-hidden frame: give it a size with `className`.
 */
export function SlotFrame({
  asset,
  icon,
  sizes,
  overlay = "none",
  preload = false,
  alt,
  className,
  imgClassName,
}: SlotFrameProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {asset ? (
        <Image
          src={asset.src}
          alt={alt ?? asset.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          preload={preload}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <BrandIllustration icon={icon} />
      )}
      {overlay !== "none" && (
        <div aria-hidden="true" className={cn("absolute inset-0", overlays[overlay])} />
      )}
    </div>
  );
}

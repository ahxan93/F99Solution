import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { ServiceIcon } from "@/components/ui/service-icon";
import { SlotImage } from "@/components/ui/slot-image";
import { TiltCard } from "@/components/ui/tilt-card";

/** Service card with a 16:9 photo on top; the icon overlaps the photo's bottom edge. */
export function ServiceCard({ service: s, cta }: { service: Service; cta: string }) {
  return (
    <TiltCard>
      <Link href={`/services/${s.slug}`} className="block h-full">
        <SlotImage
          slot={`${s.slug}-card`}
          icon={s.icon}
          overlay="card"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          className="aspect-[3/2]"
        />
        <div className="px-7 pb-7">
          <span className="bg-accent-solid text-accent-foreground shadow-glow relative -mt-6 grid size-12 place-items-center rounded-2xl">
            <ServiceIcon name={s.icon} className="size-6" />
          </span>
          <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
          <p className="text-muted mt-2 text-sm leading-relaxed">{s.short}</p>
          <span className="text-accent mt-6 inline-flex items-center gap-1 text-sm font-semibold">
            {cta} <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}

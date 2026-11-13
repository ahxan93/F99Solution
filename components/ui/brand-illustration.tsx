import type { LucideIcon } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { ServiceIconName } from "@/data/services";

/**
 * Branded stand-in for a slot that has no suitable photo: navy background, electric-blue and
 * orange glows, orbit rings and a glass icon tile, matching the site's 3D / glass hero style.
 * Fills its (relatively positioned) parent. Purely decorative, so it is hidden from assistive tech.
 */
export function BrandIllustration({ icon }: { icon: ServiceIconName | LucideIcon }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,#060a17_0%,#0b1640_55%,#12307f_130%)]"
    >
      {/* soft glows */}
      <div className="absolute -top-1/3 -right-1/6 size-[75%] rounded-full bg-[#2563ff]/35 blur-3xl" />
      <div className="absolute -bottom-1/3 -left-1/6 size-[60%] rounded-full bg-[#ff8a3d]/20 blur-3xl" />
      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:36px_36px]" />
      {/* orbit rings */}
      <svg
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        fill="none"
      >
        <ellipse
          cx="200"
          cy="112"
          rx="150"
          ry="52"
          stroke="#5090ff"
          strokeOpacity="0.45"
          transform="rotate(-18 200 112)"
        />
        <ellipse
          cx="200"
          cy="112"
          rx="110"
          ry="38"
          stroke="#ff8a3d"
          strokeOpacity="0.5"
          transform="rotate(14 200 112)"
        />
        <circle cx="318" cy="76" r="4" fill="#ff8a3d" />
        <circle cx="86" cy="150" r="3" fill="#5090ff" />
        <circle cx="300" cy="170" r="2" fill="#ffffff" fillOpacity="0.7" />
      </svg>
      {/* glass icon tile */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid aspect-square w-[22%] max-w-28 min-w-14 place-items-center rounded-[28%] border border-white/20 bg-white/10 text-white shadow-[0_0_48px_-8px_#2563ff] backdrop-blur-md">
          {typeof icon === "string" ? (
            <ServiceIcon name={icon} className="size-[50%]" />
          ) : (
            (() => {
              const Icon = icon;
              return <Icon className="size-[50%]" aria-hidden="true" />;
            })()
          )}
        </div>
      </div>
    </div>
  );
}

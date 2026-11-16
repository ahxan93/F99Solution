import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { HeroServiceItem } from "@/lib/service-nav";
import { ServiceIcon } from "@/components/ui/service-icon";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";

/**
 * "Lite" hero scene for phones and low-power devices: the same Earth + tilted rings + orbiting glass
 * service cards as the three.js scene, in pure CSS / SVG. No JavaScript animation loop.
 *
 *  - Earth: a circle clipping a double-width strip of the day texture that slides sideways
 *    (transform: translateX, so it runs on the compositor) for one seamless turn every 40 s.
 *    Inset shadows give the sphere shading (lit top-left) and a blue glow is the atmosphere.
 *  - Orbits: an ellipse is two perpendicular, sine-eased, alternating translations (x and y) with a
 *    quarter-period phase offset, inside a rotated wrapper that sets the ring's tilt.
 *  - Depth: every orbiter is rendered twice, once under the Earth (dimmed) and once over it, and an
 *    opacity animation swaps them as the orbiter crosses the far / near half of its ring.
 *  - Everything animates transform / opacity only. Animations pause via `data-paused` (hero
 *    off-screen) and are off for prefers-reduced-motion (the parent also does not mount this).
 *
 * Design space is a 400 x 400 box scaled to fit the stage (see `.lite-box` in globals.css).
 */

export const LITE_TEXTURE = "/textures/earth-day-1024.webp";
const MAX_CARDS = 6;

interface RingDef {
  /** Semi-major / semi-minor axes in design px. */
  a: number;
  b: number;
  /** Tilt of the ring in degrees. */
  rot: number;
  color: "blue" | "orange";
  /** Card loop seconds; negative = reverse direction. */
  period: number;
  /** Light-dot loop seconds; negative = reverse direction. */
  dotPeriod: number;
}

const RINGS: RingDef[] = [
  { a: 150, b: 62, rot: -64, color: "blue", period: 46, dotPeriod: 14 },
  { a: 138, b: 70, rot: 58, color: "blue", period: -52, dotPeriod: -18 },
  { a: 126, b: 48, rot: -28, color: "blue", period: 58, dotPeriod: 22 },
  { a: 160, b: 88, rot: 76, color: "orange", period: -44, dotPeriod: -16 },
];

/** Card slots: [ring index, start angle in radians]. Spaced so cards never bunch up. */
const CARD_SLOTS: [number, number][] = [
  [0, 0.2],
  [1, 3.0],
  [2, 5.6],
  [3, 1.7],
  [0, 3.35],
  [1, 6.1],
];
const DOT_START = [1.0, 4.2, 2.6, 5.4];

type Layer = "back" | "front";

function orbitStyle(ring: RingDef, period: number, angle: number): CSSProperties {
  const T = Math.abs(period);
  const dir = Math.sign(period);
  const s1 = (angle / (2 * Math.PI)) * T;
  const f = (n: number) => `${n.toFixed(2)}s`;
  return {
    "--a": `${ring.a}px`,
    "--b": `${ring.b}px`,
    "--t": f(T),
    "--dx": f(-s1),
    "--dy": f(-(s1 + (dir * T) / 4)),
    "--rot": `${ring.rot}deg`,
  } as CSSProperties;
}

function Orbiter({
  ring,
  period,
  angle,
  layer,
  children,
}: {
  ring: RingDef;
  period: number;
  angle: number;
  layer: Layer;
  children: ReactNode;
}) {
  return (
    <div className="lite-ring" style={{ "--rot": `${ring.rot}deg` } as CSSProperties}>
      <div className="lite-ox" style={orbitStyle(ring, period, angle)}>
        <div className="lite-oy">
          <div className={layer === "front" ? "lite-depth-front" : "lite-depth-back"}>
            <div className="lite-upright">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ service }: { service: HeroServiceItem }) {
  const Brand =
    service.hero.brandIcon === "facebook"
      ? FacebookIcon
      : service.hero.brandIcon === "instagram"
        ? InstagramIcon
        : null;
  return (
    <div className="lite-card">
      <span className="grid size-6 place-items-center rounded-lg bg-white/10">
        {Brand ? (
          <Brand className="size-4" />
        ) : (
          <ServiceIcon name={service.icon} className="size-4" />
        )}
      </span>
      <span className="text-center text-[9.5px] leading-tight font-semibold">
        {service.hero.short}
      </span>
    </div>
  );
}

function RingLine({ ring, layer }: { ring: RingDef; layer: Layer }) {
  const stroke = ring.color === "blue" ? "#4d8dff" : "#ff9a3d";
  const half = `M ${-ring.a} 0 A ${ring.a} ${ring.b} 0 0 0 ${ring.a} 0`;
  return (
    <div className="lite-ring" style={{ "--rot": `${ring.rot}deg` } as CSSProperties}>
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 size-full" aria-hidden="true">
        {layer === "back" ? (
          <>
            <ellipse
              rx={ring.a}
              ry={ring.b}
              fill="none"
              stroke={stroke}
              strokeOpacity={0.1}
              strokeWidth={6}
            />
            <ellipse
              rx={ring.a}
              ry={ring.b}
              fill="none"
              stroke={stroke}
              strokeOpacity={0.4}
              strokeWidth={1.2}
            />
          </>
        ) : (
          <>
            <path d={half} fill="none" stroke={stroke} strokeOpacity={0.16} strokeWidth={6} />
            <path d={half} fill="none" stroke={stroke} strokeOpacity={0.9} strokeWidth={1.4} />
          </>
        )}
      </svg>
    </div>
  );
}

function Orbits({ layer, services }: { layer: Layer; services: HeroServiceItem[] }) {
  return (
    <div className="lite-layer">
      {RINGS.map((ring, i) => (
        <RingLine key={`r${i}`} ring={ring} layer={layer} />
      ))}
      {RINGS.map((ring, i) => (
        <Orbiter
          key={`d${i}`}
          ring={ring}
          period={ring.dotPeriod}
          angle={DOT_START[i]}
          layer={layer}
        >
          <span className={cn("lite-dot", ring.color === "orange" && "lite-dot-orange")} />
        </Orbiter>
      ))}
      {services.map((s, i) => {
        const [ringIdx, angle] = CARD_SLOTS[i];
        const ring = RINGS[ringIdx];
        return (
          <Orbiter key={s.slug} ring={ring} period={ring.period} angle={angle} layer={layer}>
            <Card service={s} />
          </Orbiter>
        );
      })}
    </div>
  );
}

export function HeroLite({
  heroServices,
  paused,
}: {
  heroServices: HeroServiceItem[];
  paused: boolean;
}) {
  const services = [...heroServices]
    .sort((a, b) => a.hero.order - b.hero.order)
    .slice(0, MAX_CARDS);
  return (
    <div className="lite-root" data-paused={paused ? "" : undefined} aria-hidden="true">
      <div className="lite-stars" />
      <div className="lite-box">
        <div className="lite-atmosphere" />
        <Orbits layer="back" services={services} />
        <div className="lite-earth">
          <div className="lite-earth-strip" style={{ backgroundImage: `url(${LITE_TEXTURE})` }} />
          <div className="lite-earth-shade" />
        </div>
        <Orbits layer="front" services={services} />
      </div>
    </div>
  );
}

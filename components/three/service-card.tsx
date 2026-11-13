"use client";

import { useMemo, useRef, type MouseEvent } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroServiceItem } from "@/lib/service-nav";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { ServiceIcon } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils";
import type { OrbitStore } from "./orbit-store";
import { segmentHitsSphere, type Vec3 } from "./scene-math";
import type { RingSpec } from "./scene-config";

/** slug → the card's DOM wrapper. The scene writes position/opacity into these every frame. */
export type CardRegistry = Map<string, HTMLElement>;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * 3D side of one orbiting card: an empty group riding on its ring. Every frame it projects its world
 * position to screen space and writes transform/opacity straight onto the card's DOM element
 * (see CardLink). No drei <Html>, so there is no per-card React root and no React render per frame.
 */
export function OrbitCard({
  service,
  ring,
  startAngle,
  stillAngle,
  orbit,
  cards,
  still,
}: {
  service: HeroServiceItem;
  ring: RingSpec;
  startAngle: number;
  /** Angle used when nothing moves (prefers-reduced-motion). */
  stillAngle: number;
  orbit: OrbitStore;
  cards: CardRegistry;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const opacity = useRef(0);
  const world = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector3(), []);
  const size = useThree((s) => s.size);
  const dir = Math.sign(ring.period) || 1;
  const angularSpeed = (Math.PI * 2) / Math.abs(ring.period);

  // Runs before the Earth/parallax frames read anything (priority -1).
  useFrame((frame, dt) => {
    const g = group.current;
    if (!g) return;

    const angle = still ? stillAngle : startAngle + dir * angularSpeed * orbit.t;
    g.position.set(Math.cos(angle) * ring.radius, 0, Math.sin(angle) * ring.radius);
    g.getWorldPosition(world);

    const cam = frame.camera.position;
    const p: Vec3 = [world.x, world.y, world.z];
    const hidden = segmentHitsSphere([cam.x, cam.y, cam.z], p, orbit.center, orbit.radius);
    // −1 (far side) … +1 (near side), measured along the view axis.
    const depth = Math.max(-1, Math.min(1, (world.z - orbit.center[2]) / orbit.orbitExtent));
    const depth01 = clamp01(depth * 0.5 + 0.5);

    const el = cards.get(service.slug);
    const engaged = el?.dataset.engaged === "1";

    const target = engaged ? 1 : hidden ? 0 : 0.5 + 0.5 * depth01;
    opacity.current += (target - opacity.current) * Math.min(1, dt * 9);
    if (still) opacity.current = target; // no easing needed for a single still frame

    if (el) {
      ndc.copy(world).project(frame.camera);
      const x = (ndc.x * 0.5 + 0.5) * size.width;
      const y = (-ndc.y * 0.5 + 0.5) * size.height;
      const scale = engaged ? 1.14 : 0.86 + 0.28 * depth01;
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.current.toFixed(3);
      // A card hidden behind the Earth must not catch the pointer, but stays keyboard-focusable.
      el.style.pointerEvents = opacity.current < 0.2 && !engaged ? "none" : "auto";
    }
  }, -1);

  return <group ref={group} />;
}

/**
 * DOM side of one card: a real <a href> (keyboard focusable, right-click / open-in-new-tab work); a
 * plain left click navigates client-side. Hover / focus pause the orbit via the shared OrbitStore.
 */
export function CardLink({
  service,
  mobile,
  orbit,
  registry,
  onNavigate,
  onPrefetch,
}: {
  service: HeroServiceItem;
  mobile: boolean;
  orbit: OrbitStore;
  registry: CardRegistry;
  onNavigate: (href: string) => void;
  onPrefetch: (href: string) => void;
}) {
  const hero = service.hero;
  const href = `/services/${service.slug}`;
  const label = mobile ? hero.short : hero.label;
  const state = useRef({ hover: false, focus: false });

  const engage = (kind: "hover" | "focus", on: boolean, el: HTMLElement | null) => {
    const st = state.current;
    if (st[kind] === on) return;
    st[kind] = on;
    orbit.engage(on ? 1 : -1);
    if (el) el.dataset.engaged = st.hover || st.focus ? "1" : "0";
    if (on) onPrefetch(href);
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle modified clicks (new tab / window / download).
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onNavigate(href);
  };

  const Icon =
    hero.brandIcon === "facebook"
      ? FacebookIcon
      : hero.brandIcon === "instagram"
        ? InstagramIcon
        : null;

  return (
    <div
      ref={(el) => {
        if (el) registry.set(service.slug, el);
        else registry.delete(service.slug);
      }}
      style={{ opacity: 0 }}
      className="absolute top-0 left-0 origin-center will-change-transform"
    >
      <a
        href={href}
        aria-label={label}
        onClick={handleClick}
        onPointerEnter={(e) => engage("hover", true, e.currentTarget.parentElement)}
        onPointerLeave={(e) => engage("hover", false, e.currentTarget.parentElement)}
        onFocus={(e) => engage("focus", true, e.currentTarget.parentElement)}
        onBlur={(e) => engage("focus", false, e.currentTarget.parentElement)}
        className={cn(
          "group flex flex-col items-center rounded-2xl border border-sky-300/30 bg-[#0a1230]/80 text-white",
          "shadow-[0_0_26px_-8px_rgba(80,144,255,0.85),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out",
          "hover:-translate-y-1.5 hover:border-sky-200/80 hover:bg-[#0f1d4a]/85 hover:shadow-[0_0_38px_-2px_rgba(120,175,255,1),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "focus-visible:-translate-y-1.5 focus-visible:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
          mobile ? "w-[5rem] gap-1 px-1.5 py-2" : "w-[7rem] gap-1.5 px-2.5 py-3",
        )}
      >
        <span
          className={cn(
            "grid place-items-center rounded-xl bg-white/10 text-white",
            mobile ? "size-6" : "size-9",
          )}
        >
          {Icon ? (
            <Icon className={mobile ? "size-4" : "size-5"} />
          ) : (
            <ServiceIcon name={service.icon} className={mobile ? "size-4" : "size-5"} />
          )}
        </span>
        <span
          className={cn(
            "text-center leading-tight font-semibold",
            mobile ? "text-[9.5px]" : "text-[11px]",
          )}
        >
          {label}
        </span>
      </a>
    </div>
  );
}

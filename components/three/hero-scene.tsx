"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { HeroServiceItem } from "@/lib/service-nav";
import { EarthSystem } from "./earth";
import { GlassFragments, RingGroup } from "./orbit-rings";
import { CardLink, OrbitCard, type CardRegistry } from "./service-card";
import { OrbitStore } from "./orbit-store";
import { computeSystemScale, solveStillAngles } from "./scene-math";
import {
  baseCameraZ,
  CAMERA_FOV,
  CARD_PX,
  DESKTOP_SLOTS,
  EARTH_RADIUS,
  GLOW_BOOST,
  MOBILE_SLOTS,
  ringsFor,
  STAGE_BG,
  SUN_DIRECTION,
} from "./scene-config";

/**
 * Scroll progress (0 → 1) measured from the STAGE itself: 0 while the stage is fully below the
 * top of the viewport, rising as it scrolls up and out. (Measuring page scroll instead pushed the
 * scene out of the panel whenever the stage sat lower on the page, e.g. the stacked mobile layout.)
 * Updated outside React's render loop.
 */
function useScrollProgress() {
  const progress = useRef(0);
  const canvas = useThree((s) => s.gl.domElement);
  useEffect(() => {
    const onScroll = () => {
      const r = canvas.getBoundingClientRect();
      progress.current = Math.min(1, Math.max(0, -r.top / (r.height * 0.8)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [canvas]);
  return progress;
}

/** Mouse parallax + scroll-driven rotation / camera pull-back (no positional drift, so cards can never leave the canvas). Held still for reduced motion and while a card is engaged. */
function Rig({
  children,
  still,
  baseZ,
  orbit,
}: {
  children: ReactNode;
  still: boolean;
  baseZ: number;
  orbit: OrbitStore;
}) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();

  useFrame((state, dt) => {
    const g = group.current;
    // Freeze while a card is hovered/focused so it stays under the cursor.
    if (!g || still || orbit.engaged > 0) return;
    const p = scroll.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.35 + p * 1.2, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.22, 3, dt);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, baseZ + p * 3, 3, dt);
  });

  return <group ref={group}>{children}</group>;
}

/** Advances the orbit clock (easing to a stop while paused) and tracks the Earth for occlusion. */
function OrbitClock({
  orbit,
  earthRef,
  scale,
  orbitRadius,
  still,
}: {
  orbit: OrbitStore;
  earthRef: React.RefObject<THREE.Group | null>;
  scale: number;
  /** Mean ring radius (scene units) used to normalise card depth. */
  orbitRadius: number;
  still: boolean;
}) {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    orbit.advance(dt, still);
    const e = earthRef.current;
    if (e) e.getWorldPosition(v);
    orbit.setEarth([v.x, v.y, v.z], EARTH_RADIUS * scale * 1.04, orbitRadius * scale);
  }, -2);
  return null;
}

/**
 * Gentle vertical bob of the whole system. Driven by the orbit clock (not by wall-clock time like
 * drei's <Float>) so it eases to a stop together with the orbit while a card is hovered / focused,
 * keeping that card perfectly still under the cursor. No bob at all for reduced motion.
 */
function Bob({ orbit, children }: { orbit: OrbitStore; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (group.current) group.current.position.y = Math.sin(orbit.t * 0.75) * 0.07;
  });
  return <group ref={group}>{children}</group>;
}

/** Mounts only once everything above it in the same <Suspense> has finished loading. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    let alive = true;
    const ids: number[] = [];
    // Compile every shader program (in parallel where the GPU driver allows) BEFORE the poster
    // cross-fades out, so the first visible frame never stalls on shader compilation.
    const compile: Promise<unknown> = gl.compileAsync
      ? gl.compileAsync(scene, camera)
      : Promise.resolve(gl.compile(scene, camera));
    compile
      .catch(() => undefined)
      .then(() => {
        if (!alive) return;
        onReady();
        // In "demand" mode (reduced motion) make sure the still frame is actually drawn.
        invalidate();
        ids.push(...[80, 300, 800].map((ms) => window.setTimeout(invalidate, ms)));
      });
    return () => {
      alive = false;
      ids.forEach(window.clearTimeout);
    };
  }, [onReady, invalidate, gl, scene, camera]);
  return null;
}

interface SceneProps {
  services: HeroServiceItem[];
  orbit: OrbitStore;
  cards: CardRegistry;
  lite: boolean;
  mobile: boolean;
  reducedMotion: boolean;
  onReady: () => void;
}

function Scene({ lite, mobile, reducedMotion, onReady, services, orbit, cards }: SceneProps) {
  const size = useThree((s) => s.size);
  const baseZ = baseCameraZ(mobile);
  const boost = lite ? GLOW_BOOST.lite : GLOW_BOOST.full;

  const rings = useMemo(() => ringsFor(mobile), [mobile]);
  const slots = mobile ? MOBILE_SLOTS : DESKTOP_SLOTS;

  // Fit the whole orbit system inside the canvas; recalculated whenever the canvas is resized.
  const scale = useMemo(
    () =>
      computeSystemScale({
        width: size.width,
        height: size.height,
        camZ: baseZ,
        rings,
        card: mobile ? CARD_PX.mobile : CARD_PX.desktop,
      }),
    [size.width, size.height, baseZ, mobile, rings],
  );

  const stillAngles = useMemo(
    () =>
      reducedMotion ? solveStillAngles(slots, rings, scale, baseZ) : slots.map((s) => s.angle),
    [reducedMotion, slots, rings, scale, baseZ],
  );

  const earthRef = useRef<THREE.Group>(null);

  return (
    <>
      <color attach="background" args={[STAGE_BG]} />
      {/* Used by the glass shards; the Earth/clouds/atmosphere use the same sun direction in their shaders */}
      <ambientLight intensity={0.5} color="#b8d0ff" />
      <directionalLight
        position={SUN_DIRECTION.clone().multiplyScalar(8)}
        intensity={2.2}
        color="#fff3e0"
      />

      <Rig still={reducedMotion} baseZ={baseZ} orbit={orbit}>
        <Bob orbit={orbit}>
          <group scale={scale}>
            <Suspense fallback={null}>
              <EarthSystem
                ref={earthRef}
                lite={lite}
                still={reducedMotion}
                glowBoost={boost * 0.9}
              />
              {rings.map((ring, ri) => (
                <RingGroup
                  key={ri}
                  ring={ring}
                  particles={lite ? 1 : 3}
                  boost={boost}
                  still={reducedMotion}
                >
                  {services.map((service, i) =>
                    slots[i].ring === ri ? (
                      <OrbitCard
                        key={service.slug}
                        service={service}
                        ring={ring}
                        startAngle={slots[i].angle}
                        stillAngle={stillAngles[i]}
                        still={reducedMotion}
                        orbit={orbit}
                        cards={cards}
                      />
                    ) : null,
                  )}
                </RingGroup>
              ))}
              <GlassFragments count={lite ? 3 : 6} still={reducedMotion} />
              <ReadySignal onReady={onReady} />
            </Suspense>
          </group>
        </Bob>
      </Rig>

      <OrbitClock
        orbit={orbit}
        earthRef={earthRef}
        scale={scale}
        orbitRadius={rings[2].radius}
        still={reducedMotion}
      />

      <Sparkles
        count={lite ? 22 : 70}
        scale={[12, 8, 6]}
        size={2.2}
        speed={reducedMotion ? 0 : 0.3}
        opacity={0.6}
        color="#9cc2ff"
      />

    </>
  );
}

interface HeroSceneProps {
  heroServices: HeroServiceItem[];
  /** "full": 2048px textures, clouds, Bloom. "lite" (phones / weaker devices): 1024px textures, no clouds, no Bloom, fewer particles. */
  quality: "full" | "lite";
  /** Under 768px: smaller scene with 4 compact cards. */
  mobile: boolean;
  /** Render loop runs only while the hero is on screen. */
  active: boolean;
  reducedMotion: boolean;
  /** Called once the Earth textures have loaded and the globe is on screen. */
  onReady: () => void;
}

export default function HeroScene({
  heroServices,
  quality,
  mobile,
  active,
  reducedMotion,
  onReady,
}: HeroSceneProps) {
  const router = useRouter();
  const ready = useCallback(() => onReady(), [onReady]);
  const lite = quality === "lite";
  const [orbit] = useState(() => new OrbitStore());
  const [cards] = useState<CardRegistry>(() => new Map());

  const services = useMemo(
    () =>
      heroServices
        .filter((s) => !mobile || s.hero.mobileOrder !== undefined)
        .sort((a, b) =>
          mobile
            ? (a.hero.mobileOrder ?? 0) - (b.hero.mobileOrder ?? 0)
            : a.hero.order - b.hero.order,
        ),
    [heroServices, mobile],
  );
  const onNavigate = useCallback((href: string) => router.push(href), [router]);
  const onPrefetch = useCallback((href: string) => router.prefetch(href), [router]);

  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        flat
        frameloop={reducedMotion ? "demand" : active ? "always" : "never"}
        camera={{ position: [0, 0, baseCameraZ(mobile)], fov: CAMERA_FOV }}
        gl={{ antialias: lite, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.domElement.setAttribute("aria-hidden", "true")}
      >
        <Scene
          services={services}
          orbit={orbit}
          cards={cards}
          lite={lite}
          mobile={mobile}
          reducedMotion={reducedMotion}
          onReady={ready}
        />
      </Canvas>
      {/* Card links: plain DOM, positioned every frame by the scene (see service-card.tsx). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {services.map((service) => (
          <CardLink
            key={service.slug}
            service={service}
            mobile={mobile}
            orbit={orbit}
            registry={cards}
            onNavigate={onNavigate}
            onPrefetch={onPrefetch}
          />
        ))}
      </div>
    </>
  );
}

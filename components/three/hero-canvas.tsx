"use client";

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroServiceItem } from "@/lib/service-nav";

/**
 * Hero stage = a static WebP poster of the Earth scene (this is the page's LCP image, painted from
 * the server HTML) with the real three.js scene layered on top only when the device can afford it:
 *
 *  - Phones, touch devices, <= 4 cores, <= 4 GB RAM, Save-Data or a 2G connection: NEVER load
 *    three.js. They get the poster with a light CSS "breathing" glow animation.
 *  - Capable desktops: the three.js chunk is requested only after the window `load` event AND the
 *    main thread is idle (or on the first scroll / pointer / key press), then fades in over the poster.
 *  - The scene stops rendering while the hero is off-screen or the tab is hidden.
 *
 * public/hero/earth-poster.webp is a screenshot of the live desktop scene (hero stage, overlays
 * hidden, 1000 px wide, WebP q78). Re-capture it if the scene's look changes.
 */

/** Fallback delay (after `load`) before the 3D scene starts if the visitor has not interacted. */
const IDLE_START_MS = 4000;

const POSTER = "/hero/earth-poster.webp";

// Lazy-load the heavy three.js bundle on the client only.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/** If WebGL or a texture fails, keep the poster instead of crashing the page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("[hero] 3D scene unavailable, showing the poster:", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;

/** True when this device should run the live 3D scene at all. */
function canRun3d(): boolean {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const cores = nav.hardwareConcurrency ?? 8;
  const mem = nav.deviceMemory ?? 8;
  const saveData = nav.connection?.saveData === true;
  const slow = /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");
  const touchOrPhone =
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 1023px)").matches;
  return !(touchOrPhone || cores <= 4 || mem <= 4 || saveData || slow);
}
const subscribeNoop = () => () => {};

export function HeroCanvas({ heroServices }: { heroServices: HeroServiceItem[] }) {
  // Server render + hydration assume "no 3D"; capable desktops upgrade after hydration.
  const allow3d = useSyncExternalStore(subscribeNoop, canRun3d, () => false);
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, () => false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [go, setGo] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);

  // Start loading 3D only on the first real user signal, or 4 s after `load`.
  useEffect(() => {
    if (!allow3d) return;
    let done = false;
    const cleanups: (() => void)[] = [];
    const start = () => {
      if (done) return;
      done = true;
      setGo(true);
    };
    const events = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => {
      window.addEventListener(e, start, { once: true, passive: true });
      cleanups.push(() => window.removeEventListener(e, start));
    });
    // No user signal: start 4 s after the window `load` event (keeps the scene out of the load window).
    const afterLoad = () => {
      const t = window.setTimeout(start, IDLE_START_MS);
      cleanups.push(() => window.clearTimeout(t));
    };
    if (document.readyState === "complete") afterLoad();
    else {
      window.addEventListener("load", afterLoad, { once: true });
      cleanups.push(() => window.removeEventListener("load", afterLoad));
    }
    return () => cleanups.forEach((c) => c());
  }, [allow3d]);

  // Pause rendering when the hero is scrolled out of view or the tab is hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Re-measure the canvas on return: a resize while off-screen can leave it stale.
        if (entry.isIntersecting) {
          requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // R3F's size observer can miss a layout change (stage jumping between layouts on resize), so while
  // the scene is visible compare canvas and wrapper (cheap DOM reads, twice a second) and nudge a re-measure.
  const active = inView && tabVisible;
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !active || !go) return;
    const sync = () => {
      const canvas = el.querySelector("canvas");
      if (!canvas) return;
      const w = parseFloat(canvas.style.width);
      const h = parseFloat(canvas.style.height);
      if (Math.abs(w - el.clientWidth) > 2 || Math.abs(h - el.clientHeight) > 2) {
        window.dispatchEvent(new Event("resize"));
      }
    };
    const id = window.setInterval(sync, 500);
    return () => window.clearInterval(id);
  }, [active, go]);

  const show3d = allow3d && go;

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {/* Poster: the LCP element. Slow CSS glow/breathing only when 3D is not going to replace it. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          show3d && sceneReady ? "opacity-0" : "opacity-100",
        )}
      >
        <Image
          src={POSTER}
          alt=""
          fill
          preload
          sizes="(min-width: 1280px) 48vw, (min-width: 768px) 92vw, 100vw"
          className={cn("object-cover", !allow3d && "hero-poster-anim")}
        />
      </div>
      {show3d && (
        <SceneBoundary>
          <HeroScene
            quality="full"
            heroServices={heroServices}
            mobile={false}
            active={active}
            reducedMotion={reducedMotion}
            onReady={onReady}
          />
        </SceneBoundary>
      )}
    </div>
  );
}

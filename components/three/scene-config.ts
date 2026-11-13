import * as THREE from "three";

/** Textures: see README → Credits (NASA Blue/Black Marble, Solar System Scope clouds). */
export const TEXTURES = {
  day2048: "/textures/earth-day-2048.webp",
  day1024: "/textures/earth-day-1024.webp",
  night2048: "/textures/earth-night-2048.webp",
  night1024: "/textures/earth-night-1024.webp",
  clouds: "/textures/earth-clouds-1024.webp",
} as const;

export const EARTH_RADIUS = 1.25;
export const AXIAL_TILT = THREE.MathUtils.degToRad(23.4);
/** Seconds for one full turn of the Earth / the cloud layer (clouds drift a bit faster). */
export const EARTH_PERIOD_S = 50;
export const CLOUD_PERIOD_S = 42;
/** Initial Earth rotation so India faces the camera. */
export const START_ROTATION_Y = -3.15;

/** World-space direction towards the sun: top-left, slightly towards the camera. */
export const SUN_DIRECTION = new THREE.Vector3(-5, 3, 4).normalize();

/** Stage background. Must match the dark page background so the scene blends in. */
export const STAGE_BG = "#060a17";

export const COLORS = {
  blue: "#4d8dff",
  blueSoft: "#7fb0ff",
  orange: "#ff9a3d",
} as const;

/** Camera distance. Phones sit closer so the (smaller) scene still reads well. */
export const CAMERA_FOV = 45;
export const baseCameraZ = (mobile: boolean) => (mobile ? 6 : 7);

export interface RingSpec {
  /** Orbit radius in scene units (Earth radius is 1.25). */
  radius: number;
  /** Rotation about the Y axis, then tilt about X. */
  yaw: number;
  tilt: number;
  /** Optional roll about the view axis (Z) applied last; used on phones to make rings tall. */
  roll?: number;
  color: "blue" | "orange";
  /** Seconds for one card loop (sign = direction). Within the 40–60 s range. */
  period: number;
  /** Seconds for one light-particle loop (sign = direction). */
  particlePeriod: number;
}

/** 4 rings on different tilts: three electric blue, one warm orange for contrast. */
export const RINGS: RingSpec[] = [
  { radius: 1.8, yaw: 1.2, tilt: 0.95, color: "blue", period: 46, particlePeriod: 14 },
  { radius: 2.05, yaw: -1.0, tilt: 0.8, color: "blue", period: -52, particlePeriod: -18 },
  { radius: 2.3, yaw: 0.85, tilt: 0.7, color: "blue", period: 58, particlePeriod: 22 },
  { radius: 2.55, yaw: -0.75, tilt: 0.55, color: "orange", period: -44, particlePeriod: -16 },
];

/** Phones get tighter rings so the Earth can be drawn larger inside a narrow stage. */
export const MOBILE_RING_SCALE = 0.78;
/** Roll per ring on phones (≈ ±70–80°) so the rings project as tall ellipses in the portrait stage. */
const MOBILE_ROLLS = [1.45, -1.25, 1.1, -1.4];
export const ringsFor = (mobile: boolean): RingSpec[] =>
  mobile
    ? RINGS.map((r, i) => ({ ...r, radius: r.radius * MOBILE_RING_SCALE, roll: MOBILE_ROLLS[i] }))
    : RINGS;

export interface CardSlot {
  ring: number;
  /** Starting angle on the ring (radians). */
  angle: number;
}

/** 8 desktop cards: two per ring, spaced so they never bunch up. */
export const DESKTOP_SLOTS: CardSlot[] = [
  { ring: 0, angle: 0.2 },
  { ring: 1, angle: 3.0 },
  { ring: 2, angle: 5.6 },
  { ring: 3, angle: 1.7 },
  { ring: 0, angle: 3.35 },
  { ring: 1, angle: 6.1 },
  { ring: 2, angle: 2.45 },
  { ring: 3, angle: 4.85 },
];

/** 4 phone cards, one per ring. */
export const MOBILE_SLOTS: CardSlot[] = [
  { ring: 0, angle: 0.3 },
  { ring: 1, angle: 2.4 },
  { ring: 2, angle: 4.0 },
  { ring: 3, angle: 5.6 },
];

/** Card footprint in CSS px (used to keep cards inside the canvas). */
export const CARD_PX = {
  desktop: { w: 112, h: 104 },
  mobile: { w: 80, h: 80 },
} as const;

/** HDR glow multiplier for rings / particles / atmosphere (no post-processing: the glow is faked with additive halos / fresnel shells). */
export const GLOW_BOOST = { full: 1.35, lite: 1.0 } as const;

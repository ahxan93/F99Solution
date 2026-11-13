import { CAMERA_FOV, EARTH_RADIUS, type CardSlot, type RingSpec } from "./scene-config";

/**
 * Pure geometry helpers (no three.js objects) shared by the layout fit, the
 * reduced-motion pose solver and the per-frame code.
 */

export type Vec3 = [number, number, number];

/** A point on a ring in scene space: ring plane (XZ) → tilt about X → yaw about Y → roll about Z. Matches the nested <group> rotations. */
export function ringPoint(ring: RingSpec, angle: number): Vec3 {
  let x = Math.cos(angle) * ring.radius;
  let y = 0;
  let z = Math.sin(angle) * ring.radius;
  const ct = Math.cos(ring.tilt);
  const st = Math.sin(ring.tilt);
  const y2 = y * ct - z * st;
  const z2 = y * st + z * ct;
  y = y2;
  z = z2;
  const cy = Math.cos(ring.yaw);
  const sy = Math.sin(ring.yaw);
  const x2 = x * cy + z * sy;
  const z3 = -x * sy + z * cy;
  x = x2;
  z = z3;
  // optional roll about Z (outermost group rotation)
  const roll = ring.roll ?? 0;
  if (roll !== 0) {
    const cr = Math.cos(roll);
    const sr = Math.sin(roll);
    const x3 = x * cr - y * sr;
    y = x * sr + y * cr;
    x = x3;
  }
  return [x, y, z];
}

/** Does the segment camera→point pass through the sphere (i.e. is the point hidden behind it)? */
export function segmentHitsSphere(cam: Vec3, p: Vec3, center: Vec3, radius: number): boolean {
  const dx = p[0] - cam[0];
  const dy = p[1] - cam[1];
  const dz = p[2] - cam[2];
  const fx = cam[0] - center[0];
  const fy = cam[1] - center[1];
  const fz = cam[2] - center[2];
  const a = dx * dx + dy * dy + dz * dz;
  const b = 2 * (fx * dx + fy * dy + fz * dz);
  const c = fx * fx + fy * fy + fz * fz - radius * radius;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return false;
  const sq = Math.sqrt(disc);
  const t1 = (-b - sq) / (2 * a);
  const t2 = (-b + sq) / (2 * a);
  // Hit only if the sphere lies between the camera and the point.
  return (t1 > 0 && t1 < 1) || (t2 > 0 && t2 < 1);
}

interface FitInput {
  width: number;
  height: number;
  camZ: number;
  rings: RingSpec[];
  /** Card size in CSS px. */
  card: { w: number; h: number };
}

/** World units visible vertically at the Earth's distance, and px per world unit. */
function viewMetrics(height: number, camZ: number) {
  const vh = 2 * Math.tan((CAMERA_FOV * Math.PI) / 360) * camZ;
  return { vh, ppu: height / vh };
}

/**
 * Largest uniform scale (≤ 1) for the whole orbit system such that every card, anywhere
 * along its ring and including perspective growth when it swings towards the camera,
 * stays inside the canvas. Recomputed on resize.
 */
export function computeSystemScale({ width, height, camZ, rings, card }: FitInput): number {
  if (width <= 0 || height <= 0) return 1;
  const { vh, ppu } = viewMetrics(height, camZ);
  const halfW = width / ppu / 2;
  const halfH = vh / 2;
  // Front cards grow (scale ≈ 1.14 × perspective), so reserve extra room around each card.
  const GROW = 1.3;
  const cardHalfW = ((card.w / 2) * GROW) / ppu;
  const cardHalfH = ((card.h / 2) * GROW) / ppu;
  const margin = 0.03 * Math.min(halfW, halfH);

  const fits = (s: number): boolean => {
    for (const ring of rings) {
      for (let k = 0; k < 96; k++) {
        const [x, y, z] = ringPoint(ring, (k / 96) * Math.PI * 2);
        const f = camZ / (camZ - z * s);
        if (Math.abs(x * s * f) + cardHalfW > halfW - margin) return false;
        if (Math.abs(y * s * f) + cardHalfH > halfH - margin) return false;
      }
    }
    return true;
  };

  let lo = 0.3;
  let hi = 1;
  if (fits(hi)) return hi;
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2;
    if (fits(mid)) lo = mid;
    else hi = mid;
  }
  return lo;
}

/**
 * Static poses for prefers-reduced-motion: for each card pick the ring angle (near its
 * starting angle) that is not hidden by the Earth and stays farthest from the cards
 * already placed, so the still frame looks deliberately composed.
 */
export function solveStillAngles(
  slots: CardSlot[],
  rings: RingSpec[],
  scale: number,
  camZ: number,
): number[] {
  const placed: { x: number; y: number }[] = [];
  const out: number[] = [];
  const cam: Vec3 = [0, 0, camZ];
  const earthR = EARTH_RADIUS * scale * 1.04;

  for (const slot of slots) {
    const ring = rings[slot.ring];
    let best = slot.angle;
    let bestScore = -Infinity;
    for (let k = 0; k < 72; k++) {
      const a = slot.angle + (k / 72) * Math.PI * 2;
      const [x, y, z] = ringPoint(ring, a);
      const p: Vec3 = [x * scale, y * scale, z * scale];
      if (segmentHitsSphere(cam, p, [0, 0, 0], earthR)) continue;
      const f = camZ / (camZ - p[2]);
      const sx = p[0] * f;
      const sy = p[1] * f;
      let minDist = Infinity;
      for (const q of placed) minDist = Math.min(minDist, Math.hypot(sx - q.x, sy - q.y));
      // Prefer well-separated poses; mildly prefer the front hemisphere (z > 0).
      const score = Math.min(minDist, 3) + p[2] * 0.15 - (k / 72) * 0.05;
      if (score > bestScore) {
        bestScore = score;
        best = a;
      }
    }
    const [bx, by, bz] = ringPoint(ring, best);
    const f = camZ / (camZ - bz * scale);
    placed.push({ x: bx * scale * f, y: by * scale * f });
    out.push(best);
  }
  return out;
}

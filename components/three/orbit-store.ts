import type { Vec3 } from "./scene-math";

/**
 * Mutable state shared by the orbiting cards, the orbit clock and the parallax rig.
 * It lives outside React's render cycle on purpose: it changes every frame (60 fps) and must
 * never cause a re-render. A class with methods keeps all mutation behind explicit calls.
 */
export class OrbitStore {
  /** Orbit clock in seconds; stops advancing while a card is hovered / focused. */
  t = 0;
  /** 1 = full speed, eased to 0 while paused. */
  speed = 1;
  /** Number of cards currently hovered or focused (> 0 pauses the orbit and the parallax). */
  engaged = 0;

  /** Earth centre / radius in world space (refreshed every frame) for occlusion + depth. */
  center: Vec3 = [0, 0, 0];
  radius = 1.25;
  /** Ring radius in world units, used to normalise a card's depth. */
  orbitExtent = 2.65;

  /** A card was hovered/focused (+1) or released (−1). */
  engage(delta: 1 | -1): void {
    this.engaged = Math.max(0, this.engaged + delta);
  }

  /** Advance the clock; eases to a stop while engaged or when nothing should move. */
  advance(dt: number, still: boolean): void {
    const target = still || this.engaged > 0 ? 0 : 1;
    this.speed += (target - this.speed) * Math.min(1, dt * 6);
    if (!still) this.t += dt * this.speed;
  }

  setEarth(center: Vec3, radius: number, orbitExtent: number): void {
    this.center = center;
    this.radius = radius;
    this.orbitExtent = orbitExtent;
  }
}

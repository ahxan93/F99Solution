"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS, type RingSpec } from "./scene-config";

const ringColor = (ring: RingSpec, boost: number) =>
  new THREE.Color(ring.color === "orange" ? COLORS.orange : COLORS.blue).multiplyScalar(boost);

/** Number of fading "tail" dots behind each travelling particle. */
const TRAIL = 3;

/** Small bright dots (with a short fading tail) travelling along the ring, like data moving. */
function RingParticles({
  ring,
  count,
  boost,
  still,
}: {
  ring: RingSpec;
  count: number;
  boost: number;
  still: boolean;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(
    () => ringColor(ring, boost * 1.8).lerp(new THREE.Color(1, 1, 1), 0.35),
    [ring, boost],
  );

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = still ? 0 : state.clock.elapsedTime;
    const dir = Math.sign(ring.particlePeriod) || 1;
    const speed = (Math.PI * 2) / Math.abs(ring.particlePeriod);
    let i = 0;
    for (let p = 0; p < count; p++) {
      const head = (p / count) * Math.PI * 2 + 0.7 + dir * t * speed;
      for (let k = 0; k <= TRAIL; k++) {
        const a = head - dir * k * 0.085;
        dummy.position.set(Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius);
        dummy.scale.setScalar(0.034 * (1 - k * 0.2));
        dummy.updateMatrix();
        m.setMatrixAt(i++, dummy.matrix);
      }
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count * (TRAIL + 1)]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

interface RingGroupProps {
  ring: RingSpec;
  /** Light particles on this ring. */
  particles: number;
  /** HDR glow multiplier (> 1 so Bloom picks the rings up; 1 when Bloom is off). */
  boost: number;
  still: boolean;
  /** Cards that ride on this ring (rendered inside the ring's tilted frame). */
  children?: ReactNode;
}

/** One thin glowing ring on its own tilt, plus its particles and the cards riding on it. */
export function RingGroup({ ring, particles, boost, still, children }: RingGroupProps) {
  const color = useMemo(() => ringColor(ring, boost), [ring, boost]);
  return (
    <group rotation={[0, 0, ring.roll ?? 0]}>
      <group rotation={[0, ring.yaw, 0]}>
        <group rotation={[ring.tilt, 0, 0]}>
          {/* crisp core line */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.0065, 8, 220]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          {/* soft halo (also gives a glow where Bloom is disabled) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.03, 8, 220]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.11}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          {/* wide, very faint outer halo */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.075, 8, 160]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.035}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <RingParticles ring={ring} count={particles} boost={boost} still={still} />
          {children}
        </group>
      </group>
    </group>
  );
}

interface Fragment {
  pos: [number, number, number];
  size: number;
  phase: number;
  spin: [number, number, number];
  kind: "octa" | "tetra" | "ico";
}

/** Fixed layout (not random) so server/client and every run look the same. */
const FRAGMENTS: Fragment[] = [
  { pos: [-2.4, 1.6, 0.8], size: 0.13, phase: 0.2, spin: [0.18, 0.12, 0.05], kind: "octa" },
  { pos: [2.5, 1.9, -0.4], size: 0.1, phase: 1.7, spin: [0.1, 0.2, 0.08], kind: "tetra" },
  { pos: [2.7, -1.2, 1.1], size: 0.14, phase: 3.1, spin: [0.15, 0.09, 0.14], kind: "ico" },
  { pos: [-2.6, -1.5, -0.6], size: 0.09, phase: 4.4, spin: [0.2, 0.15, 0.1], kind: "tetra" },
  { pos: [0.3, 2.6, 0.9], size: 0.08, phase: 5.2, spin: [0.12, 0.18, 0.06], kind: "octa" },
  { pos: [-0.6, -2.5, 1.2], size: 0.11, phase: 2.4, spin: [0.09, 0.13, 0.17], kind: "ico" },
];

function GlassShard({ f, still }: { f: Fragment; still: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const m = ref.current;
    if (!m || still) return;
    const t = state.clock.elapsedTime;
    m.position.set(
      f.pos[0] + Math.sin(t * 0.21 + f.phase) * 0.14,
      f.pos[1] + Math.sin(t * 0.33 + f.phase * 1.3) * 0.18,
      f.pos[2] + Math.cos(t * 0.17 + f.phase) * 0.12,
    );
    m.rotation.x += dt * f.spin[0];
    m.rotation.y += dt * f.spin[1];
    m.rotation.z += dt * f.spin[2];
  });
  return (
    <mesh
      ref={ref}
      position={f.pos}
      rotation={[0.6, 0.4, 0.2]}
      scale={[f.size, f.size * 0.6, f.size * 0.28]}
    >
      {f.kind === "octa" && <octahedronGeometry args={[1, 0]} />}
      {f.kind === "tetra" && <tetrahedronGeometry args={[1.2, 0]} />}
      {f.kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial
        color="#a9ccff"
        emissive="#2a56c8"
        emissiveIntensity={0.55}
        transparent
        opacity={0.3}
        roughness={0.08}
        metalness={0.2}
        flatShading
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** A few small translucent glass shards drifting slowly around the scene. */
export function GlassFragments({ count, still }: { count: number; still: boolean }) {
  return (
    <>
      {FRAGMENTS.slice(0, count).map((f, i) => (
        <GlassShard key={i} f={f} still={still} />
      ))}
    </>
  );
}

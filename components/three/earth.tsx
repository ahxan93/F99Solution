"use client";

import { forwardRef, useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  AXIAL_TILT,
  CLOUD_PERIOD_S,
  EARTH_PERIOD_S,
  EARTH_RADIUS,
  START_ROTATION_Y,
  SUN_DIRECTION,
  TEXTURES,
} from "./scene-config";

/** Colour textures must be flagged sRGB so they are decoded correctly in the shaders. */
function asColorTexture(t: THREE.Texture | THREE.Texture[]) {
  for (const tex of Array.isArray(t) ? t : [t]) {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8; // clamped to what the GPU supports
    tex.needsUpdate = true;
  }
}

// ---------------------------------------------------------------------------------------
// Shared vertex shader: world-space normal so lighting is correct however the Earth,
// the tilt group, the parallax rig or the float animation are rotated.
// ---------------------------------------------------------------------------------------
const SURFACE_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

// Day/night blend driven by the sun direction. City lights (NASA Black Marble) only show on the
// dark side and are pushed above 1.0 (HDR) so Bloom makes them glow. The day side adds a glint on
// the oceans, a warm twilight band at the terminator and a blue haze at the limb.
const EARTH_FRAGMENT = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform vec3 uSun;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSun);
    float ndl = dot(N, L);

    vec3 day = texture2D(uDay, vUv).rgb;
    vec3 night = texture2D(uNight, vUv).rgb;

    // Day side: lit by the sun with a little ambient so it never goes fully black.
    float diffuse = clamp(ndl, 0.0, 1.0);
    float dayMix = smoothstep(-0.10, 0.30, ndl);
    vec3 dayCol = day * (0.16 + 1.55 * diffuse);
    dayCol = mix(dayCol, dayCol * vec3(1.05, 1.12, 1.3), 0.5); // keep oceans a touch richer

    // Ocean mask (blue-dominant pixels) → sun glint.
    float ocean = clamp((day.b - max(day.r, day.g)) * 5.0, 0.0, 1.0);
    vec3 H = normalize(L + V);
    float glint = pow(max(dot(N, H), 0.0), 60.0) * ocean * dayMix;

    // Night side: isolate the bright city lights from the faint land/ice base of the map.
    float lum = dot(night, vec3(0.299, 0.587, 0.114));
    float city = smoothstep(0.16, 0.62, lum);
    vec3 lights = vec3(1.0, 0.72, 0.36) * city * 2.6;
    vec3 nightCol = day * 0.025 + night * 0.10 + lights;

    vec3 col = mix(nightCol, dayCol, dayMix);

    // Warm band along the terminator.
    float twilight = smoothstep(-0.14, 0.0, ndl) * (1.0 - smoothstep(0.0, 0.12, ndl));
    col += vec3(1.0, 0.45, 0.14) * twilight * 0.07;

    // Atmospheric haze on the visible edge, stronger on the lit side.
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += vec3(0.22, 0.52, 1.0) * fres * (0.22 + 0.95 * dayMix);

    col += vec3(1.0, 0.93, 0.8) * glint * 0.7;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

// Clouds are lit by the same sun: bright on the day side, faint and bluish at night.
const CLOUD_FRAGMENT = /* glsl */ `
  uniform sampler2D uClouds;
  uniform vec3 uSun;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    float a = texture2D(uClouds, vUv).a;
    float ndl = dot(normalize(vWorldNormal), normalize(uSun));
    float lit = smoothstep(-0.12, 0.32, ndl);
    vec3 dayCol = vec3(0.92) * (0.14 + 1.0 * clamp(ndl, 0.0, 1.0));
    vec3 col = mix(vec3(0.025, 0.04, 0.08), dayCol, lit);
    gl_FragColor = vec4(col, a * 0.6 * (0.25 + 0.75 * lit));
    #include <colorspace_fragment>
  }
`;

// Back-side additive shell. On the far hemisphere the view-facing term d grows from 0 at the
// shell's outer silhouette to ~0.5 at the Earth's limb, so the glow fades smoothly to nothing
// outward and is strongest hugging the planet. Colour is pushed above 1.0 so Bloom picks it up.
const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uSun;
  uniform float uBoost;
  varying vec3 vNormal;
  void main() {
    float d = -dot(vNormal, vec3(0.0, 0.0, 1.0));
    float glow = pow(smoothstep(0.0, 0.5, d), 1.7);
    float lit = smoothstep(-0.55, 0.65, dot(normalize(vNormal), uSun));
    gl_FragColor = vec4(uColor * uBoost, glow * mix(0.35, 1.0, lit));
  }
`;

function EarthSurface({ lite }: { lite: boolean }) {
  const day = useTexture(lite ? TEXTURES.day1024 : TEXTURES.day2048, asColorTexture);
  const night = useTexture(lite ? TEXTURES.night1024 : TEXTURES.night2048, asColorTexture);
  const uniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uSun: { value: SUN_DIRECTION.clone() },
    }),
    [day, night],
  );
  return (
    <shaderMaterial
      vertexShader={SURFACE_VERTEX}
      fragmentShader={EARTH_FRAGMENT}
      uniforms={uniforms}
    />
  );
}

function CloudSurface() {
  const clouds = useTexture(TEXTURES.clouds, asColorTexture);
  const uniforms = useMemo(
    () => ({ uClouds: { value: clouds }, uSun: { value: SUN_DIRECTION.clone() } }),
    [clouds],
  );
  return (
    <shaderMaterial
      vertexShader={SURFACE_VERTEX}
      fragmentShader={CLOUD_FRAGMENT}
      uniforms={uniforms}
      transparent
      depthWrite={false}
    />
  );
}

/** Strong blue atmosphere: slightly larger back-side sphere, additive fresnel shader. */
function Atmosphere({ boost }: { boost: number }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#3f95ff") },
      uSun: { value: SUN_DIRECTION.clone() },
      uBoost: { value: boost },
    }),
    [boost],
  );
  return (
    <mesh scale={1.17}>
      <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      <shaderMaterial
        vertexShader={ATMOSPHERE_VERTEX}
        fragmentShader={ATMOSPHERE_FRAGMENT}
        uniforms={uniforms}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/** Rotates its children around the local Y axis, continuously (speed in rad/s, 0 = still). */
function Spin({
  speed,
  start = 0,
  children,
}: {
  speed: number;
  start?: number;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current && speed !== 0) group.current.rotation.y += dt * speed;
  });
  return (
    <group ref={group} rotation={[0, start, 0]}>
      {children}
    </group>
  );
}

interface EarthSystemProps {
  /** Use 1024px textures and skip the clouds. */
  lite: boolean;
  /** No rotation at all (prefers-reduced-motion). */
  still: boolean;
  /** Glow multiplier for the atmosphere (higher = stronger Bloom response). */
  glowBoost: number;
}

/** Tilted Earth + clouds + atmosphere. The ref points at the Earth centre (for card occlusion). */
export const EarthSystem = forwardRef<THREE.Group, EarthSystemProps>(function EarthSystem(
  { lite, still, glowBoost },
  ref,
) {
  const earthSpeed = still ? 0 : (Math.PI * 2) / EARTH_PERIOD_S;
  const cloudSpeed = still ? 0 : (Math.PI * 2) / CLOUD_PERIOD_S;
  const segments = lite ? 64 : 96;

  return (
    <group ref={ref}>
      {/* 23.4° axial tilt; the Earth spins around its own (tilted) axis inside it */}
      <group rotation={[0, 0, -AXIAL_TILT]}>
        <Spin speed={earthSpeed} start={START_ROTATION_Y}>
          <mesh>
            <sphereGeometry args={[EARTH_RADIUS, segments, segments]} />
            <EarthSurface lite={lite} />
          </mesh>
        </Spin>
        {!lite && (
          <Spin speed={cloudSpeed} start={START_ROTATION_Y}>
            <mesh scale={1.012}>
              <sphereGeometry args={[EARTH_RADIUS, segments, segments]} />
              <CloudSurface />
            </mesh>
          </Spin>
        )}
      </group>
      <Atmosphere boost={glowBoost} />
    </group>
  );
});

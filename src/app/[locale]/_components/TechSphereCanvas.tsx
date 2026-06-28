'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type Tech = { slug: string; label: string; icon?: string };

const TECHS: Tech[] = [
  { slug: 'nextdotjs', label: 'Next.js' },
  { slug: 'react', label: 'React' },
  { slug: 'typescript', label: 'TypeScript' },
  { slug: 'javascript', label: 'JavaScript' },
  { slug: 'redux', label: 'Redux' },
  { slug: 'tailwindcss', label: 'Tailwind' },
  { slug: 'nodedotjs', label: 'Node.js' },
  { slug: 'postgresql', label: 'PostgreSQL' },
  // simple-icons has no Microsoft SQL Server icon, so use devicon's.
  {
    slug: 'microsoftsqlserver',
    label: 'SQL Server',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  },
  { slug: 'prisma', label: 'Prisma' },
  { slug: 'git', label: 'Git' },
  { slug: 'github', label: 'GitHub' },
  { slug: 'vercel', label: 'Vercel' },
  { slug: 'vite', label: 'Vite' },
  { slug: 'html5', label: 'HTML5' },
  { slug: 'heroui', label: 'HeroUI' },
  { slug: 'claude', label: 'Claude' },
];

// Tune these to fit/scale the sphere.
const RADIUS = 1.7;
const CAMERA_Z = 6;
const PILL_SCALE = 0.35; // size of the HTML badges in the 3D scene
const NEAR_D = CAMERA_Z - RADIUS;
const FAR_D = CAMERA_Z + RADIUS;

// Even distribution of points on a sphere (Fibonacci sphere).
function spherePositions(n: number, radius: number) {
  const inc = Math.PI * (3 - Math.sqrt(5));
  const off = 2 / n;
  const arr: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * inc;
    arr.push(
      new THREE.Vector3(
        Math.cos(phi) * r * radius,
        y * radius,
        Math.sin(phi) * r * radius,
      ),
    );
  }
  return arr;
}

function Pill({
  position,
  slug,
  label,
  icon,
}: {
  position: THREE.Vector3;
  slug: string;
  label: string;
  icon?: string;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  // Fade badges by depth (further from camera = more transparent).
  useFrame(({ camera }) => {
    const el = elRef.current;
    if (!el) return;
    const dist = position.distanceTo(camera.position);
    const o = THREE.MathUtils.clamp(
      THREE.MathUtils.mapLinear(dist, NEAR_D, FAR_D, 1, 0.2),
      0.2,
      1,
    );
    el.style.opacity = String(o);
  });

  return (
    // transform + sprite = CSS3D billboard: smooth (no jitter) + true perspective.
    <Html position={position} transform sprite scale={PILL_SCALE} pointerEvents="none">
      <div
        ref={elRef}
        className="flex items-center gap-1 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow-md"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon ?? `https://cdn.simpleicons.org/${slug}`}
          alt=""
          width={13}
          height={13}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {label}
      </div>
    </Html>
  );
}

export default function TechSphereCanvas() {
  const points = useMemo(() => spherePositions(TECHS.length, RADIUS), []);

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      {points.map((p, i) => (
        <Pill
          key={TECHS[i].slug}
          position={p}
          slug={TECHS[i].slug}
          label={TECHS[i].label}
          icon={TECHS[i].icon}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.9}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}

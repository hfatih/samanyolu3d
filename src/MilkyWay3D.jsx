import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Leva, useControls } from "leva";
import * as THREE from "three";

// (Component code shortened for clarity — full component from user canvas)
function generateSpiralArmStars({ count, arms = 4, armSpread = 0.5, armTwist = 1.5, radius = 150, randomness = 0.6, height = 6, seed = 42 }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const rng = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const armIndex = i % arms;
    const r = Math.pow(rng(), 0.7) * radius;
    const baseTheta = (armIndex / arms) * Math.PI * 2 + r * armTwist * 0.02;
    const phi = baseTheta + normalRandom(rng) * armSpread;
    const z = normalRandom(rng) * (1 - r / radius) * height;
    const rr = r + normalRandom(rng) * randomness * (1 + r / radius);
    const x = Math.cos(phi) * rr;
    const y = Math.sin(phi) * rr;
    positions[3 * i] = x;
    positions[3 * i + 1] = y;
    positions[3 * i + 2] = z;
    const t = r / radius;
    const color = new THREE.Color().setHSL(0.6 - 0.4 * t, 0.8 - 0.5 * t, 0.5 + 0.4 * (1 - t));
    colors[3 * i] = color.r;
    colors[3 * i + 1] = color.g;
    colors[3 * i + 2] = color.b;
  }
  return { positions, colors };
}
function generateBulgeStars({ count = 20000, radius = 18, seed = 1337 }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const rng = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const u = rng();
    const r = radius * Math.pow(u, 1 / 3) * (0.3 + 0.7 * rng());
    const theta = Math.acos(2 * rng() - 1);
    const phi = 2 * Math.PI * rng();
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta) * (0.6 + 0.4 * rng());
    positions[3 * i] = x;
    positions[3 * i + 1] = y;
    positions[3 * i + 2] = z;
    const color = new THREE.Color().setHSL(0.08, 0.6 + 0.2 * rng(), 0.45 + 0.1 * rng());
    colors[3 * i] = color.r;
    colors[3 * i + 1] = color.g;
    colors[3 * i + 2] = color.b;
  }
  return { positions, colors };
}
function generateHaloStars({ count = 15000, radius = 800, seed = 777 }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const rng = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const u = rng();
    const r = radius * Math.pow(u, 1 / 3);
    const theta = Math.acos(2 * rng() - 1);
    const phi = 2 * Math.PI * rng();
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);
    positions[3 * i] = x;
    positions[3 * i + 1] = y;
    positions[3 * i + 2] = z;
    const gray = 0.8 - 0.4 * rng();
    colors[3 * i] = gray;
    colors[3 * i + 1] = gray;
    colors[3 * i + 2] = gray;
  }
  return { positions, colors };
}
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function normalRandom(rng) {
  let u = 0, v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
function PointsCloud({ positions, colors, size = 1.2 }) {
  if (!positions || !colors) return null;
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);
  const material = useMemo(() => new THREE.PointsMaterial({ vertexColors: true, size, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false }), [size]);
  return <points geometry={geom} material={material} />;
}
function GalacticLabels() {
  const labels = [
    { text: "Güneş Sistemi", position: [85, 0, 0], color: "#ffcc00" },
    { text: "Orion Kolu", position: [120, 20, 0], color: "#7fbfff" },
    { text: "Sagittarius Kolu", position: [60, -60, 0], color: "#ff9999" },
    { text: "Galaktik Merkez", position: [0, 0, 0], color: "#ffd580" },
  ];
  return (
    <group>
      {labels.map((label, i) => (
        <Text key={i} position={label.position} color={label.color} fontSize={6} anchorX="center" anchorY="middle">
          {label.text}
        </Text>
      ))}
    </group>
  );
}
function GalaxyContent({ spiral, bulge, halo, showDust, starSize, rotationSpeed }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += rotationSpeed * delta * 10;
  });
  return (
    <group ref={groupRef}>
      <PointsCloud positions={spiral.positions} colors={spiral.colors} size={starSize} />
      <PointsCloud positions={bulge.positions} colors={bulge.colors} size={1.8} />
      <PointsCloud positions={halo.positions} colors={halo.colors} size={1.0} />
      {showDust && <PointsCloud positions={halo.positions} colors={halo.colors} size={0.5} />}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[6.5, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color(1.0, 0.9, 0.6)} transparent opacity={0.25} />
      </mesh>
      <GalacticLabels />
    </group>
  );
}
export default function MilkyWay3D() {
  const [seed] = useState(42);
  const { arms, armTwist, armSpread, starCount, bulgeCount, haloCount, showDust, starSize, rotationSpeed } = useControls("Galaxy", {
    arms: { value: 4, min: 2, max: 6, step: 1 },
    armTwist: { value: 1.6, min: 0.2, max: 4, step: 0.1 },
    armSpread: { value: 0.4, min: 0.05, max: 1.2, step: 0.01 },
    starCount: { value: 120000, min: 20000, max: 300000, step: 1000 },
    bulgeCount: { value: 20000, min: 2000, max: 60000, step: 1000 },
    haloCount: { value: 15000, min: 2000, max: 80000, step: 1000 },
    showDust: true,
    starSize: { value: 1.6, min: 0.1, max: 3, step: 0.1 },
    rotationSpeed: { value: 0.02, min: 0, max: 0.2, step: 0.005 },
  });
  const spiral = useMemo(() => generateSpiralArmStars({ count: Math.max(1000, Math.floor(starCount)), arms, armSpread, armTwist, radius: 160, randomness: 0.9, height: 6, seed }), [arms, armSpread, armTwist, starCount, seed]);
  const bulge = useMemo(() => generateBulgeStars({ count: Math.max(100, Math.floor(bulgeCount)), radius: 20, seed: seed + 1 }), [bulgeCount, seed]);
  const halo = useMemo(() => generateHaloStars({ count: Math.max(100, Math.floor(haloCount)), radius: 800, seed: seed + 2 }), [haloCount, seed]);
  return (
    <div style={{ width: "100vw", height: "100vh", background: "radial-gradient(#020112 0%, #000814 60%, #000000 100%)", position: "relative" }}>
      <Leva collapsed={false} />
      <Canvas camera={{ position: [0, -220, 120], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[400, 200, 200]} intensity={1.2} />
        <GalaxyContent spiral={spiral} bulge={bulge} halo={halo} showDust={showDust} starSize={starSize} rotationSpeed={rotationSpeed} />
        <Stars radius={2000} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls autoRotate={false} enablePan enableZoom />
      </Canvas>
      <div style={{ position: "absolute", left: 20, top: 20, color: "#dfe7ff", fontFamily: "Inter, Arial, sans-serif", maxWidth: 420, pointerEvents: "none" }}>
        <h2 style={{ margin: 0 }}>Samanyolu — 3B Görselleştirici</h2>
        <p style={{ marginTop: 6, opacity: 0.9 }}>Etkileşimli model: spiral kollar, disk, bulge (çekirdek) ve halo. Galaktik etiketler eklenmiştir.</p>
        <small style={{ opacity: 0.7 }}>Not: Görselleştirme gerçek ölçekte değildir; eğitim ve sunum amaçlıdır.</small>
      </div>
    </div>
);
}

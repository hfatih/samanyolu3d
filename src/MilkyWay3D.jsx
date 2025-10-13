import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Leva, useControls, useCreateStore } from "leva";
import * as THREE from "three";

// (Component code shortened for clarity — full component from user canvas)
const GALAXIES = {
  milkyway: {
    name: "Samanyolu",
    description: "Çubuklu spiral galaksi, disk içinde belirgin spiral kollar ve yıldız yoğun merkez.",
    realStarCount: 150_000_000_000,
    references: [
      "NASA GSFC (2020) — Milky Way Fact Sheet",
      "ESA/Hubble (2015) — Milky Way star census"
    ],
    controls: {
      arms: 4,
      armTwist: 1.6,
      armSpread: 0.42,
      diskWarp: 10,
      starCount: 120000,
      bulgeCount: 22000,
      haloCount: 18000,
      showDust: true,
      starSize: 1.6,
      rotationSpeed: 0.02
    }
  },
  andromeda: {
    name: "Andromeda (M31)",
    description: "Samanyolu'na benzer fakat daha büyük bir spiral galaksi; daha sıkı kollar.",
    realStarCount: 1_000_000_000_000,
    references: [
      "NASA/JPL-Caltech (2015) — Andromeda dust and star survey",
      "ESA/Hubble (2021) — Panchromatic view of M31"
    ],
    controls: {
      arms: 5,
      armTwist: 1.3,
      armSpread: 0.35,
      diskWarp: 6,
      starCount: 165000,
      bulgeCount: 30000,
      haloCount: 26000,
      showDust: true,
      starSize: 1.4,
      rotationSpeed: 0.018
    }
  }
};

const GALAXY_KEYS = Object.keys(GALAXIES);

function formatLargeNumber(value) {
  if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)} trilyon`;
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} milyar`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} milyon`;
  if (value >= 1000) return `${(value / 1000).toFixed(2)} bin`;
  return Math.round(value).toString();
}

function formatScale(realCount, sampleCount) {
  if (!realCount || !sampleCount) return "—";
  const perPoint = realCount / sampleCount;
  return `1 nokta ≈ ${formatLargeNumber(perPoint)} yıldız`;
}

function generateSpiralArmStars({ count, arms = 4, armSpread = 0.5, armTwist = 1.5, radius = 150, randomness = 0.6, height = 6, warp = 0, seed = 42 }) {
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
    const warpOffset = warp * Math.pow(r / radius, 1.2) * Math.sin(phi * 2 + r * 0.035);
    positions[3 * i] = x;
    positions[3 * i + 1] = y;
    positions[3 * i + 2] = z + warpOffset;
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
  const controlsStore = useCreateStore();
  const [galaxyKey, setGalaxyKey] = useState("milkyway");
  const [customValues, setCustomValues] = useState(() => ({ ...GALAXIES.milkyway.controls }));

  const {
    arms,
    armTwist,
    armSpread,
    diskWarp,
    starCount,
    bulgeCount,
    haloCount,
    showDust,
    starSize,
    rotationSpeed
  } = useControls(
    "Galaksi Ayarları",
    {
      arms: { label: "Kol sayısı", value: GALAXIES.milkyway.controls.arms, min: 2, max: 8, step: 1 },
      armTwist: { label: "Kol burulması", value: GALAXIES.milkyway.controls.armTwist, min: 0.2, max: 4, step: 0.1 },
      armSpread: { label: "Kol yayılımı", value: GALAXIES.milkyway.controls.armSpread, min: 0.05, max: 1.2, step: 0.01 },
      diskWarp: { label: "Disk burkulması", value: GALAXIES.milkyway.controls.diskWarp, min: 0, max: 40, step: 1 },
      starCount: { label: "Disk yıldız örneği", value: GALAXIES.milkyway.controls.starCount, min: 20000, max: 400000, step: 1000 },
      bulgeCount: { label: "Çekirdek yıldız örneği", value: GALAXIES.milkyway.controls.bulgeCount, min: 2000, max: 80000, step: 1000 },
      haloCount: { label: "Halo yıldız örneği", value: GALAXIES.milkyway.controls.haloCount, min: 2000, max: 100000, step: 1000 },
      showDust: { label: "Toz katmanını göster", value: GALAXIES.milkyway.controls.showDust },
      starSize: { label: "Yıldız boyutu", value: GALAXIES.milkyway.controls.starSize, min: 0.1, max: 3, step: 0.1 },
      rotationSpeed: { label: "Dönüş hızı", value: GALAXIES.milkyway.controls.rotationSpeed, min: 0, max: 0.2, step: 0.005 }
    },
    { store: controlsStore }
  );

  const controlValues = useMemo(
    () => ({
      arms,
      armTwist,
      armSpread,
      diskWarp,
      starCount,
      bulgeCount,
      haloCount,
      showDust,
      starSize,
      rotationSpeed
    }),
    [arms, armTwist, armSpread, diskWarp, starCount, bulgeCount, haloCount, showDust, starSize, rotationSpeed]
  );

  useEffect(() => {
    const targetControls = galaxyKey === "custom" ? customValues : GALAXIES[galaxyKey].controls;
    Object.entries(targetControls).forEach(([key, value]) => {
      controlsStore.set({ path: `Galaksi Ayarları.${key}`, value });
    });
  }, [galaxyKey, customValues, controlsStore]);

  useEffect(() => {
    if (galaxyKey === "custom") {
      setCustomValues((prev) => ({ ...prev, ...controlValues }));
    }
  }, [galaxyKey, controlValues]);

  const spiral = useMemo(
    () =>
      generateSpiralArmStars({
        count: Math.max(1000, Math.floor(starCount)),
        arms,
        armSpread,
        armTwist,
        radius: 160,
        randomness: 0.9,
        height: 6,
        warp: diskWarp,
        seed
      }),
    [arms, armSpread, armTwist, starCount, diskWarp, seed]
  );
  const bulge = useMemo(() => generateBulgeStars({ count: Math.max(100, Math.floor(bulgeCount)), radius: 20, seed: seed + 1 }), [bulgeCount, seed]);
  const halo = useMemo(() => generateHaloStars({ count: Math.max(100, Math.floor(haloCount)), radius: 800, seed: seed + 2 }), [haloCount, seed]);

  const activeGalaxy = galaxyKey === "custom" ? { name: "Özel Galaksi", description: "Kendi ayarlarınızı kullanarak özelleştirilmiş görünüm.", realStarCount: GALAXIES.milkyway.realStarCount, references: ["Özel ayarlar — kullanıcı tanımlı"] } : GALAXIES[galaxyKey];
  const activeSampleTotal = starCount + bulgeCount + haloCount;
  const activeScaleText = formatScale(activeGalaxy.realStarCount, activeSampleTotal);

  const presetSummaries = useMemo(() => {
    return GALAXY_KEYS.map((key) => {
      const preset = GALAXIES[key];
      const sampleTotal = preset.controls.starCount + preset.controls.bulgeCount + preset.controls.haloCount;
      return {
        key,
        name: preset.name,
        description: preset.description,
        scaleText: formatScale(preset.realStarCount, sampleTotal),
        references: preset.references
      };
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "radial-gradient(#020112 0%, #000814 60%, #000000 100%)", position: "relative" }}>
      <Leva store={controlsStore} collapsed={false} />
      <Canvas camera={{ position: [0, -220, 120], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[400, 200, 200]} intensity={1.2} />
        <GalaxyContent spiral={spiral} bulge={bulge} halo={halo} showDust={showDust} starSize={starSize} rotationSpeed={rotationSpeed} />
        <Stars radius={2000} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls autoRotate={false} enablePan enableZoom />
      </Canvas>
      <div className="ui-container">
        <div className="ui-card hoverable">
          <h2 className="ui-title">Galaksi Seçici</h2>
          <p className="ui-subtitle">{activeGalaxy.name}</p>
          <p className="ui-description">{activeGalaxy.description}</p>
          <div className="button-row">
            <button type="button" className={`galaxy-button ${galaxyKey === "milkyway" ? "active" : ""}`} onClick={() => setGalaxyKey("milkyway")}>
              Samanyolu
            </button>
            <button type="button" className={`galaxy-button ${galaxyKey === "andromeda" ? "active" : ""}`} onClick={() => setGalaxyKey("andromeda")}>
              Andromeda
            </button>
            <button type="button" className={`galaxy-button ${galaxyKey === "custom" ? "active" : ""}`} onClick={() => setGalaxyKey("custom")}>
              Özel Ayar
            </button>
          </div>
          <div className="scale-line">
            <span className="scale-label">Yıldız ölçeği:</span>
            <span className="scale-value">{activeScaleText}</span>
          </div>
        </div>
        <div className="ui-card reference-card hoverable">
          <h3 className="ui-heading">Referanslar & Ölçekler</h3>
          {presetSummaries.map(({ key, name, description, scaleText, references }) => (
            <div key={key} className="reference-block">
              <strong className="reference-title">{name}</strong>
              <span className="reference-scale">{scaleText}</span>
              <p className="reference-description">{description}</p>
              <ul className="reference-list">
                {references.map((ref, idx) => (
                  <li key={idx} className="reference-item">
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ui-card hoverable note-card">
          <small>Not: Bu görselleştirme gerçek-ölçekli değildir; sayısal değerler eğitim ve sunum amaçlı ölçeklenmiştir.</small>
        </div>
      </div>
    </div>
);
}

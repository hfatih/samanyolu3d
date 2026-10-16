<div align="center">

# 🌌 Samanyolu 3D

### Interactive Galaxy Simulator

**Build, spin and reshape spiral galaxies in real time — right in your browser.**

[English](README.md) · [Türkçe](README.tr.md)

[![Live Demo (GitHub Pages)](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-e7a0b9?style=for-the-badge&logo=github&logoColor=white)](https://hfatih.github.io/samanyolu3d/)
[![Live Mirror (Netlify)](https://img.shields.io/badge/Live%20Mirror-samanyolu3d.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://samanyolu3d.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Hfatih%2Fsamanyolu3d-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hfatih/samanyolu3d)

<br/>

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-black?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/@react--three/fiber-8.14-black?style=flat-square)](https://docs.pmnd.rs/react-three-fiber)
[![React Three Drei](https://img.shields.io/badge/@react--three/drei-9.59-black?style=flat-square)](https://github.com/pmndrs/drei)
[![Leva](https://img.shields.io/badge/Leva-GUI-ff5f5f?style=flat-square)](https://github.com/pmndrs/leva)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 🔭 Overview

**Samanyolu 3D** (*Samanyolu* is Turkish for "Milky Way") is a real-time, interactive 3D procedural simulation and visualization of spiral galaxies. Built with **React**, **Three.js**, and **React Three Fiber (R3F)**, it renders tens of thousands of dynamic stellar particles representing galactic discs, central bulges, outer haloes, and interstellar dust clouds.

Explore structural models based on astrophysical data from the **Milky Way** and **Andromeda (M31)**, or design custom galactic morphologies in real time with the interactive GUI.

> 🚀 **Live Application:** [✦ GitHub Pages Demo](https://hfatih.github.io/samanyolu3d/) · [Netlify Mirror](https://samanyolu3d.netlify.app/)

---

## ✨ Features

- **Procedural Galaxy Generation**:
  - Logarithmic spiral arms generated using seeded PRNG (`mulberry32`) and Gaussian normal distribution (`Box-Muller`).
  - Adjustable arm count (2–8), winding pitch (`twist`), thickness (`spread`), and vertical disk deformation (`warp`).
- **Multi-Component Galactic Anatomy**:
  - **Stellar Disc**: Radius-dependent HSL color gradient modeling stellar populations (young blue stars in the outer arms, older populations toward the center).
  - **Galactic Bulge**: Dense central spheroid with a bright core glow representing the supermassive central region.
  - **Stellar Halo & Dust**: Sparse outer halo particles and optional interstellar dust scatter layers.
- **Astrophysical Landmarks**:
  - ☀️ **Solar System (Güneş Sistemi)**: Position marker at ~85 units from the galactic center.
  - 🌌 **Orion Arm (Orion Kolu)**: Positioned in the local spiral arm structure.
  - 💫 **Galactic Center (Galaktik Merkez)**: Core marker.
- **Galactic Presets**:
  - 🌌 **Milky Way (Samanyolu)**: 4 spiral arms, barred spiral geometry, ~150 billion star reference.
  - 🌀 **Andromeda (M31)**: 5 spiral arms, tighter winding, ~1 trillion star reference.
  - ⚙️ **Custom Mode**: Full creative freedom to adjust every physical and visual variable.
- **Real-Time Interactive Controls**:
  - Powered by **Leva GUI** for live adjustments of morphology, rotation speed, star size, and particle counts.
- **Dynamic Scale Ratio Indicator**:
  - Automatically computes and displays the real-to-sampled star scale ratio (e.g., `1 point ≈ X thousand / million stars`) based on NASA and ESA census data.
- **Modern Glassmorphic Interface**:
  - Sleek backdrop-blur control cards with responsive 360° `OrbitControls` navigation.

---

## 🎮 Controls

| Action | Input |
| :--- | :--- |
| **Rotate / Orbit** | Left-click + Drag (Desktop) / One-finger Drag (Touch) |
| **Pan** | Right-click + Drag / Two-finger Drag |
| **Zoom** | Mouse Wheel / Pinch gesture |
| **Galaxy Selector** | Top-left glassmorphic card (Milky Way, Andromeda, Custom) |
| **Physics & Visual GUI** | Top-right Leva control panel |

---

## 🛠️ Tech Stack

- **Core**: React 18, JavaScript (ESNext)
- **3D Graphics & WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Parameter Controls**: `leva`
- **Bundler & Tooling**: Vite 5
- **Hosting & CI/CD**: GitHub Pages (GitHub Actions) & Netlify

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hfatih/samanyolu3d.git
   cd samanyolu3d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open the local address shown in your terminal (usually `http://localhost:5173`).

---

## 📦 Build & Deployment

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The output files will be in the `dist/` directory, ready to be served on any static hosting platform.

### Netlify Deployment

This repository is pre-configured for automatic Netlify continuous deployment:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

## 📚 References & Scientific Notes

- **NASA GSFC**: [Milky Way Fact Sheet](https://nssdc.gsfc.nasa.gov/)
- **ESA / Hubble**: [Milky Way & Andromeda Star Surveys](https://esahubble.org/)
- **Disclaimer**: This application is a mathematical and educational visualization model. Particle densities and dimensions are proportionally scaled for real-time WebGL browser rendering.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

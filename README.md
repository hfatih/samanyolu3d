# MilkyWay3D - Vite React project (Netlify-ready)

## What's included
- Minimal Vite + React scaffold
- `src/MilkyWay3D.jsx` (the 3D Milky Way component)
- `package.json` with necessary dependencies (three, @react-three/fiber, @react-three/drei, leva)

## Local testing
1. Install Node.js (v18+ recommended).
2. In the project folder run:
   ```
   npm install
   npm run dev
   ```
3. Open the local dev URL printed by Vite.

## Publish to GitHub + Netlify (step-by-step)
1. Create a new GitHub repository (e.g. `milkyway3d`).
2. Initialize git in the project folder and push:
   ```
   git init
   git add .
   git commit -m "Initial commit - MilkyWay3D"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. Go to Netlify > New site > Import from Git > choose your GitHub repo.
4. Build settings (Netlify will usually auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy site — Netlify will build and publish. You get a live URL.

## Netlify tips
- If you change code, push to GitHub — Netlify auto-deploys.
- For environment-specific settings, use Netlify's UI.

If you want, I can:
- Create the GitHub repo for you (you must provide access/token), or
- Prepare a zip of this project (below) for easy upload.


# 🎨 Personal Portfolio — AI/ML

A fast, single-page portfolio built with **React + Vite + Tailwind CSS v4**.
Dark theme, animated hero, projects, skills, and contact sections.

## ✏️ How to customize (start here)

**Everything you need to edit lives in one file:** [`src/data.js`](src/data.js)

1. Open `src/data.js` and replace every placeholder / `TODO` with your real info
   (name, headline, about, skills, projects, education, socials).
2. Update `<title>` and `<meta description>` in `index.html`.
3. Drop your résumé as `public/resume.pdf` (the "Résumé" button links to it).

That's it — no component code needs touching for normal customization.

## 🚀 Run locally

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## 🌐 Deploy (pick one later)

**Vercel (easiest):** push this folder to a GitHub repo, import it at vercel.com — auto-detects Vite, zero config.

**GitHub Pages:**
1. In `vite.config.js`, set `base: '/your-repo-name/'`.
2. `npm run build`, then publish the `dist/` folder (or use a GitHub Action).

## 🗂 Structure

```
src/
  data.js     ← YOUR CONTENT (edit this)
  App.jsx     ← layout & components (rarely need to touch)
  index.css   ← global styles + animations
  main.jsx    ← entry point
public/
  favicon.svg
  resume.pdf  ← add your own
```

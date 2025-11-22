# SaaS Dashboard — React Implementation

A modern SaaS analytics dashboard built with **React**, focused on **pixel-perfect** implementation of the provided Figma design.  
The goal of this project is to showcase strong UI engineering, theme consistency, polished data visualization, and thoughtful microinteractions.

---

## Live Demo

- **Deployed App:** _add your Vercel / Netlify URL here_  

---

## Tech Stack

### Frontend

- React (ES6+)
- Vite / Create React App _(replace this line with what you actually used)_
- Tailwind CSS
- Material UI (MUI)
- Recharts
- Framer Motion

### Enhancements

- Custom Theme Context (light/dark mode with persistence)
- Responsive CSS grid layout
- Microinteractions using Framer Motion and subtle hover states
- Modular component architecture for easy extension

---

## Design Fidelity

This project was implemented with a strong focus on matching the provided Figma design as closely as possible:

- Typography (font sizes, weights, and line-heights)
- Spacing (padding, margins, and gaps between sections)
- Sidebar and top header layout
- Dashboard statistic cards and their hover behavior
- Chart styling (colors, line thickness, gradients, legends)
- Table and pagination styling
- Dark mode color system and surface elevations

Where small deviations were necessary (e.g., library defaults), they were adjusted to remain visually consistent with the original design.

---

## Dark Mode

Dark mode is implemented using a **custom Theme Context**, not just Tailwind’s `dark:` classes, so that:

- Tailwind utilities, MUI components, and Recharts can share the same theme state
- The current theme is stored in `localStorage` and restored on reload
- Backgrounds, text, borders, and icons stay readable in both themes
- Charts (axes, gridlines, tooltips, legend) remain clear in dark mode
- Tables, inputs, and cards are visually balanced on both themes

The aim was to make theme switching feel natural and avoid any “flashing” or broken styles.

---

## Motion & Microinteractions

The interface uses subtle motion to improve perceived quality without being distracting:

- Statistic cards scale slightly on hover
- Sidebar collapse/expand is animated smoothly
- Icon buttons provide visual feedback
- Theme toggle feels responsive and immediate

All animations are intentionally lightweight and focused on user feedback, not on flashy effects.

---

## Responsiveness

The layout adapts across common screen sizes:

- Desktop and widescreen
- Standard laptop widths
- Tablet layouts (cards and charts stack or resize)
- Mobile-friendly stacking where appropriate

The DataGrid and main content area remain scrollable and usable even on smaller viewports, and the sidebar can be collapsed to save space.

---

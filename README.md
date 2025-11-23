# SaaS Dashboard React Implementation

A fully responsive, pixel-perfect SaaS analytics dashboard built using **React**, based on the provided assignment design specification.  
This project focuses on **UI fidelity, microinteractions, clean component architecture, dark mode consistency, and dashboard data representation.**

---

## Live Demo

**Deployed App:** https://shreyas-saas-ui.netlify.app/  
(Accessible without login, optimized for desktop and laptop viewports)

---

## Tech Stack

### Frontend Framework
- **React (Vite build setup)**

### UI & Styling
- **Tailwind CSS**
- **Material UI (MUI)**
- CSS utility composition for spacing + layout

### Charts & Visualization
- **Recharts** for clean dashboard analytics

### Motion & Interactions
- **Framer Motion** for subtle meaningful animations

### State & Theme Handling
- Custom React Context for:
  - Light / Dark mode sync
  - LocalStorage persistence

---

## Running the Project Locally

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Design Fidelity Highlights
This implementation was crafted to closely match the provided design:
- Layout spacing, gutters, and hierarchy
- Sidebar + Header alignment and iconography
- Typography weights and sizes
- Card elevation and hover states
- Table layout, row spacing, avatar alignment
- Chart colors, gridlines, tooltip behavior
- Dark mode contrast and readability

## Dark Mode System
Dark mode is implemented using:
- Custom Theme Context
- Persistent selection via LocalStorage
- Unified theme application to:
  - Tailwind utilities
  - MUI components
  - Charts and tooltip elements
The goal was to avoid “mixed theme” artifacts.

## Motion & Microinteractions
Meaningful UX enhancements include:
- Card hover scaling
- Sidebar expand / collapse animation using Framer Motion
- Right Rail slide-in / slide-out animation
- Toolbar & header icons with tap/hover motion
- Smooth theme toggle transition

## Responsiveness
The layout adapts across:
- Desktop
- Laptop
- Tablet stacking behavior
- Scroll-safe content areas
The DataGrid area remains usable and scrollable within constrained heights.

## Design Decisions
Why Vite over CRA?
- Faster dev server
- Smaller build output
- Better modern tooling support

Why Tailwind + MUI together?
- Tailwind for spacing/layout consistency
- MUI for DataGrid, icons, surface components

Why custom theme context instead of pure Tailwind dark mode?
- MUI + Recharts require shared theme state
- Prevents desynchronized theme rendering

## Challenges Faced
1. Achieving identical spacing from Figma references
Solution: measured grid, gap, and padding proportions manually.

2. Dark mode compatibility across libraries
Solution: unified theme object + conditional overrides.

3. Table styling with avatars & column alignment
Solution: column renderers + custom cell layout.

4. Responsive sidebar without layout shift
Solution: width transition + flex recalculation.

## Improvements Made Beyond Base Requirements
- Sidebar width animation (Framer Motion)
- Right Rail slide-in animation
- Toolbar and header icon microinteractions
- Functional status filtering & date sorting
- Real pagination using custom slot
- Dark theme persistence
- Improved chart tooltip readability

## Future Scope (If project were extended)
- Advanced filtering panel (status, date range)
- Multi-column sort indicators
- API-driven data instead of static JSON
- Role-based dashboard access
- Skeleton loaders & shimmer states

```bash
src/
  components/
  context/
  pages/
  utils/
```

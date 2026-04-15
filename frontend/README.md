# Startup Diagnosis Profiler — Frontend

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

This directory contains the React-based Single Page Application (SPA) for the InUnity Startup Diagnosis Profiler. It is built for a premium, high-density diagnostic experience.

---

## 🛠️ Technical Stack

- **Framework**: [React 18](https://reactjs.org/) (Functional Components + Hooks)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom design system.
- **State Management**: 
  - **Global/UI**: [Zustand](https://github.com/pmndrs/zustand)
  - **Server State**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Database/Auth**: [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- **Exports**: 
  - **PDF**: `@react-pdf/renderer` (Declarative client-side PDF generation)
  - **Excel**: `xlsx-js-style` (SheetJS with custom styling extensions)

---

## 📂 Project Structure

- `/src/components/form`: Contains the 7-section modular diagnostic profiler.
- `/src/components/pdf`: React-PDF templates for diagnostic reports.
- `/src/hooks`: Custom hooks for data fetching (`useTeams`) and auto-save logic.
- `/src/store`: Zustand stores for UI and team state.
- `/src/utils`: Scoring algorithms (`scores.ts`) and Excel export utilities.
- `/src/lib`: API clients and library configurations (Supabase, Axios).

---

## 🏗️ Core Features

### 1. 7-Section Diagnostic Profiler
The form is broken down into modular components to ensure performance and maintainability:
- **Section 1**: Basic info & team composition.
- **Section 2-4**: Problem/Solution, Market Validation, and Business Model.
- **Section 5**: TRL/BRL/CRL Readiness scoring.
- **Section 6**: Pitch readiness evaluation.
- **Section 7**: Final mentor diagnosis and roadmap planning.

### 2. Dynamic Dashboard
A real-time overview focusing on:
- High-level diagnostic stats (Total, Completed, In-Progress).
- Unified team filtering.
- Visual status indicators based on score density and field completion.

### 3. Auto-Save Logic
Implemented via `useAutoSave`, which uses a debounced (600ms) sync mechanism to ensure no data loss during long diagnostic sessions.

---

## 🚀 Development

### Installation
```bash
npm install
```

### Local Dev
```bash
npm run dev
```

### Environment Setup
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🚢 Deployment
Built for **Vercel**. 
- SPA routing configured via `vercel.json` rewrites.
- Production build: `npm run build`.

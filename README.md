# InUnity Startup Diagnosis Profiler

![Version](https://img.shields.io/badge/version-0.1.0-gold)
![License](https://img.shields.io/badge/license-proprietary-navy)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20FastAPI%20%7C%20Supabase-teal)

A premium, full-stack diagnostic platform designed for high-density evaluation of early-stage startups. This tool combines a comprehensive 7-section diagnostic profiler with AI-powered analysis to identify strengths, critical gaps, and actionable roadmaps for founders and mentors.

---

## 🚀 Overview

The **InUnity Startup Diagnosis Profiler** streamlines the incubation process by providing a unified interface for data capture and automated insight generation. It replaces fragmented spreadsheets with a robust, color-coded dashboard and professional reporting suite.

### Key Features
- **📊 Real-time Dashboard**: Track diagnostic status (New, In Progress, Completed, Finalized) and key metrics across all teams.
- **📝 7-Section Diagnostic Form**: Modular evaluation covering Basic Info, Problem/Solution, Market Validation, Business Model, Readiness Levels (TRL/BRL/CRL), Pitch, and Mentor Diagnosis.
- **🤖 Auto-Scale Analysis**: AI-driven "one-click" synthesis of startup strengths and weaknesses using OpenRouter LLMs.
- **📄 Professional Reporting**: Generate high-density PDF diagnostic reports and high-fidelity Excel exports for cross-team analysis.
- **🛣️ Actionable Roadmaps**: Priority-based planning (P0/P1/P2) integrated directly into the startup profile.

---

## 🏗️ Architecture

The project follows a decoupled monorepo-style architecture:

- **Frontend**: React 18 SPA built with Vite and TypeScript. Styled with a custom "Clean Studio" design system using Tailwind CSS.
- **Backend**: FastAPI (Python 3.11) serving as a secure gateway for AI analysis and server-side PDF generation.
- **Database/Auth**: Powered by Supabase. Uses Row-Level Security (RLS) and JWT-based authentication.
- **AI Engine**: Integrated with OpenRouter to leverage state-of-the-art models (Llama 3.1, Mistral, etc.) for automated analysis.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- A Supabase Project
- An OpenRouter API Key

### Unified Setup Flow

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd "Startup Profiling Tool"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env  # Configure your Supabase and OpenRouter keys
   uvicorn app.main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local  # Configure VITE_SUPABASE_URL and KEY
   npm run dev
   ```

---

## 🔐 Environment Variables

### Backend (`/backend/.env`)
| Variable | Description |
| :--- | :--- |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Private service key for DB operations |
| `OPENROUTER_API_KEY` | Key for AI analysis features |
| `DATABASE_URL` | SQLAlchemy connection string |

### Frontend (`/frontend/.env.local`)
| Variable | Description |
| :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anon key for client-side Auth |

---

## 🚢 Deployment

- **Frontend**: Optimised for deployment on [Vercel](https://vercel.com). Includes `vercel.json` for SPA routing.
- **Backend**: Configured for [Render.com](https://render.com) via `render.yaml`.
- **Database**: Managed migrations available in the `/supabase` folder.

---

## 📜 License
Proprietary — Developed for **InUnity Private Limited**.

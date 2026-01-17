# Star AI

AI-assisted platform to connect startup **innovators** and **investors**, analyze ideas, highlight risk, and collaborate via chat, milestones, and basic video.

## Tech stack

- Backend: Node.js, Express, MongoDB, JWT, Socket.IO  
- Frontend: React + Vite, React Router, Tailwind CSS, Socket.IO client  
- Infra: Docker Compose for Mongo + backend + frontend

## Monorepo structure

- `packages/backend` – Express API, auth, matching, chat, milestones, insights  
- `packages/frontend` – React SPA (dashboard, chat, matching, collaboration)

## Local development

```bash
# install root + app deps
npm install
cd packages/backend && npm install
cd ../frontend && npm install

# from repo root
npm run dev

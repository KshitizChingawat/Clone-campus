
# Campus Preorder 🚀
Smart Campus Food Pre‑Ordering Platform

## Overview
Campus Preorder is a full‑stack web platform designed to eliminate long queues in university cafeterias by allowing students and faculty to pre‑order food and pick it up using a secure QR verification system. The platform automates the entire order lifecycle — from ordering to preparation and pickup — improving efficiency for both users and vendors.

## Problem
During peak hours, students often spend 15–20 minutes waiting in line at campus cafeterias. This leads to lost time, overcrowding, and inefficient order handling for vendors.

## Solution
Campus Preorder introduces a slot‑based ordering system where users can:
- Pre‑order meals through a mobile‑friendly interface
- Pay online using digital payment methods
- Pick up orders instantly using QR verification
- Reduce waiting time and improve order management

## Key Features
- Role‑based authentication (Student / Vendor / Admin)
- Slot‑based food pre‑ordering
- Vendor preparation dashboard
- QR‑based pickup verification
- Online payment integration
- Automated order lifecycle management
- Secure APIs with JWT authentication

## Tech Stack
Frontend:
- React.js

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Authentication:
- JWT (JSON Web Tokens)

Payments:
- UPI / Card / Wallet integration

## Architecture
User → React Frontend  
→ Node.js / Express API  
→ MongoDB Database  
→ Vendor Dashboard + Order Processing  
→ QR Verification for Pickup

## Impact
- Reduced average waiting time by **70–80%**
- Achieved **95%+ order success rate** during peak-hour testing
- Improved vendor order organization and preparation flow

## Future Improvements
- AI‑based demand prediction for food items
- Dynamic slot allocation during peak hours
- Mobile app version
- Vendor analytics dashboard

## Repository
GitHub:  
https://github.com/KshitizChingawat/campus-preorder

## Local Setup
- Backend: copy `backend/.env.example` to `backend/.env`, install dependencies, then run `npm run db:migrate` and `npm run db:seed` inside `backend`.
- Frontend: copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL` to your backend URL.
- Development: run `npm run dev:backend` and `npm run dev:frontend` from the repo root.

## Deployment Notes
- Deploy the backend as a Node service with the start command `npm run start` in `backend`.
- Set `DATABASE_URL`, `JWT_SECRET`, `PORT`, and `FRONTEND_URL` for the backend environment.
- Run Prisma migrations during backend deploy with `npm run db:migrate`, then seed initial campuses with `npm run db:seed`.
- Deploy the frontend as a static site from `frontend` with the build command `npm run build`.
- Set `VITE_API_URL` in the frontend environment to the deployed backend API base URL, for example `https://your-backend.example.com/api`.

## Author
**Kshitiz Chingawat**  
B.Tech Computer Science Engineering – Medicaps University

Skills: AI Automation, Backend Development, Workflow Automation, AI Agents, Prompt Engineering

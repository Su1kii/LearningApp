📚 K-12 Learning Management System (LMS)
<p align="center"> <img src="LearningAppAi.png" alt="Learning App AI Preview" width="800"> </p>

A full-stack Learning Management System built with FastAPI and React (TypeScript) featuring:

✅ AI-powered automated grading
✅ Personalized learning recommendations
✅ Teacher & student dashboards
✅ Beautiful animated UI
✅ Modern, scalable full-stack architecture

Built in 3 days as a demonstration of rapid full-stack development with clean architecture & AI integration.

🚀 Features
👩‍🏫 Teacher Features

Create & manage courses

Add assignments with due dates & scoring

View student submissions

Instant AI-generated grades

Organized dashboard

🧑‍🎓 Student Features

Browse/enroll in courses

Complete assignments

Instant AI grading + feedback

Personalized learning recommendations

View performance & grades

🤖 AI Capabilities

Automated grading algorithm

Performance scoring

Learning path assignment (Foundational → Intermediate → Advanced)

Personalized recommendations

🏗️ Tech Stack
Backend (FastAPI)

FastAPI

SQLAlchemy

SQLite / PostgreSQL

JWT Auth

bcrypt password hashing

Pydantic

Frontend (React)

React 18

TypeScript

Vite

Axios

React Router

Framer Motion

Lucide Icons

🧩 Architecture Overview
Frontend (React + TS)
     ↓ Axios REST API
FastAPI Backend (Python)
     ↓ SQLAlchemy ORM
 Database (SQLite/PostgreSQL)

Backend Structure
backend/
├── app/
│   ├── routers/        # Auth, courses, assignments, AI
│   ├── models.py
│   ├── schemas.py
│   ├── services/       # AI logic
│   ├── utils/          # Security, JWT
│   ├── dependencies.py
│   └── config.py
└── main.py

Frontend Structure
frontend/
├── src/
│   ├── pages/
│   ├── contexts/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx

🔐 Authentication

Secure JWT-based login

Role-based routes (teacher or student)

bcrypt password hashing

Tokens stored client-side

Auto-expired tokens

Example role guard:

def require_teacher(current_user: User = Depends(get_current_user)):
    if current_user.role != "teacher":
        raise HTTPException(403, "Only teachers can perform this action")

🤖 AI Grading System

AI scores student submissions based on:

Content length

Word count

Analytical keywords (“because”, “therefore”, etc.)

Example usage

Example:

if len(content) > 200:
    score += max_score * 0.2
if any(word in content.lower() for word in ["explain", "analysis"]):
    score += max_score * 0.2


Also generates written feedback automatically.

🚀 Getting Started
1. Backend Setup (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload


Backend:
http://localhost:8000

Docs: http://localhost:8000/docs

2. Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Frontend:
http://localhost:3000

🧪 How to Test the System

Register as Teacher

Create a Course

Add an Assignment

Register as Student

Enroll in the course

Submit assignment

See instant AI grade + feedback

View personalized learning recommendations

🌟 Future Enhancements

GPT/BERT-style semantic grading

Real-time updates (WebSockets)

File uploads

Analytics dashboards

Mobile app (React Native)

☁️ Deployment
Backend (Render)

Deploy /backend

Use PostgreSQL

Set environment variables

Frontend (Vercel)

Deploy /frontend

Set VITE_API_URL=https://your-backend.onrender.com/api

🏁 Conclusion

This LMS demonstrates:

✔️ Full-stack engineering

✔️ Clean architecture & modular code

✔️ AI integration

✔️ Strong UX with animations

✔️ Rapid development (3 days)

Built using FastAPI, React, TypeScript, SQLAlchemy, JWT, bcrypt, and Framer Motion.

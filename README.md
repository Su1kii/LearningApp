# 📚 LearningAppAI – AI-Powered K-12 Learning Management System (FastAPI + React)

LearningAppAI is a full-stack Learning Management System designed for K-12 education.  
Students can enroll in courses, submit assignments, and instantly receive AI-generated grades and personalized learning recommendations.  
Teachers can create courses, manage assignments, and view AI-assisted student performance.

Built with a **FastAPI backend**, **React (TypeScript) frontend**, **SQLAlchemy ORM**, and a clean, modern UI.

---

## 🖼️ Preview

![LearningAppAI Screenshot](./LearningAppAI.png)

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login & registration  
- Role-based access (**Teacher** / **Student**)  
- Password hashing with `bcrypt`  
- Protected API routes

### 📘 Courses & Enrollment
- Teachers can create, update, and manage courses  
- Students can browse and enroll in courses  
- Enrollment status tracked per user

### 📝 Assignments & Submissions
- Teachers create assignments with due dates & max scores  
- Students submit text-based assignments  
- Submissions linked to assignment + student

### 🤖 AI Auto-Grading
- Automated scoring based on:
  - Content length
  - Word count
  - Analytical keywords (e.g. "because", "therefore")
  - Use of examples  
- Instant written feedback and score
- Teachers can review AI-generated grades

### 🎯 Personalized Learning Recommendations
- Performance analysis across submissions
- Student learning paths:
  - Foundational (needs basics)
  - Intermediate (making progress)
  - Advanced (ready for advanced topics)

---

## 🧑‍💻 Tech Stack

### Backend (FastAPI)
- **FastAPI** – high-performance Python API  
- **SQLAlchemy** – ORM (SQLite for dev / PostgreSQL-ready)  
- **Pydantic** – validation & serialization  
- **python-jose** – JWT handling  
- **bcrypt** – password hashing  
- **uvicorn** – ASGI server

### Frontend (React + TypeScript)
- **React 18** + **TypeScript**  
- **Vite** – dev server & build  
- **Axios** – API calls  
- **React Router** – client routing  
- **Framer Motion** – animations  
- **Lucide Icons** – icon set

---

## 🧪 Getting Started Locally

### Backend
```bash
git clone https://github.com/yourusername/LearningAppAI.git
cd LearningAppAI/backend

python -m venv env
source env/bin/activate   # Windows: env\Scripts\activate
pip install -r requirements.txt

uvicorn main:app --reload
Backend: http://localhost:8000
Docs: http://localhost:8000/docs

Frontend
bash
Copy code
cd ../frontend
npm install
npm run dev
Frontend: http://localhost:3000
```

🚀 Deployment (Quick)
Backend: Deploy to Render 

Frontend: Deploy to Vercel 



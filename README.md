# NewsFest

NewsFest is a full-stack AI-powered news platform built using:

- React (Vite) + Tailwind CSS (Frontend)
- FastAPI (Backend)
- AI Summarization
- PostgreSQL + SQLModel (Database)

---

## Features

- Browse latest news by category
- AI-generated summaries
- Bookmark articles
- User authentication (Login/Signup)
- Personalized profile (bookmarks + summaries)

---

# Project Structure

NEWSFEST/
│
├── backend/
├── frontend/
├── requirements.txt
└── README.md

---

# Backend Setup

## Create Virtual Environment

cd backend  
python -m venv venv  
source venv/bin/activate  (Linux/Mac)  
venv\Scripts\activate   (Windows)

## Install Dependencies

pip install -r ../requirements.txt

---

# PostgreSQL Setup

## Install PostgreSQL
https://www.postgresql.org/download/

## Create Database

CREATE DATABASE newsfest;

## Database URL Format

postgresql://username:password@localhost:5432/newsfest

Example:
postgresql://postgres:1234@localhost:5432/newsfest

## .env file

DATABASE_URL=postgresql://postgres:1234@localhost:5432/newsfest

---

# Run Backend

uvicorn main:app --reload

---

# Frontend Setup

cd frontend  
npm install  
npm run dev  

---

# API Endpoints

/news  
/summary  
/bookmark  
/login  
/sign_up  
/bookmarks  
/summaries  

---

# Common Issues

422 Error → Check request body  
CORS Error → Enable middleware  

---

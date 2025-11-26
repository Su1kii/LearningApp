from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str  # "teacher" or "student"

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    
    class Config:
        from_attributes = True

# Course Schemas
class CourseCreate(BaseModel):
    title: str
    description: str
    subject: str

class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    subject: str
    teacher_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Assignment Schemas
class AssignmentCreate(BaseModel):
    course_id: int
    title: str
    description: str
    due_date: datetime
    max_score: int

class AssignmentResponse(BaseModel):
    id: int
    course_id: int
    title: str
    description: str
    due_date: datetime
    max_score: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Submission Schemas
class SubmissionCreate(BaseModel):
    assignment_id: int
    content: str

class SubmissionResponse(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    content: str
    submitted_at: datetime
    grade: Optional[float]
    
    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# AI Schemas
class AIRecommendations(BaseModel):
    recommendations: list[str]
    learning_path: str
    performance_score: float


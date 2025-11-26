from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.dependencies import get_current_user, require_teacher, require_student
from app.models import User, Course, Enrollment
from app.schemas import CourseCreate, CourseResponse

router = APIRouter(prefix="/api/courses", tags=["Courses"])

@router.post("", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    course: CourseCreate,
    current_user: User = Depends(require_teacher),
    db: Session = Depends(get_db)
):
    """Create a new course (teachers only)"""
    db_course = Course(
        title=course.title,
        description=course.description,
        subject=course.subject,
        teacher_id=current_user.id
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("", response_model=List[CourseResponse])
def get_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get courses (filtered by role)"""
    if current_user.role == "teacher":
        # Teachers see courses they created
        courses = db.query(Course).filter(Course.teacher_id == current_user.id).all()
    else:
        # Students see enrolled courses
        enrollments = db.query(Enrollment).filter(Enrollment.student_id == current_user.id).all()
        course_ids = [e.course_id for e in enrollments]
        courses = db.query(Course).filter(Course.id.in_(course_ids)).all()
    return courses

@router.get("/browse", response_model=List[CourseResponse])
def browse_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Browse all available courses (students only)"""
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Only students can browse courses")
    
    # Get all courses
    all_courses = db.query(Course).all()
    
    # Return all courses (students can browse all)
    return all_courses

@router.get("/{course_id}", response_model=CourseResponse)
def get_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get course details"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.get("/{course_id}/enrollment-status")
def get_enrollment_status(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Check if current user is enrolled in a course"""
    if current_user.role != "student":
        return {"enrolled": False}
    
    enrollment = db.query(Enrollment).filter(
        Enrollment.course_id == course_id,
        Enrollment.student_id == current_user.id
    ).first()
    
    return {"enrolled": enrollment is not None}

@router.post("/{course_id}/enroll", status_code=status.HTTP_201_CREATED)
def enroll_in_course(
    course_id: int,
    current_user: User = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Enroll in a course (students only)"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if already enrolled
    existing = db.query(Enrollment).filter(
        Enrollment.course_id == course_id,
        Enrollment.student_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")
    
    enrollment = Enrollment(course_id=course_id, student_id=current_user.id)
    db.add(enrollment)
    db.commit()
    return {"message": "Enrolled successfully"}


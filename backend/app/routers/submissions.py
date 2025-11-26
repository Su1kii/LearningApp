from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.dependencies import get_current_user, require_student
from app.models import User, Assignment, Submission, Grade
from app.schemas import SubmissionCreate, SubmissionResponse
from app.services.ai_service import ai_grade_submission

router = APIRouter(prefix="/api/submissions", tags=["Submissions"])

@router.post("", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
def create_submission(
    submission: SubmissionCreate,
    current_user: User = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Submit an assignment (students only)"""
    # Verify assignment exists
    assignment = db.query(Assignment).filter(Assignment.id == submission.assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    # Auto-grade using AI
    ai_score = ai_grade_submission(submission.content, assignment.max_score)
    
    # Create submission
    db_submission = Submission(
        assignment_id=submission.assignment_id,
        student_id=current_user.id,
        content=submission.content,
        grade=ai_score
    )
    db.add(db_submission)
    db.flush()  # Flush to get the submission ID
    
    # Create grade record
    db_grade = Grade(
        submission_id=db_submission.id,
        score=ai_score,
        feedback=f"AI Auto-graded: Your submission received {ai_score:.1f}/{assignment.max_score} points based on content analysis."
    )
    db.add(db_grade)
    db.commit()
    db.refresh(db_submission)
    return db_submission

@router.get("/assignment/{assignment_id}", response_model=List[SubmissionResponse])
def get_submissions(
    assignment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get submissions for an assignment"""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    if current_user.role == "teacher":
        submissions = db.query(Submission).filter(Submission.assignment_id == assignment_id).all()
    else:
        submissions = db.query(Submission).filter(
            Submission.assignment_id == assignment_id,
            Submission.student_id == current_user.id
        ).all()
    return submissions


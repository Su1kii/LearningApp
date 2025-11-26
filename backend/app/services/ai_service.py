from sqlalchemy.orm import Session
from app.models import Submission, Assignment

def ai_grade_submission(content: str, max_score: int) -> float:
    """AI-powered grading based on content analysis"""
    content_lower = content.lower()
    score = 0.0
    
    # Check for key indicators
    if len(content) > 50:
        score += max_score * 0.3
    if len(content) > 200:
        score += max_score * 0.2
    if any(word in content_lower for word in ["explain", "because", "therefore", "analysis"]):
        score += max_score * 0.2
    if any(word in content_lower for word in ["example", "instance", "case"]):
        score += max_score * 0.15
    if len(content.split()) > 20:
        score += max_score * 0.15
    
    return min(score, max_score)

def get_learning_recommendations(student_id: int, db: Session) -> dict:
    """Generate personalized learning recommendations"""
    submissions = db.query(Submission).filter(Submission.student_id == student_id).all()
    
    if not submissions:
        return {
            "recommendations": [
                "Start by completing your first assignment to get personalized recommendations",
                "Explore different subjects to find your interests"
            ],
            "learning_path": "beginner",
            "performance_score": 0.0
        }
    
    # Calculate performance
    total_score = sum(s.grade or 0 for s in submissions)
    total_max = sum(
        db.query(Assignment).filter(Assignment.id == s.assignment_id).first().max_score 
        for s in submissions
    )
    performance_ratio = total_score / total_max if total_max > 0 else 0
    
    # Generate recommendations based on performance
    recommendations = []
    if performance_ratio < 0.6:
        recommendations.append("Focus on understanding core concepts before moving to advanced topics")
        recommendations.append("Consider reviewing previous lessons and seeking help from your teacher")
        learning_path = "foundational"
    elif performance_ratio < 0.8:
        recommendations.append("You're making good progress! Try tackling more challenging assignments")
        recommendations.append("Consider exploring related topics to deepen your understanding")
        learning_path = "intermediate"
    else:
        recommendations.append("Excellent work! You're ready for advanced topics and projects")
        recommendations.append("Consider helping classmates or exploring independent research")
        learning_path = "advanced"
    
    return {
        "recommendations": recommendations,
        "learning_path": learning_path,
        "performance_score": performance_ratio * 100
    }


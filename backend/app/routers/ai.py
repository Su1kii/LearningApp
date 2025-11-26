from fastapi import APIRouter, Depends
from app.database import get_db
from app.dependencies import require_student
from app.models import User
from app.schemas import AIRecommendations
from app.services.ai_service import get_learning_recommendations

router = APIRouter(prefix="/api/ai", tags=["AI Features"])

@router.get("/recommendations", response_model=AIRecommendations)
def get_ai_recommendations(
    current_user: User = Depends(require_student),
    db = Depends(get_db)
):
    """Get AI-powered personalized learning recommendations (students only)"""
    recommendations = get_learning_recommendations(current_user.id, db)
    return recommendations


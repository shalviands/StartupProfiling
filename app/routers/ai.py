from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.database import get_db
from app.models.team import Team, TeamScoredField, AIAnalysis
from app.services.ai_service import AIService
from app.schemas.team import AIAnalysisResponse

router = APIRouter(prefix="/teams", tags=["ai"])
ai_service = AIService()

@router.post("/{team_id}/analyse", response_model=AIAnalysisResponse)
async def analyse_team(team_id: UUID, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Prepare data for AI (Read from direct columns)
    team_data = {
        "startup_name": team.startup_name,
        "sector": team.sector,
        "problem_score": team.problem_score,
        "solution_score": team.solution_score,
        "unique_value_score": team.unique_value_score,
        "customer_interview_score": team.customer_interview_score,
        "competitor_score": team.competitor_score,
        "market_size_score": team.market_size_score,
        "revenue_model_score": team.revenue_model_score,
        "bmc_score": team.bmc_score,
        "pitch_deck_score": team.pitch_deck_score,
        "elevator_score": team.elevator_score,
        "investor_ask_score": team.investor_ask_score,
        "revenue_stage": team.revenue_stage,
        "trl": team.trl,
        "brl": team.brl,
        "crl": team.crl,
        "p0_need": team.p0_need,
        "notes": team.notes,
    }
    
    # Calculate overall score for prompt
    scores = [v for v in [
        team.problem_score, team.solution_score, team.unique_value_score,
        team.customer_interview_score, team.competitor_score, team.market_size_score,
        team.revenue_model_score, team.bmc_score,
        team.pitch_deck_score, team.elevator_score, team.investor_ask_score
    ] if v and v > 0]
    team_data["overall_score"] = round(sum(scores)/len(scores), 1) if scores else 0

    
    result = await ai_service.analyse(team_data)
    
    # Update team with AI findings
    team.strengths = result.get("strengths")
    team.gaps = result.get("gaps")
    
    # Log to history
    new_analysis = AIAnalysis(
        team_id=team_id,
        model_used=result.get("model_used"),
        strengths=result.get("strengths"),
        gaps=result.get("gaps"),
        recommendations=result.get("recommendations"),
        readiness_summary=result.get("readiness_summary")
    )
    db.add(new_analysis)
    db.commit()
    
    return result

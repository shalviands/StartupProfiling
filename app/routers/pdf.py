from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from uuid import UUID
import io
from app.core.database import get_db
from app.models.team import Team
from app.services.pdf_service import generate_diagnosis_pdf

router = APIRouter(prefix="/teams", tags=["pdf"])

@router.post("/{team_id}/pdf")
async def get_team_pdf(team_id: UUID, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Prepare scores dict
    scored_fields = {f.field_key: f.score for f in team.scored_fields}
    scores = {
        "problem": scored_fields.get("problem"),
        "market": scored_fields.get("market"),
        "biz_model": scored_fields.get("biz_model"),
        "pitch": scored_fields.get("pitch"),
    }
    # Calculate overall
    vals = [v for v in scores.values() if v is not None]
    scores["overall"] = round(sum(vals)/len(vals), 1) if vals else 0
    
    # Convert team model to dict for pdf service
    team_data = {
        "startup_name": team.startup_name,
        "team_name": team.team_name,
        "sector": team.sector,
        "interview_date": team.interview_date,
        "interviewer": team.interviewer,
        "trl": team.trl,
        "brl": team.brl,
        "crl": team.crl,
        "revenue_stage": team.revenue_stage,
        "bmc_done": team.bmc_done,
        "strengths": team.strengths,
        "gaps": team.gaps,
        "modules": team.modules,
        "p0_need": team.p0_need,
        "p1_need": team.p1_need,
        "p2_need": team.p2_need,
        "institution": team.institution,
        "team_size": team.team_size,
        "roles": team.roles,
        "mentor": team.mentor,
        "next_checkin": team.next_checkin,
        "notes": team.notes,
        "roadmap": [{"priority": r.priority, "action": r.action, "by_when": r.by_when} for r in team.roadmap_items]
    }
    
    pdf_bytes = generate_diagnosis_pdf(team_data, scores)
    
    filename = f"{team.startup_name or 'Startup'}_Diagnosis.pdf"
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

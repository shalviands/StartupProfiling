from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, selectinload
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.models.team import Team, RoadmapItem
from app.schemas.team import TeamCreate, TeamUpdate, TeamResponse
from app.core.auth import get_current_user, User

router = APIRouter(prefix="/teams", tags=["teams"])

@router.get("/", response_model=List[TeamResponse])
def list_teams(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Team)\
             .options(selectinload(Team.roadmap_items))\
             .filter(Team.user_id == current_user.id)\
             .all()

@router.post("/", response_model=TeamResponse)
def create_team(team_in: TeamCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_team = Team(**team_in.model_dump(), user_id=current_user.id)
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

@router.get("/{team_id}", response_model=TeamResponse)
def get_team(team_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    team = db.query(Team).filter(Team.id == team_id, Team.user_id == current_user.id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found or unauthorized")
    return team

@router.put("/{team_id}", response_model=TeamResponse)
def update_team(team_id: UUID, team_in: TeamUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_team = db.query(Team).filter(Team.id == team_id, Team.user_id == current_user.id).first()
    if not db_team:
        raise HTTPException(status_code=404, detail="Team not found or unauthorized")
    
    update_data = team_in.model_dump(exclude_unset=True)
    
    # Handle nested roadmap items separately
    roadmap = update_data.pop("roadmap", None)

    # Basic fields
    for field, value in update_data.items():
        if hasattr(db_team, field):
            setattr(db_team, field, value)
    
    # Update Roadmap Items (Replace existing ones with new ones)
    if roadmap is not None:
        # Clear existing
        db.query(RoadmapItem).filter(RoadmapItem.team_id == team_id).delete()
        # Add new ones
        for ri in roadmap:
            # ri is a dict from model_dump
            db_team.roadmap_items.append(RoadmapItem(**ri))
    
    db.commit()
    db.refresh(db_team)
    return db_team

@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team(team_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_team = db.query(Team).filter(Team.id == team_id, Team.user_id == current_user.id).first()
    if not db_team:
        raise HTTPException(status_code=404, detail="Team not found or unauthorized")
    db.delete(db_team)
    db.commit()
    return None

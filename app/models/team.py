from sqlalchemy import Column, String, Integer, Date, DateTime, ForeignKey, Float, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.core.database import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    
    team_name = Column(String)
    startup_name = Column(String)
    sector = Column(String)
    institution = Column(String)
    team_size = Column(String)
    roles = Column(String)
    interview_date = Column(Date)
    interviewer = Column(String)
    
    # Section 1 - Expansion
    sector_other = Column(String)
    
    # Section 2 - Problem & Solution
    problem_statement = Column(Text)
    problem_score = Column(Integer, default=0)
    solution_description = Column(Text)
    solution_score = Column(Integer, default=0)
    product_type = Column(String)
    product_type_other = Column(String)
    unique_value = Column(Text)
    unique_value_score = Column(Integer, default=0)
    
    # Section 3 - Market & Validation
    users_tested = Column(Integer, default=0)
    testing_details = Column(Text)
    stakeholders_interacted = Column(Integer, default=0)
    stakeholder_types = Column(String)
    customer_interview_score = Column(Integer, default=0)
    customer_interview_details = Column(Text)
    competitor_score = Column(Integer, default=0)
    competitor_details = Column(Text)
    market_size_score = Column(Integer, default=0)
    market_size_details = Column(Text)

    # Section 4 - Business Model
    revenue_model_score = Column(Integer, default=0)
    revenue_model_details = Column(Text)
    bmc_score = Column(Integer, default=0)
    bmc_details = Column(Text)
    
    revenue_stage = Column(String)
    business_model_type = Column(String)
    bmc_done = Column(String)
    
    trl = Column(Integer)
    brl = Column(Integer)
    crl = Column(Integer)
    
    # Section 6 - Pitch
    pitch_deck_score = Column(Integer, default=0)
    pitch_deck_details = Column(Text)
    elevator_score = Column(Integer, default=0)
    elevator_details = Column(Text)
    investor_ask_score = Column(Integer, default=0)
    investor_ask_details = Column(Text)

    p0_need = Column(Text)
    p1_need = Column(Text)
    p2_need = Column(Text)
    barriers = Column(Text)
    mentor = Column(String)
    next_checkin = Column(Date)
    entry_level = Column(String)
    strengths = Column(Text)
    gaps = Column(Text)
    biz_model_notes = Column(Text)
    pitch_notes = Column(Text)
    modules = Column(Text)
    notes = Column(Text)

    scored_fields = relationship("TeamScoredField", back_populates="team", cascade="all, delete-orphan")
    roadmap_items = relationship("RoadmapItem", back_populates="team", cascade="all, delete-orphan")
    ai_analyses = relationship("AIAnalysis", back_populates="team", cascade="all, delete-orphan")

class TeamScoredField(Base):
    __tablename__ = "team_scored_fields"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id", ondelete="CASCADE"))
    field_key = Column(String, nullable=False)
    answer = Column(Text)
    score = Column(Integer)

    team = relationship("Team", back_populates="scored_fields")
    __table_args__ = (UniqueConstraint('team_id', 'field_key', name='_team_field_uc'),)

class RoadmapItem(Base):
    __tablename__ = "roadmap_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id", ondelete="CASCADE"))
    priority = Column(String) # P0, P1, P2
    action = Column(Text)
    support_from = Column(Text)
    by_when = Column(String)
    position = Column(Integer, default=0)

    team = relationship("Team", back_populates="roadmap_items")

class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id", ondelete="CASCADE"))
    created_at = Column(DateTime, default=datetime.utcnow)
    model_used = Column(String)
    strengths = Column(Text)
    gaps = Column(Text)
    recommendations = Column(Text)
    readiness_summary = Column(Text)

    team = relationship("Team", back_populates="ai_analyses")

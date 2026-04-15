from pydantic import BaseModel, ConfigDict, Field
from datetime import date, datetime
from typing import List, Optional
from uuid import UUID

class RoadmapItemSchema(BaseModel):
    priority: str = Field(max_length=10)
    action: str = Field(max_length=1000)
    by_when: str = Field(max_length=100)
    support_from: Optional[str] = Field(None, max_length=255)
    position: Optional[int] = 0

class TeamBase(BaseModel):
    # Basic Info
    team_name: Optional[str] = Field(None, max_length=255)
    startup_name: Optional[str] = Field(None, max_length=255)
    sector: Optional[str] = Field(None, max_length=100)
    sector_other: Optional[str] = Field(None, max_length=255)
    institution: Optional[str] = Field(None, max_length=255)
    team_size: Optional[str] = Field(None, max_length=50)
    roles: Optional[str] = Field(None, max_length=500)
    interview_date: Optional[date] = None
    interviewer: Optional[str] = Field(None, max_length=255)

    # Section 2 — Problem & Solution
    problem_statement: str = Field(default='', max_length=5000)
    problem_score: int = Field(default=0, ge=0, le=5)
    solution_description: str = Field(default='', max_length=5000)
    solution_score: int = Field(default=0, ge=0, le=5)
    product_type: str = Field(default='', max_length=100)
    product_type_other: str = Field(default='', max_length=255)
    unique_value: str = Field(default='', max_length=5000)
    unique_value_score: int = Field(default=0, ge=0, le=5)

    # Section 3 — Market & Validation
    users_tested: int = Field(default=0, ge=0)
    testing_details: str = Field(default='', max_length=5000)
    stakeholders_interacted: int = Field(default=0, ge=0)
    stakeholder_types: str = Field(default='', max_length=1000)
    customer_interview_details: str = Field(default='', max_length=5000)
    customer_interview_score: int = Field(default=0, ge=0, le=5)
    competitor_details: str = Field(default='', max_length=5000)
    competitor_score: int = Field(default=0, ge=0, le=5)
    market_size_details: str = Field(default='', max_length=5000)
    market_size_score: int = Field(default=0, ge=0, le=5)

    # Section 4 — Business Model
    revenue_model_details: str = Field(default='', max_length=5000)
    revenue_model_score: int = Field(default=0, ge=0, le=5)
    bmc_details: str = Field(default='', max_length=5000)
    bmc_score: int = Field(default=0, ge=0, le=5)
    revenue_stage: Optional[str] = Field(None, max_length=100)
    business_model_type: Optional[str] = Field(None, max_length=100)
    bmc_done: Optional[str] = Field(None, max_length=50)

    # Section 5 — Readiness
    trl: Optional[int] = Field(None, ge=0, le=9)
    brl: Optional[int] = Field(None, ge=0, le=9)
    crl: Optional[int] = Field(None, ge=0, le=9)

    # Section 6 — Pitch
    pitch_deck_details: str = Field(default='', max_length=5000)
    pitch_deck_score: int = Field(default=0, ge=0, le=5)
    elevator_details: str = Field(default='', max_length=5000)
    elevator_score: int = Field(default=0, ge=0, le=5)
    investor_ask_details: str = Field(default='', max_length=5000)
    investor_ask_score: int = Field(default=0, ge=0, le=5)

    # Section 7 — Diagnosis
    p0_need: Optional[str] = Field(None, max_length=1000)
    p1_need: Optional[str] = Field(None, max_length=1000)
    p2_need: Optional[str] = Field(None, max_length=1000)
    barriers: Optional[str] = Field(None, max_length=2000)
    mentor: Optional[str] = Field(None, max_length=255)
    next_checkin: Optional[date] = None
    entry_level: Optional[str] = Field(None, max_length=100)
    strengths: Optional[str] = Field(None, max_length=5000)
    gaps: Optional[str] = Field(None, max_length=5000)
    biz_model_notes: Optional[str] = Field(None, max_length=5000)
    pitch_notes: Optional[str] = Field(None, max_length=5000)
    modules: Optional[str] = Field(None, max_length=2000)
    notes: Optional[str] = Field(None, max_length=10000)

class TeamCreate(TeamBase):
    pass

class TeamUpdate(TeamBase):
    roadmap: Optional[List[RoadmapItemSchema]] = None

class TeamResponse(TeamBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    roadmap_items: List[RoadmapItemSchema] = []

    model_config = ConfigDict(
        from_attributes=True,
        protected_namespaces=()
    )

class AIAnalysisResponse(BaseModel):
    strengths: str
    gaps: str
    recommendations: str
    readiness_summary: str
    model_used: str

    model_config = ConfigDict(
        from_attributes=True,
        protected_namespaces=()
    )

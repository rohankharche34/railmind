from pydantic import BaseModel, Field


class ActionItem(BaseModel):
    step: int
    action: str
    priority: str  # immediate, short_term, ongoing
    assigned_to: str | None = None


class Stakeholder(BaseModel):
    name: str
    role: str
    contact: str | None = None


class EmergencyInput(BaseModel):
    incident_id: str = Field(default="", description="Unique incident identifier")
    incident_type: str = Field(..., description="Type: human_intrusion, unattended_object, track_obstacle, animal, fire_hazard, fall_detected, smoke_fire")
    location: str = Field(default="Unknown", description="Section ID, station name, or coordinates")
    severity: str = Field(default="high", description="critical, high, medium, low")
    timestamp: str = Field(default="", description="ISO 8601 timestamp")
    description: str = Field(default="", description="Human-readable description")
    detected_objects: list[dict] = Field(default_factory=list, description="Objects detected by CV module")
    risk_score: float | None = Field(default=None, ge=0, le=100, description="Risk score from prediction module")


class EmergencyOutput(BaseModel):
    incident_id: str
    incident_type: str
    location: str
    severity: str
    category: str
    escalation_level: str
    summary: str
    actions: list[ActionItem]
    stakeholders: list[Stakeholder]

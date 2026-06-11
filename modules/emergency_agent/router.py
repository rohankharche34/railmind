from fastapi import APIRouter, HTTPException
from .schemas import EmergencyInput, EmergencyOutput, ActionItem, Stakeholder
from .graph import EmergencyGraph

router = APIRouter(prefix="/emergency", tags=["emergency"])

_graph: EmergencyGraph | None = None


def get_graph() -> EmergencyGraph:
    global _graph
    if _graph is None:
        _graph = EmergencyGraph()
    return _graph


@router.post("/assess", response_model=EmergencyOutput)
def assess_incident(data: EmergencyInput):
    graph = get_graph()
    result = graph.run(data.model_dump())

    return EmergencyOutput(
        incident_id=result.get("incident_id", ""),
        incident_type=result.get("incident_type", ""),
        location=result.get("location", ""),
        severity=result.get("severity", ""),
        category=result.get("category", ""),
        escalation_level=result.get("escalation_level", ""),
        summary=result.get("summary", ""),
        actions=[ActionItem(**a) for a in result.get("actions", [])],
        stakeholders=[Stakeholder(**s) for s in result.get("stakeholders", [])],
    )


@router.get("/health")
def health():
    return {"status": "ok", "module": "emergency_agent"}

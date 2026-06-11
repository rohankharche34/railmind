from datetime import datetime, timezone

from langgraph.graph import StateGraph, START, END

from .nodes import AgentState, classify_node, recommend_node, _format_node


class EmergencyGraph:
    def __init__(self, use_llm: bool = False):
        self.use_llm = use_llm
        self.graph = self._build()

    def _build(self) -> StateGraph:
        builder = StateGraph(AgentState)

        builder.add_node("classify", classify_node)
        builder.add_node("recommend", recommend_node)
        builder.add_node("format", _format_node)

        builder.add_edge(START, "classify")
        builder.add_edge("classify", "recommend")
        builder.add_edge("recommend", "format")
        builder.add_edge("format", END)

        return builder.compile()

    def run(self, input_data: dict) -> dict:
        now = datetime.now(timezone.utc).isoformat()

        initial_state: AgentState = {
            "incident_id": input_data.get("incident_id", f"INC-{int(datetime.now().timestamp())}"),
            "incident_type": input_data.get("incident_type", "human_intrusion"),
            "location": input_data.get("location", "Unknown"),
            "severity": input_data.get("severity", "high"),
            "timestamp": input_data.get("timestamp", now),
            "description": input_data.get("description", ""),
            "detected_objects": input_data.get("detected_objects", []),
            "risk_score": input_data.get("risk_score"),
            "category": "",
            "escalation_level": "",
            "summary": "",
            "actions": [],
            "stakeholders": [],
            "use_llm": self.use_llm,
        }

        result = self.graph.invoke(initial_state)
        return result

export interface Train {
  id: string;
  name: string;
  lat: number;
  lng: number;
  speed: number;
  status: "on_time" | "delayed" | "critical";
  delay_minutes: number;
}

export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  crowd_density: "low" | "medium" | "high" | "critical";
}

export interface RiskZone {
  id: string;
  section: string;
  lat: number;
  lng: number;
  radius: number;
  risk_score: number;
  risk_category: "low" | "moderate" | "elevated" | "high" | "critical";
  top_factors: string[];
}

export interface OperationalAlert {
  id: string;
  type: string;
  label: string;
  location: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  description: string;
}

export type AlertSeverity = "critical" | "high" | "medium" | "low";
export type AlertStatus = "active" | "investigating" | "resolved";
export type AlertFilter = "all" | "critical" | "high" | "medium";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  location: string;
  timestamp: string;
  timeAgo: string;
  status: AlertStatus;
  detectionSource: string;
  impactLevel?: string;
  assignedUnit?: string;
}

export interface IntelligenceLog {
  timestamp: string;
  type: "system" | "anomaly" | "recommendation" | "info";
  message: string;
}

export interface SuggestedAction {
  description: string;
  canAuthorize: boolean;
}

export interface EmergencyAction {
  step: number;
  action: string;
  priority: "immediate" | "short_term" | "ongoing";
  assigned_to: string;
}

export interface EmergencyRecommendation {
  id: string;
  incident_type: string;
  location: string;
  severity: string;
  category: string;
  escalation_level: string;
  summary: string;
  actions: EmergencyAction[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

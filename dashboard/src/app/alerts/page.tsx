"use client";

import RiskAlertPanel from "@/components/RiskAlertPanel";
import EmergencyRecommendations from "@/components/EmergencyRecommendations";

export default function AlertsPage() {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RiskAlertPanel />
          <EmergencyRecommendations />
        </div>
      </main>
    </div>
  );
}

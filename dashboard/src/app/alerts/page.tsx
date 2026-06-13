"use client";

import { useEffect, useMemo, useState } from "react";
import AlertCard from "@/components/AlertCard";
import IntelligenceLogPanel from "@/components/IntelligenceLog";
import { formatIstDateTime } from "@/lib/formatIst";
import { mockIncidents, intelligenceLogs, suggestedAction } from "@/lib/mockData";
import type { AlertFilter } from "@/lib/types";

const filters: { id: AlertFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
];

export default function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState<AlertFilter>("all");
  const [liveClock, setLiveClock] = useState(formatIstDateTime());

  useEffect(() => {
    const id = window.setInterval(() => {
      setLiveClock(formatIstDateTime());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const filteredAlerts = useMemo(() => {
    if (activeFilter === "all") return mockIncidents;
    return mockIncidents.filter((alert) => alert.severity === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Alert feed */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-outline-variant/30 px-6 py-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display-lg text-display-lg text-white">Incident Management</h1>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Real-time orchestration of network anomalies
                </p>
              </div>
              <p className="font-data-mono text-data-mono text-on-surface-variant">{liveClock}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded px-4 py-2 font-label-caps text-label-caps transition-colors ${
                    activeFilter === filter.id
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6 pb-14">
            {filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Intelligence panel */}
        <aside className="w-96 shrink-0 border-l border-outline-variant/30">
          <IntelligenceLogPanel logs={intelligenceLogs} suggestedAction={suggestedAction} />
        </aside>
      </div>

      {/* Command bar footer */}
      <footer className="flex h-10 shrink-0 items-center gap-4 border-t border-outline-variant/30 bg-surface-container-lowest px-4">
        <span className="material-symbols-outlined text-on-surface-variant">terminal</span>
        <input
          type="text"
          placeholder="Enter command or incident ID..."
          className="min-w-0 flex-1 border-none bg-transparent font-data-mono text-data-mono text-on-background placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-0"
        />
        <div className="flex shrink-0 items-center gap-4 font-data-mono text-[10px] text-on-surface-variant">
          <span className="flex items-center gap-2">
            <span className="led-dot led-pulse bg-green-500" />
            Live Sync
          </span>
          <span>API Latency: 12ms</span>
        </div>
      </footer>
    </div>
  );
}

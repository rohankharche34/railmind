"use client";

import type { Alert, AlertSeverity } from "@/lib/types";

interface AlertCardProps {
  alert: Alert;
}

const severityLabel: Record<AlertSeverity, string> = {
  critical: "CRITICAL",
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
};

const severityStyles: Record<
  AlertSeverity,
  {
    card: string;
    led: string;
    label: string;
    title: string;
  }
> = {
  critical: {
    card: "critical-pulse glass-card",
    led: "bg-error led-pulse",
    label: "text-error",
    title: "text-error",
  },
  high: {
    card: "glass-card border border-outline-variant/30",
    led: "bg-tertiary",
    label: "text-tertiary",
    title: "text-white",
  },
  medium: {
    card: "glass-card opacity-80",
    led: "bg-primary",
    label: "text-primary",
    title: "text-white",
  },
  low: {
    card: "glass-card border border-outline-variant/30",
    led: "bg-outline",
    label: "text-on-surface-variant",
    title: "text-white",
  },
};

function statusLabel(status: Alert["status"]) {
  switch (status) {
    case "active":
      return "Active";
    case "investigating":
      return "Investigating";
    case "resolved":
      return "Resolved";
  }
}

export default function AlertCard({ alert }: AlertCardProps) {
  const styles = severityStyles[alert.severity];
  const showMetadata = alert.severity === "critical" || alert.severity === "high";

  return (
    <article className={`rounded-xl p-5 ${styles.card}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={`led-dot mt-1.5 ${styles.led}`} />
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className={`font-label-caps text-label-caps ${styles.label}`}>
                {severityLabel[alert.severity]}
              </span>
              <span className="font-data-mono text-data-mono text-outline">{alert.id}</span>
            </div>
            <h3 className={`font-headline-md text-headline-md ${styles.title}`}>{alert.title}</h3>
            <p className="mt-1 font-data-mono text-data-mono text-on-surface-variant">{alert.location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-data-mono text-data-mono text-on-surface">{alert.timestamp}</p>
          <p className="font-label-caps text-label-caps text-outline">{alert.timeAgo}</p>
        </div>
      </div>

      {showMetadata && (
        <div className="mb-4 grid grid-cols-3 gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-low/50 p-3">
          <div>
            <span className="mb-1 block font-label-caps text-label-caps text-outline">Status</span>
            <span className="font-data-mono text-data-mono text-on-surface">{statusLabel(alert.status)}</span>
          </div>
          <div>
            <span className="mb-1 block font-label-caps text-label-caps text-outline">Detection Source</span>
            <span className="font-data-mono text-data-mono text-on-surface">{alert.detectionSource}</span>
          </div>
          <div>
            <span className="mb-1 block font-label-caps text-label-caps text-outline">
              {alert.severity === "critical" ? "Impact" : "Assigned"}
            </span>
            <span className="font-data-mono text-data-mono text-on-surface">
              {alert.severity === "critical" ? alert.impactLevel : alert.assignedUnit}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {alert.severity === "critical" && (
          <>
            <button
              type="button"
              className="rounded border border-outline-variant px-4 py-2 font-label-caps text-label-caps text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Acknowledge
            </button>
            <button
              type="button"
              className="rounded bg-primary px-4 py-2 font-label-caps text-label-caps text-on-primary transition-colors hover:brightness-110"
            >
              Launch Response
            </button>
          </>
        )}
        {alert.severity === "high" && (
          <>
            <button
              type="button"
              className="rounded border border-outline-variant px-4 py-2 font-label-caps text-label-caps text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Details
            </button>
            <button
              type="button"
              className="rounded border border-primary px-4 py-2 font-label-caps text-label-caps text-primary transition-colors hover:bg-primary/10"
            >
              View Analytics
            </button>
          </>
        )}
        {alert.severity === "medium" && (
          <button
            type="button"
            className="rounded border border-outline-variant px-4 py-2 font-label-caps text-label-caps text-on-surface transition-colors hover:bg-surface-container-high"
          >
            Resolve
          </button>
        )}
      </div>
    </article>
  );
}

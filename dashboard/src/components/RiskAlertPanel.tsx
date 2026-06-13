"use client";

import type { ReactNode } from "react";
import { List, AlertTriangle, AlertOctagon, Info } from "lucide-react";

export type AlertSeverity = "critical" | "high" | "medium";

export interface AlertAction {
  id: string;
  label: string;
  variant: "primary" | "secondary";
}

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  timestamp: string;
  description: string;
  actions?: AlertAction[];
}

export interface RiskAlertPanelProps {
  alerts: AlertItem[];
  onMarkAllRead?: () => void;
  onActionClick?: (alertId: string, actionId: string) => void;
}

const severityConfig: Record<
  AlertSeverity,
  {
    border: string;
    bg: string;
    stripe: string;
    title: string;
    icon: ReactNode;
    glow?: boolean;
  }
> = {
  critical: {
    border: "border-red-400",
    bg: "bg-red-400/5",
    stripe: "bg-red-400",
    title: "text-red-400",
    icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
    glow: true,
  },
  high: {
    border: "border-orange-500/30",
    bg: "bg-rm-surface-container",
    stripe: "bg-orange-500",
    title: "text-orange-400",
    icon: <AlertOctagon className="h-4 w-4 text-orange-500" />,
  },
  medium: {
    border: "border-rm-tertiary/30",
    bg: "bg-rm-surface-container",
    stripe: "bg-rm-tertiary",
    title: "text-rm-tertiary",
    icon: <Info className="h-4 w-4 text-rm-tertiary" />,
  },
};

export default function RiskAlertPanel({ alerts, onMarkAllRead, onActionClick }: RiskAlertPanelProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded border border-rm-border bg-rm-panel/85 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-rm-border bg-[#1F2937]/50 px-3 py-2">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-rm-on-surface-variant">
          <List className="h-4 w-4" />
          ALERT FEED
        </span>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="text-[10px] font-bold uppercase tracking-wider text-rm-primary hover:underline"
        >
          MARK ALL READ
        </button>
      </div>

      <div className="alert-stagger flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          return (
            <div
              key={alert.id}
              className={`relative overflow-hidden rounded border p-2 animate-slide-in ${config.border} ${config.bg} ${config.glow ? "animate-pulse-critical" : ""}`}
            >
              <div className={`absolute bottom-0 left-0 top-0 w-1 ${config.stripe}`} />

              <div className="ml-2 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {config.icon}
                  <span className={`text-[13px] font-semibold ${config.title}`}>{alert.title}</span>
                </div>
                <span className="font-mono text-[10px] text-rm-on-surface-variant">{alert.timestamp}</span>
              </div>

              <p className="ml-7 mt-1 text-[11px] text-rm-on-surface-variant">{alert.description}</p>

              {alert.actions && alert.actions.length > 0 && (
                <div className="ml-7 mt-2 flex gap-2">
                  {alert.actions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => onActionClick?.(alert.id, action.id)}
                      className={`rounded px-2 py-1 font-mono text-[9px] ${
                        action.variant === "primary"
                          ? "bg-red-400 text-white hover:bg-red-400/80"
                          : "border border-rm-outline-variant text-rm-on-surface-variant hover:bg-rm-surface-container-highest"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

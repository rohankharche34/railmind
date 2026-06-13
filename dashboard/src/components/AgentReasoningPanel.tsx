"use client";

import { useState } from "react";
import { Brain, Sparkles, Send, Lock, Power } from "lucide-react";

export type AgentStatus = "idle" | "thinking" | "active";

export interface ReasoningStep {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  variant?: "default" | "rag" | "proposal";
  proposal?: {
    text: string;
    actionLabel: string;
  };
}

export interface RecommendedAction {
  id: string;
  label: string;
  icon: "lock" | "power";
  hoverAccent: "error" | "orange";
}

export interface AgentReasoningPanelProps {
  status: AgentStatus;
  steps: ReasoningStep[];
  recommendedActions: RecommendedAction[];
  inputPlaceholder?: string;
  onExecuteProposal?: (stepId: string) => void;
  onRecommendedAction?: (actionId: string) => void;
  onSendMessage?: (message: string) => void;
}

const statusLabel: Record<AgentStatus, string> = {
  idle: "IDLE",
  thinking: "THINKING",
  active: "ACTIVE",
};

const actionIcons = {
  lock: Lock,
  power: Power,
};

export default function AgentReasoningPanel({
  status,
  steps,
  recommendedActions,
  inputPlaceholder = "Query agent or command system...",
  onExecuteProposal,
  onRecommendedAction,
  onSendMessage,
}: AgentReasoningPanelProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSendMessage?.(text);
    setInput("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded border border-rm-border border-t-2 border-t-rm-secondary-container bg-rm-panel/85 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-rm-border bg-rm-secondary-container/10 px-3 py-2">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-rm-on-surface">
          <Brain className="h-4 w-4 text-rm-secondary" />
          AGENT REASONING
        </span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-rm-secondary animate-blink" />
          <span className="font-mono text-[9px] text-rm-secondary">{statusLabel[status]}</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-gradient-to-b from-rm-secondary-container/5 to-transparent p-3">
        <div className="relative flex flex-col gap-4 border-l border-rm-outline-variant/50 pl-4">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div
                className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-rm-background ${
                  step.variant === "proposal"
                    ? "border-rm-secondary bg-rm-secondary shadow-[0_0_8px_rgba(208,188,255,0.5)]"
                    : "bg-rm-outline-variant"
                }`}
              />

              <div className="mb-1 flex items-baseline justify-between">
                <span
                  className={`font-mono text-[10px] ${
                    step.variant === "proposal" ? "font-bold text-rm-secondary" : "text-rm-on-surface"
                  }`}
                >
                  {step.title}
                </span>
                <span
                  className={`font-mono text-[9px] ${
                    step.variant === "proposal" ? "text-rm-secondary" : "text-[#8C909F]"
                  }`}
                >
                  {step.timestamp}
                </span>
              </div>

              {step.variant === "rag" ? (
                <p className="mt-1 rounded border border-rm-secondary/20 bg-rm-secondary/10 p-1.5 text-[11px] text-rm-secondary">
                  {step.description}
                </p>
              ) : step.variant === "proposal" && step.proposal ? (
                <div className="mt-1 rounded border border-rm-secondary/30 bg-rm-surface-container-high p-2">
                  <p className="text-[11px] text-rm-on-surface">{step.proposal.text}</p>
                  <button
                    type="button"
                    onClick={() => onExecuteProposal?.(step.id)}
                    className="mt-2 w-full rounded border border-rm-secondary/50 bg-rm-secondary/20 py-1 font-mono text-[10px] text-rm-secondary transition-colors hover:bg-rm-secondary/30"
                  >
                    {step.proposal.actionLabel}
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-rm-on-surface-variant">{step.description}</p>
              )}
            </div>
          ))}
        </div>

        <hr className="my-2 border-rm-outline-variant/30" />

        <div>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-rm-on-surface-variant">
            RECOMMENDED ACTIONS
          </span>
          <div className="flex flex-col gap-2">
            {recommendedActions.map((action) => {
              const Icon = actionIcons[action.icon];
              const hover =
                action.hoverAccent === "error"
                  ? "hover:border-red-400 hover:bg-red-400/5 group-hover:text-red-400"
                  : "hover:border-orange-500 hover:bg-orange-500/5 group-hover:text-orange-400";
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => onRecommendedAction?.(action.id)}
                  className={`group flex w-full items-center justify-between rounded border border-rm-outline-variant bg-rm-surface p-2 transition-colors ${hover}`}
                >
                  <span className="font-mono text-[11px] text-rm-on-surface">{action.label}</span>
                  <Icon className="h-3.5 w-3.5 text-[#8C909F] group-hover:text-inherit" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-rm-outline-variant bg-rm-surface-lowest p-2">
        <div className="relative flex items-center">
          <Sparkles className="absolute left-2 h-4 w-4 text-rm-secondary" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={inputPlaceholder}
            className="w-full rounded border border-rm-outline-variant bg-rm-background py-1.5 pl-8 pr-8 font-mono text-[11px] text-rm-on-surface placeholder:text-rm-on-surface-variant/50 focus:border-rm-secondary focus:outline-none focus:ring-1 focus:ring-rm-secondary/50"
          />
          <button
            type="button"
            onClick={handleSend}
            className="absolute right-2 text-[#8C909F] hover:text-rm-secondary"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

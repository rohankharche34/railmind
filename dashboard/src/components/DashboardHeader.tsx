"use client";

import { useEffect, useState } from "react";
import { Clock, Bell } from "lucide-react";
import Image from "next/image";
import { formatIstDate, formatIstTime } from "@/lib/formatIst";

export interface DashboardHeaderProps {
  title: string;
  phaseLabel: string;
  phaseLive?: boolean;
  notificationCount?: number;
  operatorAvatarUrl?: string;
  operatorName?: string;
}

export default function DashboardHeader({
  title,
  phaseLabel,
  phaseLive = true,
  notificationCount = 0,
  operatorAvatarUrl,
  operatorName = "Operator",
}: DashboardHeaderProps) {
  const [time, setTime] = useState(formatIstTime());
  const [date, setDate] = useState(formatIstDate());

  useEffect(() => {
    const update = () => {
      setTime(formatIstTime());
      setDate(formatIstDate());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-rm-outline-variant bg-rm-background/80 px-4 backdrop-blur z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold tracking-tight text-rm-primary">{title}</h1>
        <div className="flex items-center gap-2 rounded border border-rm-outline-variant bg-rm-surface-container-high px-2 py-1">
          <span
            className={`h-2 w-2 rounded-full ${phaseLive ? "bg-green-500 animate-blink" : "bg-rm-on-surface-variant"}`}
          />
          <span className="font-mono text-xs font-medium text-rm-on-surface-variant">{phaseLabel}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="font-mono text-xs font-medium text-rm-on-surface">{time}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-rm-on-surface-variant">{date}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded p-1 text-rm-on-surface-variant transition-colors hover:bg-rm-surface-container-highest hover:text-rm-on-surface"
            aria-label="Schedule"
          >
            <Clock className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="relative rounded p-1 text-rm-on-surface-variant transition-colors hover:bg-rm-surface-container-highest hover:text-rm-on-surface"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 translate-x-1/4 -translate-y-1/4 rounded-full border border-rm-surface-lowest bg-rm-error px-1 text-[9px] font-bold text-white">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border border-rm-outline-variant bg-rm-surface-container-highest">
            {operatorAvatarUrl ? (
              <Image
                src={operatorAvatarUrl}
                alt={operatorName}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[10px] font-bold text-rm-on-surface-variant">{operatorName.charAt(0)}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

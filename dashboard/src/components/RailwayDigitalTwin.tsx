"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";

export type MapLayer = "risk" | "health" | "propagation";

export type TrainStatus = "normal" | "delayed" | "critical";

export interface MapTrain {
  id: string;
  label: string;
  positionClass: string;
  status: TrainStatus;
  size?: "sm" | "lg";
}

export interface RailwayDigitalTwinProps {
  mapImageUrl: string;
  activeLayer: MapLayer;
  trains: MapTrain[];
  layers?: MapLayer[];
  onLayerChange?: (layer: MapLayer) => void;
}

const layerLabels: Record<MapLayer, string> = {
  risk: "RISK",
  health: "HEALTH",
  propagation: "PROPAGATION",
};

function layerButtonClass(layer: MapLayer, active: boolean): string {
  if (!active) {
    return "border-rm-outline-variant text-rm-on-surface-variant hover:bg-rm-surface-container-highest";
  }
  if (layer === "risk") return "border-rm-primary/30 bg-rm-primary/10 text-rm-primary";
  if (layer === "propagation") return "border-orange-500/30 bg-orange-500/10 text-orange-400";
  return "border-rm-outline-variant bg-rm-surface-container-highest text-rm-on-surface-variant";
}

const trainColor: Record<TrainStatus, string> = {
  normal: "bg-green-500 border-green-500",
  delayed: "bg-orange-500 border-orange-500",
  critical: "bg-red-400 border-red-400 animate-pulse-critical",
};

export default function RailwayDigitalTwin({
  mapImageUrl,
  activeLayer,
  trains,
  layers = ["risk", "health", "propagation"],
  onLayerChange,
}: RailwayDigitalTwinProps) {
  return (
    <div className="flex h-[55%] min-h-0 shrink-0 flex-col overflow-hidden rounded border border-rm-border bg-rm-panel/85 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-rm-border bg-[#1F2937]/50 px-3 py-2">
        <div className="flex items-center">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-rm-on-surface-variant">
            <Building2 className="h-4 w-4" />
            RAILWAY DIGITAL TWIN
          </span>
          <div className="ml-4 flex gap-2 border-l border-rm-outline-variant pl-4">
            {layers.map((layer) => (
              <button
                key={layer}
                type="button"
                onClick={() => onLayerChange?.(layer)}
                className={`cursor-pointer rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${layerButtonClass(layer, layer === activeLayer)}`}
              >
                {layerLabels[layer]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Normal
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <span className="h-2 w-2 rounded-full bg-orange-500" /> Delayed
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <span className="h-2 w-2 rounded-full bg-red-400" /> Critical
          </span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden border-b border-rm-border bg-[#0B0F19]">
        <Image
          src={mapImageUrl}
          alt="Railway map"
          fill
          className="object-cover opacity-20 mix-blend-screen"
          sizes="40vw"
          unoptimized
        />

        <div className="map-grid-overlay absolute inset-0" />

        {trains.map((train) => (
          <div
            key={train.id}
            title={train.label}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border ${train.positionClass} ${trainColor[train.status]} ${train.size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} after:absolute after:inset-[-4px] after:animate-ping after:rounded-full after:border after:border-inherit after:content-['']`}
          />
        ))}

        <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
          <path d="M 40% 30% L 55% 45%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path
            d="M 55% 45% L 65% 70%"
            stroke="rgba(249, 115, 22, 0.6)"
            strokeWidth="2"
            strokeDasharray="4"
          />
          <path d="M 35% 60% L 55% 45%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle
            cx="55%"
            cy="45%"
            r="15"
            fill="rgba(249, 115, 22, 0.1)"
            stroke="rgba(249, 115, 22, 0.4)"
            strokeWidth="1"
            className="animate-pulse-critical"
          />
        </svg>
      </div>
    </div>
  );
}

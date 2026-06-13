"use client";

import { useState } from "react";
import { Video, UserSearch } from "lucide-react";
import Image from "next/image";

export interface BoundingBox {
  id: string;
  positionClass: string;
  variant: "error" | "primary";
  label?: string;
}

export interface CctvCamera {
  id: string;
  label: string;
  name: string;
  imageUrl: string;
}

export interface CctvFeedProps {
  cameras: CctvCamera[];
  activeCameraId: string;
  detectionCount: number;
  resolution: string;
  boundingBoxes: BoundingBox[];
  onCameraSelect?: (cameraId: string) => void;
}

export default function CctvFeed({
  cameras,
  activeCameraId,
  detectionCount,
  resolution,
  boundingBoxes,
  onCameraSelect,
}: CctvFeedProps) {
  const [activeId, setActiveId] = useState(activeCameraId);
  const activeCam = cameras.find((c) => c.id === activeId) ?? cameras[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    onCameraSelect?.(id);
  };

  if (!activeCam) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded border border-rm-border bg-rm-panel/85 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-rm-border bg-[#1F2937]/50 px-3 py-2">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-rm-on-surface-variant">
          <Video className="h-4 w-4" />
          LIVE FEEDS
        </span>
        <div className="flex gap-1">
          {cameras.map((cam) => (
            <button
              key={cam.id}
              type="button"
              onClick={() => handleSelect(cam.id)}
              className={`rounded border px-2 py-0.5 font-mono text-[10px] font-medium transition-colors ${
                cam.id === activeId
                  ? "border-rm-primary/50 bg-rm-primary/20 text-rm-primary"
                  : "border-transparent bg-transparent text-rm-on-surface-variant hover:border-rm-outline-variant"
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col bg-black p-1">
        <div className="relative min-h-0 flex-1 overflow-hidden rounded border border-rm-outline-variant/30">
          <Image
            src={activeCam.imageUrl}
            alt={activeCam.name}
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 768px) 100vw, 35vw"
            unoptimized
          />

          <div className="absolute left-2 top-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-blink" />
            <span className="rounded bg-black/50 px-1 font-mono text-[10px] text-white">REC</span>
          </div>

          <div className="absolute right-2 top-2 rounded bg-black/50 px-1 font-mono text-[10px] text-white">
            {activeCam.name}
          </div>

          {boundingBoxes.map((box) => (
            <div
              key={box.id}
              className={`absolute flex flex-col justify-end p-0.5 ${box.positionClass} ${
                box.variant === "error"
                  ? box.label
                    ? "border-2 border-red-400/90 bg-red-400/20"
                    : "border border-red-400/70 bg-red-400/10"
                  : "border border-rm-primary/70 bg-rm-primary/10"
              }`}
            >
              {box.label && (
                <span className="w-max bg-red-400 px-0.5 font-mono text-[8px] text-white">{box.label}</span>
              )}
            </div>
          ))}

          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded border border-rm-outline-variant/50 bg-black/70 px-2 py-0.5">
            <UserSearch className="h-3.5 w-3.5 text-rm-primary" />
            <span className="font-mono text-[10px] text-rm-primary">Detections: {detectionCount}</span>
          </div>

          <div className="absolute bottom-2 right-2 font-mono text-[10px] text-white/70">{resolution}</div>
        </div>
      </div>
    </div>
  );
}

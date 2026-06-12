"use client";

import MapView from "@/components/MapView";

export default function MapPage() {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 p-4">
        <MapView />
      </main>
    </div>
  );
}

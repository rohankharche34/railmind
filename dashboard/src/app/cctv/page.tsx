"use client";

import CctvFeed from "@/components/CctvFeed";

export default function CctvPage() {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 overflow-y-auto p-4">
        <CctvFeed />
      </main>
    </div>
  );
}

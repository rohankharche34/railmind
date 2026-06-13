"use client";

import CctvFeed from "@/components/CctvFeed";

export default function CctvPage() {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 overflow-y-auto p-4">
        <CctvFeed
          cameras={[
            {
              id: "cam1",
              label: "CAM 1",
              name: "CAM 1 - Mumbai Central",
              imageUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAa7WxaCGu2PZhONsuwVXuGOl5ZTXyP5OU_tVZXhLcBkrluslEtJc4b4QblXuoHH4JlEX6lI1xViypAAL-aXsSAsMOn9rdBFo3wnT-1p1B52Yx-4CSpPR10Z2fke9BMNS_Eh692meMon_fxVttlPamUsveDVwgeJJ4rZR2Xh3mVwbxV1nbBzQSUPsm-kLF84rBuz5oeND-s6Fj0IM-WL1GWT_ZfWKr8gDlPpVg3TrwKkc6uYcDyRY-KaFsRLzi8jVM4WfZnq77McpeY",
            },
          ]}
          activeCameraId="cam1"
          detectionCount={8}
          resolution="1080p 60fps"
          boundingBoxes={[]}
        />
      </main>
    </div>
  );
}

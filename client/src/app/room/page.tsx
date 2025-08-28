"use client";

import RoomPage from "@/component/RoomPage";
import { Suspense } from "react";

export default function RoomPageWrapper() {
  return (
    <Suspense fallback={<div>Loading room...</div>}>
      <RoomPage/>
    </Suspense>
  );
}

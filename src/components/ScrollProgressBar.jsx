import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress.js";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-ink transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

import React from "react";
import { StatusLevel } from "@/types/sensor";
import { getStatusColor } from "@/utils/thresholds";

interface StatusBadgeProps {
  status: StatusLevel;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass = getStatusColor(status);
  return (
    <div
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider transition-colors duration-300 ${colorClass}`}
    >
      {status}
    </div>
  );
}

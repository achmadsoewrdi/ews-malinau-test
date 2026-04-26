import React from "react";
import { SensorStatus } from "@/types/sensor";
import SensorCard from "./SensorCard";

interface DashboardGridProps {
  sensors: SensorStatus[];
  isLoading?: boolean;
}

export default function DashboardGrid({
  sensors,
  isLoading,
}: DashboardGridProps) {
  // 1. Tampilan saat data sedang loading (Skeleton)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="h-4 w-3/4 bg-slate-100 animate-pulse rounded-md mb-4"></div>
            <div className="h-32 bg-slate-50 animate-pulse rounded-xl mb-4"></div>
            <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Tampilan jika tidak ada data sensor (Empty State)
  if (!sensors || sensors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium italic">
          Tidak ada data sensor yang aktif.
        </p>
      </div>
    );
  }

  // 3. Tampilan Grid Utama
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensors.map((sensor) => (
        <SensorCard key={sensor.sensor_id} sensor={sensor} />
      ))}
    </div>
  );
}

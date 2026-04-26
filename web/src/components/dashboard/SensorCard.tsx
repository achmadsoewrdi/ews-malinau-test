import React from "react";
import { SensorStatus } from "@/types/sensor";
import StatusBadge from "@/components/ui/StatusBadge";
import SensorChart from "./SensorChart";
import { formatWaterLevel } from "@/utils/formatter";
import { MapPin, Droplets } from "lucide-react";

interface SensorCardProps {
  sensor: SensorStatus;
}

export default function SensorCard({ sensor }: SensorCardProps) {
  // Cek apakah statusnya AWAS untuk memberikan highlight visual khusus
  const isAwas = sensor.status === "AWAS";

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-500 shadow-sm hover:shadow-lg flex flex-col overflow-hidden group ${
        isAwas
          ? "border-red-500 ring-2 ring-red-100"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* 1. Bagian Atas: Identitas Sensor */}
      <div className="p-6 pb-0 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-[10px] uppercase tracking-wider">
            <Droplets size={14} className="animate-pulse" />
            <span>ID: {sensor.sensor_id}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {sensor.river_name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-1">
            <MapPin size={12} />
            <span>{sensor.location}</span>
          </div>
        </div>

        <StatusBadge status={sensor.status} />
      </div>

      {/* 2. Bagian Tengah: Angka Utama (Water Level) */}
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-6xl font-bold tracking-tight transition-colors ${
              isAwas ? "text-red-600" : "text-slate-900"
            }`}
          >
            {formatWaterLevel(sensor.latest_value)}
          </span>
          <span className="text-lg font-semibold text-slate-400">cm</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div
            className={`h-2 w-2 rounded-full ${isAwas ? "bg-red-500 animate-ping" : "bg-green-500"}`}
          ></div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Ketinggian Saat Ini
          </p>
        </div>
      </div>

      {/* 3. Bagian Bawah: Grafik Riwayat */}
      <div className="flex-1 bg-slate-50/50 border-t border-slate-100 min-h-[180px]">
        <SensorChart sensorId={sensor.sensor_id} status={sensor.status} />
      </div>
    </div>
  );
}

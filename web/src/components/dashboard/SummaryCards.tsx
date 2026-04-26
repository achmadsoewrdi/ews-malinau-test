import React from "react";
import { SensorStatus } from "@/types/sensor";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

interface SummaryCardsProps {
  sensors: SensorStatus[];
}

export default function SummaryCards({ sensors }: SummaryCardsProps) {
  // Logika Filter & Hitung:
  const total = sensors.length;
  const aman = sensors.filter((s) => s.status === "AMAN").length;
  // Perlu Perhatian adalah gabungan status SIAGA dan WASPADA
  const perhatian = sensors.filter(
    (s) => s.status === "SIAGA" || s.status === "WASPADA",
  ).length;
  const awas = sensors.filter((s) => s.status === "AWAS").length;

  // Konfigurasi tampilan tiap kartu
  const stats = [
    {
      label: "Total Sensor",
      value: total,
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Status Aman",
      value: aman,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Perlu Perhatian",
      value: perhatian,
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      label: "Status Awas",
      value: awas,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2.5 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <span className="text-4xl font-black text-slate-900 tabular-nums">
              {stat.value}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

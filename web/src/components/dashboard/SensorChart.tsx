"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { StatusLevel } from "@/types/sensor";
import useSWR from "swr";
import { fetchReadings } from "@/services/api";
import { THRESHOLD } from "@/utils/thresholds";

interface SensorChartProps {
  sensorId: string;
  status: StatusLevel;
}

export default function SensorChart({ sensorId, status }: SensorChartProps) {
  // State untuk men-trigger animasi masuk (fade-in & slide-up)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Memberikan jeda sangat kecil agar animasi terlihat mulus saat pertama kali dirender
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { data: readings, isLoading } = useSWR(
    `/api/sensors/${sensorId}/readings`,
    () => fetchReadings(sensorId),
    { refreshInterval: 60000 },
  );

  const threshold = THRESHOLD[sensorId];

  if (isLoading || !isMounted) {
    return (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="h-40 w-full bg-slate-100/50 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  // Menentukan warna utama ala Shadcn (Solid & Modern)
  const getLineColor = () => {
    switch (status) {
      case "AWAS":
        return "hsl(0, 84.2%, 60.2%)"; // Shadcn Destructive Red
      case "WASPADA":
        return "hsl(32, 95%, 44%)"; // Shadcn Warning Orange
      case "SIAGA":
        return "hsl(221.2, 83.2%, 53.3%)"; // Shadcn Primary Blue
      default:
        return "hsl(142.1, 76.2%, 36.3%)"; // Shadcn Success Green
    }
  };

  return (
    <div
      className={`h-full w-full p-2 pt-4 transition-all duration-1000 ease-out transform ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={readings}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          {/* Grid diburamkan ala Shadcn */}
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="hsl(210, 40%, 96.1%)"
          />

          <XAxis
            dataKey="timestamp"
            tickFormatter={(timeStr) => {
              const date = new Date(timeStr);
              return date.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              });
            }}
            tick={{
              fontSize: 10,
              fill: "hsl(215.4, 16.3%, 46.9%)",
              fontWeight: 500,
            }}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />

          <YAxis
            domain={[100, 420]}
            tickFormatter={(val) => `${val}`}
            tick={{
              fontSize: 10,
              fill: "hsl(215.4, 16.3%, 46.9%)",
              fontWeight: 500,
            }}
            tickLine={false}
            axisLine={false}
            width={35}
          />

          {/* Tooltip khas Shadcn (Kaca/Glassmorphism ringan) */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              border: "1px solid hsl(214.3, 31.8%, 91.4%)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              fontSize: "12px",
              fontWeight: "600",
              color: "hsl(222.2, 84%, 4.9%)",
              padding: "8px 12px",
            }}
            itemStyle={{ color: getLineColor() }}
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          />

          {threshold && (
            <>
              <ReferenceLine
                y={threshold.siaga}
                stroke="hsl(221.2, 83.2%, 53.3%)"
                strokeOpacity={0.4}
                strokeDasharray="4 4"
              />
              <ReferenceLine
                y={threshold.waspada}
                stroke="hsl(32, 95%, 44%)"
                strokeOpacity={0.4}
                strokeDasharray="4 4"
              />
              <ReferenceLine
                y={threshold.awas}
                stroke="hsl(0, 84.2%, 60.2%)"
                strokeOpacity={0.6}
                strokeDasharray="4 4"
              />
            </>
          )}

          {/* Animasi menggambar garis yang diperlambat dan dihaluskan */}
          <Line
            type="monotone"
            dataKey="value"
            stroke={getLineColor()}
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: getLineColor(),
              stroke: "#fff",
              strokeWidth: 2,
            }}
            isAnimationActive={true}
            animationDuration={2500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

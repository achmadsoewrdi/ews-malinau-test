import { StatusLevel, ThresholdConfig } from "@/types/sensor";

export const THRESHOLD: Record<string, ThresholdConfig> = {
  "WL-001": { siaga: 200, waspada: 250, awas: 300 },
  "WL-002": { siaga: 180, waspada: 230, awas: 280 },
  "WL-003": { siaga: 170, waspada: 220, awas: 270 },
};

export const SENSOR_META: Record<
  string,
  { river_name: string; location: string }
> = {
  "WL-001": { river_name: "Sungai Malinau", location: "Pos Pantau Malinau" },
  "WL-002": { river_name: "Sungai Sesayap", location: "Pos Pantau Sesayap" },
  "WL-003": { river_name: "Sungai Bahau", location: "Pos Pantau Bahau" },
};

export function classifyStatus(sensorId: string, value: number): StatusLevel {
  const threshold = THRESHOLD[sensorId];

  if (!threshold) return "AMAN";
  if (value >= threshold.awas) return "AWAS";
  if (value >= threshold.waspada) return "WASPADA";
  if (value >= threshold.siaga) return "SIAGA";

  return "AMAN";
}

export function getStatusColor(status: StatusLevel): string {
  switch (status) {
    case "AMAN":
      return "bg-green-100 text-green-800 border-green-200";
    case "SIAGA":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "WASPADA":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "AWAS":
      return "bg-red-100 text-red-800 border-red-200 animate-pulse"; // ditambah animasi berkedip jika AWAS
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

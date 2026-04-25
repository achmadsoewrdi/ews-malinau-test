export type StatusLevel = "AMAN" | "SIAGA" | "WASPADA" | "AWAS";

export interface SensorReading {
  sensor_id: string;
  value: number;
  unit: string;
  timestamp: Date | string;
}

export interface SensorStatus {
  sensor_id: string;
  river_name: string;
  location: string;
  latest_value: number;
  latest_timestamp: Date | string;
  status: StatusLevel;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
}

export interface ThresholdConfig {
  siaga: number;
  waspada: number;
  awas: number;
}

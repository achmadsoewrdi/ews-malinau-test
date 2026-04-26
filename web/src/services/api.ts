import axios from "axios";
import { SensorStatus, ChartDataPoint } from "@/types/sensor";

// get data status
export async function fetchSensors(): Promise<SensorStatus[]> {
  try {
    const response = await axios.get<SensorStatus[]>("/api/sensors");
    return response.data;
  } catch (error) {
    console.error("[GAGAL MENGAMBIL DATA SENSOR]:", error);
    throw error;
  }
}

// get riwayat data
export async function fetchReadings(
  sensorId: string,
): Promise<ChartDataPoint[]> {
  try {
    const response = await axios.get<ChartDataPoint[]>(
      `/api/sensors/${sensorId}/readings`,
    );
    return response.data;
  } catch (error) {
    console.error("[GAGAL MENGAMBIL DATA RIWAYAT]:", error);
    throw error;
  }
}

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { classifyStatus, SENSOR_META } from "@/lib/thresholds";
import { SensorStatus } from "@/types/sensor";

// dont cache result API
export const dynamic = "force-dynamic";

// ======================
//  GET SENSOR STATUS
// ======================

export async function GET() {
  try {
    const result = await query(`
        SELECT DISTINCT ON (sensor_id) 
            sensor_id, value, timestamp
        FROM readings
        ORDER BY sensor_id, timestamp DESC
            `);

    const sensors: SensorStatus[] = result.rows.map((row) => {
      const sensorId = row.sensor_id;
      const meta = SENSOR_META[sensorId] || {
        river_name: "Unknown",
        location: "Unknown",
      };

      const numericValue = Number(row.value);

      return {
        sensor_id: sensorId,
        river_name: meta.river_name,
        location: meta.location,
        latest_value: numericValue,
        latest_timestamp: row.timestamp,
        status: classifyStatus(sensorId, numericValue),
      };
    });
    return NextResponse.json(sensors);
  } catch (error) {
    console.error("[API /api/sensors ERROR]:", error);
    return NextResponse.json(
      {
        error:
          "[TERJADI KESALAHAN PADA SERVER SAAT MENGAMBIL DATA PADA SENSOR]",
      },
      { status: 500 },
    );
  }
}

import { getInitializedDataSource } from "../data-source";
import { Reading } from "../entity/Reading";
import { SENSOR_META, classifyStatus } from "../lib/thresholds";
import { SensorStatus, ChartDataPoint } from "../types/sensor";

// ==========================================
// 1. Ambil 1 data terbaru untuk tiap sensor
// ==========================================
export async function getLatestPerSensor(): Promise<SensorStatus[]> {
  const ds = await getInitializedDataSource();

  // Memakai QueryBuilder TypeORM untuk mengeksekusi DISTINCT ON
  const rows = await ds
    .getRepository(Reading)
    .createQueryBuilder("r")
    .distinctOn(["r.sensorId"])
    .orderBy("r.sensorId")
    .addOrderBy("r.timestamp", "DESC")
    .getMany();

  // Mapping data database ke format JSON yang diinginkan Frontend
  return rows.map((row) => ({
    sensor_id: row.sensorId,
    river_name: SENSOR_META[row.sensorId]?.river_name ?? row.sensorId,
    location: SENSOR_META[row.sensorId]?.location ?? "-",
    latest_value: Number(row.value),
    latest_timestamp: row.timestamp.toISOString(), // ubah Date object jadi string
    status: classifyStatus(row.sensorId, Number(row.value)),
  }));
}

// ==========================================
// 2. Ambil data 24 jam terakhir untuk Grafik
// ==========================================
export async function getLast24Hours(
  sensorId: string,
): Promise<ChartDataPoint[]> {
  // Validasi awal: kalau sensor ID ngawur, langsung tolak!
  if (!SENSOR_META[sensorId]) return [];

  const ds = await getInitializedDataSource();

  const rows = await ds
    .getRepository(Reading)
    .createQueryBuilder("r")
    .where("r.sensorId = :sensorId", { sensorId })
    .andWhere(
      "r.timestamp >= (SELECT MAX(timestamp) FROM readings WHERE sensor_id = :sensorId) - INTERVAL '24 hours'",
    )
    .orderBy("r.timestamp", "ASC")
    .getMany();

  return rows.map((row) => ({
    timestamp: row.timestamp.toISOString(),
    value: Number(row.value),
  }));
}

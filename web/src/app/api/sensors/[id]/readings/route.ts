import { NextResponse } from "next/server";
import { getLast24Hours } from "@/repository/ReadingRepository";
import { THRESHOLD } from "@/lib/thresholds";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const sensorId = id.toUpperCase();

    // Validasi apakah Sensor ID dikenali
    if (!THRESHOLD[sensorId]) {
      return NextResponse.json(
        { error: "Sensor ID tidak ditemukan" },
        { status: 404 },
      );
    }

    // Memanggil fungsi repository untuk mengambil data grafik 24 jam terakhir
    const readings = await getLast24Hours(sensorId);

    return NextResponse.json(readings);
  } catch (error) {
    console.error(`[API /api/sensors/[id]/readings ERROR]:`, error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat mengambil data grafik" },
      { status: 500 },
    );
  }
}

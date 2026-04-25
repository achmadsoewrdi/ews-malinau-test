import { NextResponse } from "next/server";
import { getLatestPerSensor } from "@/repository/ReadingRepository";

// Jangan cache hasil API ini agar data dashboard selalu update
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Memanggil fungsi dari repository, semua logika SQL yang panjang
    // sudah disembunyikan di dalam getLatestPerSensor()
    const sensors = await getLatestPerSensor();

    return NextResponse.json(sensors);
  } catch (error) {
    console.error("[API /api/sensors ERROR]:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat mengambil data sensor" },
      { status: 500 },
    );
  }
}

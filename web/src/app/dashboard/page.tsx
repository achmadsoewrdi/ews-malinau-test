"use client";

import React from "react";
import Header from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { useSensors } from "@/hooks/useSensors";

export default function DashboardPage() {
  // 1. Mengambil data realtime dari API
  const { sensors, isLoading, isError } = useSensors();

  // 2. Mengambil timestamp terbaru untuk ditampilkan di Header
  const lastUpdated =
    sensors.length > 0 ? sensors[0].latest_timestamp : undefined;

  // 3. Tampilan jika terjadi Error Koneksi
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-4xl shadow-xl shadow-red-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="font-black text-xl mb-2 uppercase tracking-tight">
            Sistem Offline
          </h2>
          <p className="text-sm opacity-80 mb-6 font-medium">
            Gagal terhubung ke pusat data. Pastikan Docker (Database & Ingest)
            sudah menyala.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-red-600 text-white text-sm font-bold rounded-2xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200"
          >
            COBA HUBUNGKAN KEMBALI
          </button>
        </div>
      </div>
    );
  }

  // 4. Tampilan Dashboard Utama
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header: Menampilkan Judul & Jam Live */}
        <Header lastUpdated={lastUpdated?.toString()} />

        {/* Summary: 4 Kotak Ringkasan Metrik */}
        <SummaryCards sensors={sensors} />

        {/* Grid: Daftar Kartu Sensor (dengan grafik di dalamnya) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Monitoring Area Sungai
            </h2>
            <div className="h-px flex-1 bg-slate-200 ml-4"></div>
          </div>

          <DashboardGrid sensors={sensors} isLoading={isLoading} />
        </div>

        {/* Footer Kecil */}
        <footer className="pt-10 pb-4 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            BPBD Kabupaten Malinau © 2026 • EWS Flood Monitoring System
          </p>
        </footer>
      </div>
    </main>
  );
}

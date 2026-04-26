import React from "react";
import { formatDateWIB } from "@/utils/formatter";

interface HeaderProps {
  lastUpdated?: string;
}

export default function Header({ lastUpdated }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none uppercase">
            Early Warning System
          </h1>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
            Banjir Kabupaten Malinau
          </p>
        </div>
      </div>

      <div className="flex items-center">
        {/* Live Indicator & Timestamp */}
        <div className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
              Live
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200"></div>

          <span className="text-xs font-medium text-slate-500 tabular-nums">
            {lastUpdated ? formatDateWIB(lastUpdated) : "Memperbarui data..."}
          </span>
        </div>
      </div>
    </header>
  );
}

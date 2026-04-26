import { create } from "zustand";

// 1. Tentukan apa saja data yang akan disimpan di "Gudang" (Store) kita
interface AppState {
  isAutoRefresh: boolean; // Status auto-refresh (nyala/mati)
  toggleAutoRefresh: () => void; // Fungsi untuk membalikkan status
  setAutoRefresh: (val: boolean) => void; // Fungsi untuk mengatur status secara spesifik
}

// 2. Buat Store-nya menggunakan Zustand
export const useAppStore = create<AppState>((set) => ({
  isAutoRefresh: true, // Default: Auto-refresh menyala agar data selalu realtime

  toggleAutoRefresh: () =>
    set((state) => ({ isAutoRefresh: !state.isAutoRefresh })),

  setAutoRefresh: (val) => set({ isAutoRefresh: val }),
}));

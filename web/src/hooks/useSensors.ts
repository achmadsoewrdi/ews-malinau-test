import useSWR from "swr";
import { fetchSensors } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";

// hook untuk mengelola data status
export function useSensors() {
  // Ambil state isAutoRefresh dari Zustand Store
  const isAutoRefresh = useAppStore((state) => state.isAutoRefresh);

  const { data, error, isLoading, mutate } = useSWR(
    "/api/sensors",
    fetchSensors,
    {
      // Jika isAutoRefresh menyala, refresh tiap 10 detik. Jika mati, beri nilai 0 (jangan refresh).
      refreshInterval: isAutoRefresh ? 10000 : 0,
      revalidateOnFocus: true,
    },
  );

  return {
    sensors: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

import useSWR from "swr";
import { fetchSensors } from "@/services/api";

// hook untuk mengelola data status
export function useSensors() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/sensors",
    fetchSensors,
    {
      refreshInterval: 10000,
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

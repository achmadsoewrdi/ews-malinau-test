import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Format string ISO date menjadi format: "26 Apr 2026 • 11:00 WIB"
 * @param isoString String ISO dari database (contoh: "2026-04-26T04:00:00.000Z")
 * @returns String yang diformat
 */
export function formatDateWIB(isoString: string | undefined | null): string {
  if (!isoString) return '-';

  try {
    // Ubah string ISO menjadi objek Date
    const date = parseISO(isoString);
    
    // Format menjadi "26 Apr 2026 • 11:00 WIB"
    // menggunakan locale 'id' agar nama bulan dalam bahasa Indonesia
    const formattedDate = format(date, "dd MMM yyyy • HH:mm 'WIB'", {
      locale: id,
    });
    
    return formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
}

/**
 * Memastikan angka yang masuk dibulatkan 1 angka di belakang koma,
 * namun jika sudah pas bulat (misal 300) akan tampil "300" bukan "300.0"
 * @param value Angka ketinggian air
 * @returns String angka
 */
export function formatWaterLevel(value: number | undefined | null): string {
  if (value === undefined || value === null) return '0';
  
  // Menggunakan fungsi bawaan JavaScript untuk pembulatan dinamis
  return Number(value.toFixed(1)).toString();
}

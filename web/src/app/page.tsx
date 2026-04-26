import { redirect } from "next/navigation";

export default function RootPage() {
  /**
   * Karena halaman utama aplikasi kita adalah Dashboard,
   * kita langsung mengarahkan (redirect) user yang mengakses "/"
   * ke halaman "/dashboard" secara otomatis.
   */
  redirect("/dashboard");
}

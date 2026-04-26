import "reflect-metadata";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EWS Banjir Malinau",
  description: "Dashboard sistem peringatan dini Banjir kabupaten Malinau",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <body
        className={`${inter.className} h-full antialiased bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-700`}
      >
        {/* container utama */}
        <div className="relative min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}

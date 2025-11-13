import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Booking",
  description: "Book sessions with your favorite creators",
  icons: { icon: "/favicon.ico" },
  themeColor: "#2cb197",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container-mobile min-h-dvh bg-white dark:bg-gray-950">
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">Creator Booking</a>
            <nav className="flex gap-3 text-sm">
              <a href="/creators" className="text-gray-600 dark:text-gray-300 hover:text-gray-900">Creators</a>
              <a href="/bookings" className="text-gray-600 dark:text-gray-300 hover:text-gray-900">Bookings</a>
            </nav>
          </div>
        </header>
        <main className="px-4 pb-24 pt-4">{children}</main>
      </body>
    </html>
  );
}

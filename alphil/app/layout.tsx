import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "Alphil College",
    template: "%s | Alphil College"
  },
  description: "Quality vocational training in healthcare, IT, and business fields in Kenya",
  keywords: ["Alphil College", "vocational training Kenya", "diploma courses", "technical training Nairobi"],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'Alphil College',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <AuthProvider>
          <div className="bg-primary-gradient min-h-screen">
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
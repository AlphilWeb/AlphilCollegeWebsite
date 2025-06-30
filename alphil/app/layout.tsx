import type { Metadata } from "next";
import "./globals.css"; 
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "Alphil | Home",
  description: "Alphil College",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest'
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

import "./globals.css"; 
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

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

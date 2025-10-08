// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Versori Pádel",
  description: "Automatización, reservas y gestión para clubes de pádel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-transparent text-white antialiased overflow-x-hidden">
  <Navbar />
  <main className="relative min-h-screen">
    {children}
  </main>
  <Footer />
 
</body>

    </html>
  );
}

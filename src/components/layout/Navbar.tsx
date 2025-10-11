"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "../ui/Container";
import { Button } from "../ui/Button";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white tracking-wide">
          VERSORI<span className="text-blue-500">.</span>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="#clases" className="hover:text-white">
            Clases
          </Link>
          <Link href="#eventos" className="hover:text-white">
            Eventos
          </Link>
          <Link href="#nosotros" className="hover:text-white">
            Nosotros
          </Link>

          <Link
            href="/reserva"
            className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
          >
            Hacé tu reserva
          </Link>
        </nav>
      </Container>
    </header>
  );
}

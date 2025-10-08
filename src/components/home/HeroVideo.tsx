// src/components/home/HeroVideo.tsx
"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import Container from "../ui/Container";

export default function HeroVideo() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 🎥 Video de fondo */}
      <video
        src="/videos/video_cancha_padel.mp4"
        className="absolute inset-0 w-full h-full object-cover -z-20"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🌓 Capa de opacidad */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* 🧠 Contenido */}
      <Container className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Aprende Pádel en{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-blue-300 bg-clip-text text-transparent">
            Versori Pádel
          </span>
        </h1>

        <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
          Desde Corrientes al mundo. Impulsamos el talento local con visión profesional.
          Pádel, entrenamiento y crecimiento en un mismo lugar.
        </p>

        
      </Container>
    </section>
  );
}

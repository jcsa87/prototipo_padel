"use client";

import Image from "next/image";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const canchas = [
  {
    slug: "cancha-1",
    nombre: "Cancha 1",
    descripcion: "Interior climatizada con césped sintético.",
    imagen: "/reserva/cancha_interior.jpg",
  },
  {
    slug: "cancha-2",
    nombre: "Cancha 2",
    descripcion: "Interior, excelente iluminación LED.",
    imagen: "/reserva/cancha_interior.jpg",
  },
  {
    slug: "cancha-3",
    nombre: "Cancha 3",
    descripcion: "Exterior - al aire libre 🌤️",
    imagen: "/reserva/cancha_exterior.jpg",
  },
  {
    slug: "cancha-4",
    nombre: "Cancha 4",
    descripcion: "Interior con nuevo sistema de drenaje.",
    imagen: "/reserva/cancha_interior.jpg",
  },
  {
    slug: "cancha-5",
    nombre: "Cancha 5",
    descripcion: "Interior, ideal para torneos y clases.",
    imagen: "/reserva/cancha_interior.jpg",
  },
];

export default function CanchaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const cancha = canchas.find((c) => c.slug === slug);

  const [selected, setSelected] = useState<string[]>([]);
  const [availableToday, setAvailableToday] = useState<string[]>([]);
  const [availableTomorrow, setAvailableTomorrow] = useState<string[]>([]);

  useEffect(() => {
    const generateHours = () => {
      const hours: string[] = [];
      for (let h = 8; h <= 23; h++) {
        hours.push(`${h.toString().padStart(2, "0")}:00`);
      }
      return hours;
    };

    const now = new Date();
    const currentHour = now.getHours();
    const hours = generateHours();

    const todayHours = hours.filter((h) => parseInt(h.split(":")[0]) > currentHour);
    setAvailableToday(todayHours);
    setAvailableTomorrow(hours);
  }, []);

  const toggleSelect = (hour: string) => {
    setSelected((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  if (!cancha) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white bg-[#001a33]">
        <h1 className="text-2xl font-bold">Cancha no encontrada</h1>
      </section>
    );
  }

  const daySections = [
    { label: "Hoy", hours: availableToday },
    { label: "Mañana", hours: availableTomorrow },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a33] to-[#002b5b] flex flex-col items-center text-white px-6 py-20">
      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="absolute top-24 left-8 bg-transparent border border-blue-400 text-blue-300 font-semibold px-4 py-2 rounded-xl hover:bg-blue-700/20 hover:text-white transition-all duration-200"
      >
        ← Volver
      </button>

      {/* Vista previa */}
      <div className="relative w-full max-w-5xl h-80 rounded-3xl overflow-hidden shadow-xl border border-[#1b4e89]">
        <Image
          src={cancha.imagen}
          alt={cancha.nombre}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold mb-4">{cancha.nombre}</h1>
        <p className="text-blue-300 text-lg mb-10">{cancha.descripcion}</p>
      </div>

      <div className="w-full max-w-5xl bg-[#0b2545] border border-[#1b4e89] rounded-3xl p-8 shadow-xl">
        {daySections.map((day) => (
          <div key={day.label} className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">
              {day.label}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {day.hours.map((hour) => {
                const isSelected = selected.includes(`${day.label}-${hour}`);
                return (
                  <motion.div
                    key={hour}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSelect(`${day.label}-${hour}`)}
                    className={`cursor-pointer py-3 rounded-xl text-center font-semibold transition-all duration-200 border ${
                      isSelected
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-[#102b55] border-[#1b4e89] hover:bg-blue-900"
                    }`}
                  >
                    {hour}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

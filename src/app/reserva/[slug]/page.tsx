"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, AlertTriangle } from "lucide-react";

const PRICE_PER_HOUR = 10000;

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
  const [availableDays, setAvailableDays] = useState<
    { label: string; hours: string[] }[]
  >([]);
  const [openDay, setOpenDay] = useState<string>("Hoy");
  const [showDays, setShowDays] = useState(false);
  const [anchor, setAnchor] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  // convertir "08:30" → minutos
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  // generar bloques de media hora
  useEffect(() => {
    const now = new Date();
    const slots: string[] = [];
    for (let h = 8; h <= 23; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
      slots.push(`${h.toString().padStart(2, "0")}:30`);
    }

    const days: { label: string; hours: string[] }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const label =
        i === 0
          ? "Hoy"
          : d.toLocaleDateString("es-AR", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
      days.push({ label, hours: slots });
    }
    setAvailableDays(days);
  }, []);

  if (!cancha) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white bg-[#001a33]">
        <h1 className="text-2xl font-bold">Cancha no encontrada</h1>
      </section>
    );
  }

  // click en bloque horario
  const handleSelect = (hour: string) => {
    setWarning(null);

    // si no hay ancla → iniciar rango
    if (!anchor) {
      setAnchor(hour);
      setSelected([hour]);
      return;
    }

    // si clickeás el mismo bloque → limpiar
    if (anchor === hour) {
      setAnchor(null);
      setSelected([]);
      return;
    }

    // calcular rango
    const start = Math.min(toMinutes(anchor), toMinutes(hour));
    const end = Math.max(toMinutes(anchor), toMinutes(hour));
    const rangeMinutes = end - start;

    // máximo 3 h = 180 min
    if (rangeMinutes > 180) {
      setWarning("No se pueden reservar más de 3 horas consecutivas.");
      setAnchor(null);
      setSelected([]);
      return;
    }

    const day = availableDays.find((d) => d.label === openDay);
    const range = (day?.hours || []).filter((h) => {
      const m = toMinutes(h);
      return m >= start && m <= end; // 🔹 cambiamos "< end" por "<= end"
    });

    setSelected(range);
    setAnchor(null);
  };

  const total = selected.length * 0.5 * PRICE_PER_HOUR; // cada bloque = 30 min

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a33] to-[#002b5b] flex flex-col items-center text-white px-6 py-20 relative">
      {/* Volver */}
      <button
        onClick={() => router.back()}
        className="absolute top-24 left-8 bg-transparent border border-blue-400 text-blue-300 font-semibold px-4 py-2 rounded-xl hover:bg-blue-700/20 hover:text-white transition-all duration-200"
      >
        ← Volver
      </button>

      {/* Imagen cancha */}
      <div className="relative w-full max-w-5xl h-80 rounded-3xl overflow-hidden shadow-xl border border-[#1b4e89]">
        <Image
          src={cancha.imagen}
          alt={cancha.nombre}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Info */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold mb-4">{cancha.nombre}</h1>
        <p className="text-blue-300 text-lg mb-10">{cancha.descripcion}</p>
      </div>

      {/* Selector */}
      <div className="w-full max-w-5xl bg-[#0b2545] border border-[#1b4e89] rounded-3xl p-8 shadow-xl">
        {/* Día */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowDays((p) => !p)}
            className="flex items-center gap-3 text-xl font-semibold text-blue-300 hover:text-white transition-all"
          >
            <Calendar className="w-6 h-6 text-blue-300" />
            {openDay}
            <motion.span
              animate={{ rotate: showDays ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </button>

          <p className="text-neutral-400 text-sm">
            Los turnos se pueden solicitar hasta una semana antes.
          </p>
        </div>

        {/* Lista de días */}
        {showDays && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <div className="flex flex-wrap gap-3">
              {availableDays.map((d) => (
                <button
                  key={d.label}
                  onClick={() => {
                    setOpenDay(d.label);
                    setShowDays(false);
                    setSelected([]);
                    setAnchor(null);
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    openDay === d.label
                      ? "bg-blue-600 border-blue-400 text-white"
                      : "bg-[#102b55] border-[#1b4e89] hover:bg-blue-900"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Horarios */}
        {availableDays
          .filter((d) => d.label === openDay)
          .map((day) => (
            <div key={day.label} className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {day.hours.map((hour) => {
                  const isSelected = selected.includes(hour);
                  return (
                    <motion.div
                      key={hour}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelect(hour)}
                      className={`cursor-pointer py-3 rounded-xl text-center font-semibold transition-all duration-200 border ${
                        isSelected
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-emerald-600/20 hover:bg-emerald-600/35 border-emerald-500/30 text-emerald-100"
                      }`}
                    >
                      {hour}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

        {/* Warning */}
        {warning && (
          <div className="flex items-center gap-2 text-yellow-400 mt-4">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">{warning}</p>
          </div>
        )}

        {/* Precio + Confirmar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-sm bg-emerald-600/35 border border-emerald-500/30" />
              Disponible
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-sm bg-blue-600 border border-blue-400" />
              Seleccionado
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-neutral-300 text-sm">
                <span className="font-semibold text-white">
                  Precio por hora:
                </span>{" "}
                ${PRICE_PER_HOUR.toLocaleString("es-AR")}
              </p>
              <p className="text-neutral-400 text-sm">
                Total estimado:{" "}
                <span className="text-blue-300 font-semibold">
                  ${total.toLocaleString("es-AR")}
                </span>
              </p>
            </div>

            <button
              disabled={selected.length === 0}
              onClick={() =>
                router.push(
                  `/reserva/confirmacion?bloques=${selected.length}&total=${total}`
                )
              }
              className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-xl shadow-md transition-all ${
                selected.length
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gray-600 cursor-not-allowed text-gray-300"
              }`}
            >
              Confirmar Turno
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

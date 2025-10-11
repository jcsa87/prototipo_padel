"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

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
    { label: string; date: string; hours: string[] }[]
  >([]);
  const [openDay, setOpenDay] = useState<string>("Hoy");
  const [showDays, setShowDays] = useState(false);

  // punto de anclaje para range selection
  const [anchor, setAnchor] = useState<{ day: string; hour: string } | null>(
    null
  );

  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  // intervalos de 30 min
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let h = 8; h <= 23; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
      slots.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const slots = generateTimeSlots();

    const todaySlots = slots.filter((h) => {
      const [hh, mm] = h.split(":").map(Number);
      if (hh > currentHour) return true;
      if (hh === currentHour && mm > currentMinutes) return true;
      return false;
    });

    const days: { label: string; date: string; hours: string[] }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const dayLabel = d.toLocaleDateString("es-AR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      days.push({
        label: i === 0 ? "Hoy" : dayLabel,
        date: d.toISOString().split("T")[0],
        hours: i === 0 ? todaySlots : slots,
      });
    }
    setAvailableDays(days);
  }, []);

  // selección por rango: [inicio, fin) (fin excluido)
  const handleSlotClick = (dayLabel: string, hour: string) => {
    // si no hay ancla o ancla es de otro día → seteamos ancla y seleccionamos solo ese bloque
    if (!anchor || anchor.day !== dayLabel) {
      setAnchor({ day: dayLabel, hour });
      setSelected([`${dayLabel}-${hour}`]);
      return;
    }
    // si clickeás el mismo bloque que el ancla, limpiamos
    if (anchor.day === dayLabel && anchor.hour === hour) {
      setAnchor(null);
      setSelected([]);
      return;
    }
    // calculamos rango exclusivo del final
    const start = Math.min(toMinutes(anchor.hour), toMinutes(hour));
    const end = Math.max(toMinutes(anchor.hour), toMinutes(hour));

    const day = availableDays.find((d) => d.label === dayLabel);
    const range = (day?.hours || [])
      .filter((h) => {
        const m = toMinutes(h);
        return m >= start && m < end; // fin EXCLUSIVO
      })
      .map((h) => `${dayLabel}-${h}`);

    setSelected(range);
    setAnchor(null);
  };

  if (!cancha) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white bg-[#001a33]">
        <h1 className="text-2xl font-bold">Cancha no encontrada</h1>
      </section>
    );
  }

  const total = selected.length * 0.5 * PRICE_PER_HOUR; // cada bloque = 30 min

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#001a33] to-[#002b5b] flex flex-col items-center text-white px-6 py-20 relative">
      {/* volver */}
      <button
        onClick={() => router.back()}
        className="absolute top-24 left-8 bg-transparent border border-blue-400 text-blue-300 font-semibold px-4 py-2 rounded-xl hover:bg-blue-700/20 hover:text-white transition-all duration-200"
      >
        ← Volver
      </button>

      {/* vista previa */}
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

      {/* selector */}
      <div className="w-full max-w-5xl bg-[#0b2545] border border-[#1b4e89] rounded-3xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowDays((prev) => !prev)}
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

        {/* lista de días */}
        <AnimatePresence>
          {showDays && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="flex flex-wrap gap-3">
                {availableDays.map((day) => (
                  <button
                    key={day.label}
                    onClick={() => {
                      setOpenDay(day.label);
                      setShowDays(false);
                      setSelected([]);
                      setAnchor(null);
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                      openDay === day.label
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-[#102b55] border-[#1b4e89] hover:bg-blue-900"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* horarios del día */}
        {availableDays
          .filter((d) => d.label === openDay)
          .map((day) => (
            <div key={day.label} className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {day.hours.map((hour) => {
                  const id = `${day.label}-${hour}`;
                  const isSelected = selected.includes(id);
                  return (
                    <motion.button
                      type="button"
                      key={id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleSlotClick(day.label, hour)}
                      className={`py-3 rounded-xl text-center font-semibold border transition-all duration-200
                        ${
                          isSelected
                            ? "bg-blue-600 border-blue-400 text-white"
                            : "bg-emerald-600/20 hover:bg-emerald-600/35 border-emerald-500/30 text-emerald-100"
                        } // ✅ verde discreto
                      `}
                    >
                      {hour}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}

        {/* leyenda + precio + confirmar (alineado derecha) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* leyenda a la izquierda */}
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

          {/* precio + botón a la derecha */}
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
              onClick={() => {
                router.push(
                  `/reserva/confirmacion?bloques=${selected.length}&total=${total}`
                );
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
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

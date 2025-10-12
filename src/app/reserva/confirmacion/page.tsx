"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";

export default function ConfirmacionTurno() {
  const router = useRouter();
  const params = useSearchParams();

  // Datos desde la URL
  const bloques = parseInt(params.get("bloques") || "0");
  const total = parseInt(params.get("total") || "0");
  const cancha = params.get("cancha") || "Cancha seleccionada";
  const dia = params.get("dia") || "Hoy";
  const inicio = params.get("inicio") || "08:00";
  const fin = params.get("fin") || "09:30";

  // Lógica local
  const horas = bloques * 0.5; // cada bloque = 30 min
  const precioHora = 10000;

  // Fecha actual formateada
  const fechaActual = new Date().toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#001a33] to-[#002b5b] text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0b2545] border border-[#1b4e89] rounded-3xl p-10 w-full max-w-xl shadow-2xl text-center"
      >
        {/* ✅ Encabezado */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col items-center gap-2"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          <h1 className="text-3xl font-bold text-white">
            Confirmación de turno
          </h1>
          <p className="text-neutral-400 text-sm">
            Revisá los detalles antes de finalizar tu reserva
          </p>
        </motion.div>

        {/* 🧾 Detalles */}
        <div className="mt-6 space-y-4 text-left bg-[#112d57] rounded-2xl p-6">
          <div className="flex items-center gap-3 text-blue-300">
            <MapPin className="w-5 h-5 text-blue-400" />
            <p className="font-semibold">{cancha}</p>
          </div>

          <div className="flex items-center gap-3 text-blue-300">
            <Calendar className="w-5 h-5 text-blue-400" />
            <p>
              {dia}{" "}
              <span className="text-neutral-400 text-sm">({fechaActual})</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-blue-300">
            <Clock className="w-5 h-5 text-blue-400" />
            <p>
              {horas.toFixed(1)} horas reservadas —{" "}
              <span className="text-neutral-300">
                de <span className="text-white font-semibold">{inicio}</span> a{" "}
                <span className="text-white font-semibold">{fin}</span>
              </span>
            </p>
          </div>

          <hr className="border-blue-900/60 my-4" />

          <div className="flex justify-between items-center">
            <p className="text-neutral-300">
              Precio por hora:{" "}
              <span className="text-white font-semibold">
                ${precioHora.toLocaleString("es-AR")}
              </span>
            </p>
            <p className="text-lg font-semibold text-emerald-400">
              Total: ${total.toLocaleString("es-AR")}
            </p>
          </div>
        </div>

        {/* ⚙️ Botones */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/reserva")}
            className="flex items-center justify-center gap-2 bg-gray-700/70 hover:bg-gray-600 transition-all px-6 py-3 rounded-xl text-white font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>

          <button
            onClick={() => alert("✅ Turno confirmado correctamente")}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition-all px-6 py-3 rounded-xl text-white font-semibold"
          >
            Confirmar Reserva <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

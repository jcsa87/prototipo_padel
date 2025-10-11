"use client";

import { motion } from "framer-motion";

export default function Ubicacion() {
  return (
    <section
      id="ubicacion"
      className="relative w-full bg-transparent border-t border-neutral-800"
    >
      {/* 🗺️ Título */}
      <div className="text-center py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-white mb-3"
        >
          ¿Dónde estamos?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-neutral-400 max-w-3xl mx-auto"
        >
          Nos podes encontrar en Av. Costanera 4650, Corrientes, Argentina.
        </motion.p>
      </div>

      {/* 🗺️ Mapa de ancho completo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[70vh]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4066.2468420154623!2d-58.854310616305625!3d-27.47320619926287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sar!4v1760167193506!5m2!1sen!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
}

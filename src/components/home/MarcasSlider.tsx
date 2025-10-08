// src/components/home/MarcasSlider.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import Container from "../ui/Container";

const marcas = [
  "/logos/V.png",
  "/logos/VERSORI_TRANSPARENTE.png",
  "/logos/VERSORI.png",
  "/logos/VI.png",
];

export default function MarcasSlider() {
  return (
    <section className="py-20 bg-neutral-950">
      <Container>
        <SectionTitle
          title="Marcas que nos acompañan"
          subtitle="Empresas que confían en nuestra propuesta deportiva, tecnológica y social."
        />
        <div className="overflow-hidden mt-10">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...marcas, ...marcas].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Logo marca"
                width={120}
                height={50}
                className="opacity-80 hover:opacity-100 transition"
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

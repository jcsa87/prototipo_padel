// src/app/admin/page.tsx
"use client";
import { StatCard } from "./components/StatCard";
import { ChartSection } from "./components/ChartSection";
import { TableReservas } from "./components/TableReservas";
import { ClubCustomization } from "./components/ClubCustomization";

export default function AdminPage() {
  const stats = [
    { title: "Reservas activas", value: 24 },
    { title: "Pagos procesados", value: "$1250" },
    { title: "Usuarios registrados", value: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartSection />
          <TableReservas />
        </div>
        <div className="lg:col-span-1">
          <ClubCustomization />
        </div>
      </div>
    </div>
  );
}

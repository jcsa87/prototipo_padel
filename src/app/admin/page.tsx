// src/app/admin/page.tsx
"use client";
import { StatCard } from "./components/StatCard";

export default function AdminPage() {
  const stats = [
    { title: "Reservas activas", value: 24 },
    { title: "Pagos procesados", value: "$1250" },
    { title: "Usuarios registrados", value: 45 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Panel de control</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>
    </div>
  );
}

// src/app/admin/components/Sidebar.tsx
"use client";
import { LayoutDashboard, Calendar, Users, CreditCard } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    {
      href: "/admin/reservas",
      label: "Reservas",
      icon: <Calendar size={18} />,
    },
    { href: "/admin/usuarios", label: "Usuarios", icon: <Users size={18} /> },
    { href: "/admin/pagos", label: "Pagos", icon: <CreditCard size={18} /> },
  ];

  return (
    <aside className="w-64 bg-[#0d1b2a] text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Versori Admin
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 hover:bg-[#1b263b] rounded-md transition"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

// src/app/admin/components/Sidebar.tsx
"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { UserProfile } from "./UserProfile";

export function Sidebar() {
  // Simulamos el rol del usuario actual
  const userRole = "Administrador"; // cambiar a "Vendedor" para probar restricciones

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

  // Solo visible si el usuario tiene permisos de administrador
  if (userRole === "Administrador") {
    links.push({
      href: "/admin/personalizacion",
      label: "Personalización",
      icon: <Settings size={18} />,
    });
  }

  const handleLogout = () => {
    // luego reemplazar por tu lógica real (supabase.auth.signOut() o router.push('/login'))
    alert("Sesión cerrada");
  };

  return (
    <aside className="w-64 bg-[#0d1b2a] text-white flex flex-col justify-between">
      {/* Encabezado */}
      <div>
        <div className="p-4 font-bold text-lg border-b border-gray-700">
          Versori Admin
        </div>

        {/* Navegación */}
        <nav className="p-2 space-y-1">
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
      </div>

      {/* Perfil y cerrar sesión */}
      <div>
        <UserProfile />
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 border-t border-gray-700 text-sm hover:bg-[#1b263b] transition"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

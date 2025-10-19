"use client";
import { useState } from "react";

export default function UsuariosPage() {
  const [userRole] = useState("Cajero");

  const usuarios = [
    { id: 1, nombre: "Neil Sims", rol: "Cliente", email: "neil@windster.com" },
    {
      id: 2,
      nombre: "Roberta Casas",
      rol: "Administrador",
      email: "roberta@windster.com",
    },
    { id: 3, nombre: "Jesé Leos", rol: "Cajero", email: "jese@windster.com" },
    {
      id: 4,
      nombre: "Thomas Lean",
      rol: "Cliente",
      email: "thomas@windster.com",
    },
  ];

  const usuariosVisibles =
    userRole === "Administrador"
      ? usuarios
      : usuarios.filter((u) => u.rol === "Cliente");

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-sm text-gray-500">
            <th className="py-2">Nombre</th>
            <th className="py-2">Correo</th>
            <th className="py-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuariosVisibles.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{u.nombre}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const ROLE_PERMISSIONS = {
  Administrador: {
    acceso: ["dashboard", "reservas", "usuarios", "pagos", "personalizacion"],
    puedeEditarEstilos: true,
    puedeVerFacturacion: true,
  },
  Cajero: {
    acceso: ["dashboard", "reservas", "usuarios"],
    puedeEditarEstilos: false,
    puedeVerFacturacion: false,
  },
} as const;

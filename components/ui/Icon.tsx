import type { SVGProps } from "react";

/* Set de iconos de línea, 24×24, trazo 1.6.
   Todos comparten caja y peso para que la retícula se sienta de un mismo
   sistema. Decorativos por defecto (aria-hidden); si un icono carga
   significado propio, pasar `titulo`. */

const trazos: Record<string, React.ReactNode> = {
  /* --- Oficios ------------------------------------------------ */
  plomeria: (
    <>
      <path d="M7 3v5a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v5" />
      <path d="M4 3h6M14 18h6" />
      <circle cx="17" cy="8" r="2.5" />
    </>
  ),
  electricidad: (
    <>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />
    </>
  ),
  impermeabilizacion: (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M4 9v5a8 8 0 0 0 16 0V9" />
      <path d="M8 14c1.4 1.6 2.8 1.6 4 0s2.6-1.6 4 0" />
    </>
  ),
  pintura: (
    <>
      <rect x="3" y="3" width="12" height="6" rx="1.5" />
      <path d="M15 6h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-7" />
      <path d="M12 12v3" />
      <rect x="9.5" y="15" width="5" height="6" rx="1.5" />
    </>
  ),
  construccion: (
    <>
      <path d="M3 20h18" />
      <path d="M5 20V9l7-5 7 5v11" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  albanileria: (
    <>
      <rect x="3" y="5" width="18" height="5" rx="1" />
      <rect x="3" y="14" width="18" height="5" rx="1" />
      <path d="M9 5v5M15 14v5" />
    </>
  ),
  mantenimiento: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0 5 5L21 10a5.5 5.5 0 0 1-7.6 6.4L7 21a2.1 2.1 0 0 1-3-3l4.6-6.4A5.5 5.5 0 0 1 14 4z" />
    </>
  ),
  limpieza: (
    <>
      <path d="M8 3h4l1 8H7z" />
      <path d="M6 11h8l1 10H5z" />
      <path d="M17 5h4M18 9h3M19 13h2" />
    </>
  ),
  jardineria: (
    <>
      <path d="M12 21v-7" />
      <path d="M12 14c0-4 3-7 8-7 0 4-3 7-8 7z" />
      <path d="M12 16c0-3-2.4-5.5-6-5.5 0 3 2.4 5.5 6 5.5z" />
    </>
  ),
  carpinteria: (
    <>
      <path d="M3 17 14 6l4 4L7 21H3z" />
      <path d="M13 5l3-3 5 5-3 3" />
    </>
  ),
  herreria: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M8 3v18M16 3v18M3 12h18" />
    </>
  ),
  cerrajeria: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.4" />
    </>
  ),
  climas: (
    <>
      <rect x="3" y="4" width="18" height="8" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 16c0 2 1.5 2 1.5 4M12 16c0 2 1.5 2 1.5 4M17 16c0 2-1.5 2-1.5 4" />
    </>
  ),
  materiales: (
    <>
      <path d="M3 8.5 12 4l9 4.5-9 4.5z" />
      <path d="M3 12.5 12 17l9-4.5" />
      <path d="M3 16.5 12 21l9-4.5" />
    </>
  ),

  /* --- Interfaz ----------------------------------------------- */
  buscar: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  escudo: (
    <>
      <path d="M12 3 4.5 6v6c0 4.6 3.1 7.9 7.5 9 4.4-1.1 7.5-4.4 7.5-9V6z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  estrella: (
    <path d="m12 3.5 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.9l6-.9z" />
  ),
  rayo: <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />,
  credito: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19M6 15h4" />
    </>
  ),
  mapa: (
    <>
      <path d="m9 4-6 2.5v13L9 17l6 3 6-2.5v-13L15 7z" />
      <path d="M9 4v13M15 7v13" />
    </>
  ),
  camara: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19H4a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 4 8z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  usuario: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  telefono: (
    <path d="M6 3h3l2 5-2.2 1.4a12 12 0 0 0 5.8 5.8L16 13l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3z" />
  ),
  correo: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  flecha: <path d="M4 12h15m-6-6 6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  cerrar: <path d="m6 6 12 12M18 6 6 18" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  documento: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M8.5 13h7M8.5 17h4" />
    </>
  ),
  rostro: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10.5h.01M15 10.5h.01M8.8 15a4.5 4.5 0 0 0 6.4 0" />
    </>
  ),
  casa: (
    <>
      <path d="m3 10.5 9-7 9 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
};

export type NombreIcono = keyof typeof trazos;

export function Icon({
  nombre,
  titulo,
  className = "h-6 w-6",
  ...props
}: {
  nombre: string;
  titulo?: string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "className">) {
  const trazo = trazos[nombre] ?? trazos.check;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={titulo ? "img" : undefined}
      aria-hidden={titulo ? undefined : true}
      aria-label={titulo}
      {...props}
    >
      {trazo}
    </svg>
  );
}

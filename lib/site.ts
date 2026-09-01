/* Configuración del sitio: un solo lugar para datos de contacto,
   navegación y URL base. */

/**
 * URL base del sitio: alimenta metadataBase, los canonicals, el sitemap y
 * el JSON-LD. Se resuelve en este orden:
 *   1. NEXT_PUBLIC_SITE_URL — el dominio definitivo, cuando exista.
 *   2. NEXT_PUBLIC_VERCEL_URL — la que Vercel inyecta en cada despliegue,
 *      para que una preview no declare canonicals de un dominio ajeno.
 *   3. El dominio previsto, como último recurso en local.
 */
const urlBase =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "") ||
  "https://redwork.com.mx";

export const site = {
  nombre: "RedWork",
  nombreCorto: "RedWork",
  url: urlBase,
  descripcion:
    "RedWork conecta a clientes con profesionales y proveedores de construcción verificados con INE en CDMX y municipios del Estado de México, con geolocalización en tiempo real.",
  /** Soporte de cuenta, incidencias y ayuda dentro de la plataforma. */
  email: "soporte@redwork.com.mx",
  /** Contacto general, comercial y prensa. */
  emailContacto: "contacto@redwork.com.mx",
  telefono: "+52 55 7764 9864",
  telefonoLink: "+525577649864",
  horario: "Lunes a sábado, 8:00 – 20:00",
  ciudad: "Ciudad de México",
  cobertura: "CDMX y municipios del Estado de México",
} as const;

export interface ItemNav {
  href: string;
  etiqueta: string;
  /** Descripción corta para el menú desplegable */
  descripcion?: string;
  icono?: string;
}

/** Navegación principal. Cada ítem es una ruta real, no un ancla. */
export const navPrincipal: ItemNav[] = [
  { href: "/servicios", etiqueta: "Servicios" },
  { href: "/como-funciona", etiqueta: "Cómo funciona" },
  { href: "/profesionales", etiqueta: "Profesionales" },
  { href: "/planes", etiqueta: "Planes" },
];

/** Menú desplegable "Comunidad": lo que no es transaccional. */
export const navComunidad: ItemNav[] = [
  {
    href: "/trabajos-realizados",
    etiqueta: "Trabajos realizados",
    descripcion: "Galería de obra terminada por categoría y zona",
    icono: "camara",
  },
  {
    href: "/blog",
    etiqueta: "Blog",
    descripcion: "Guías de precios y mantenimiento",
    icono: "documento",
  },
  {
    href: "/faq",
    etiqueta: "Preguntas frecuentes",
    descripcion: "Registro, verificación, membresías y créditos",
    icono: "buscar",
  },
  {
    href: "/nosotros",
    etiqueta: "Nosotros",
    descripcion: "Quiénes somos y cómo trabajamos",
    icono: "escudo",
  },
];

export const navFooter: { titulo: string; items: ItemNav[] }[] = [
  {
    titulo: "Plataforma",
    items: [
      { href: "/servicios", etiqueta: "Servicios" },
      { href: "/como-funciona", etiqueta: "Cómo funciona" },
      { href: "/profesionales", etiqueta: "Profesionales y proveedores" },
      { href: "/planes", etiqueta: "Planes y créditos" },
    ],
  },
  {
    titulo: "Comunidad",
    items: [
      { href: "/trabajos-realizados", etiqueta: "Trabajos realizados" },
      { href: "/blog", etiqueta: "Blog" },
      { href: "/faq", etiqueta: "Preguntas frecuentes" },
      { href: "/nosotros", etiqueta: "Nosotros" },
      { href: "/contacto", etiqueta: "Contacto" },
    ],
  },
];

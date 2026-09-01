import type { PaqueteCreditos, Plan } from "@/lib/types";

/* Membresías anuales para profesionales y proveedores, ordenadas por precio.
   Los precios y beneficios vienen del backend; aquí se replican los
   vigentes en la V1 del sitio. */
export const planes: Plan[] = [
  {
    slug: "basica",
    nombre: "Básica",
    precioAnual: 299,
    moneda: "MXN",
    tagline: "Ideal para empezar",
    zonas: ["Zona Norte · CDMX"],
    popular: false,
    cta: "Comenzar ahora",
    beneficios: [
      "Cobertura en 5 alcaldías CDMX (Zona Norte)",
      "Catálogo de productos limitado",
      "Perfil profesional verificado",
      "Estadísticas básicas",
      "Soporte por email",
    ],
  },
  {
    slug: "edomex",
    nombre: "Edomex",
    precioAnual: 399,
    moneda: "MXN",
    tagline: "Municipios del Estado de México",
    zonas: ["Estado de México"],
    popular: false,
    cta: "Comenzar ahora",
    beneficios: [
      "Cobertura en 5 municipios del Edomex",
      "Coacalco, Tlalnepantla y Atizapán",
      "Huixquilucan y Naucalpan",
      "Perfil profesional verificado",
      "Soporte por email",
    ],
  },
  {
    slug: "intermedia",
    nombre: "Intermedia",
    precioAnual: 499,
    moneda: "MXN",
    tagline: "Cobertura norte y centro",
    zonas: ["Zona Norte · CDMX", "Zona Centro · CDMX"],
    popular: true,
    cta: "Comenzar ahora",
    beneficios: [
      "Cobertura en 10 alcaldías CDMX (Norte y Centro)",
      "Perfil destacado en resultados",
      "Productos ilimitados",
      "Prioridad en búsquedas",
      "Estadísticas avanzadas",
      "Soporte prioritario",
    ],
  },
  {
    slug: "premium",
    nombre: "Premium",
    precioAnual: 699,
    moneda: "MXN",
    tagline: "Cobertura total CDMX + Edomex",
    zonas: [
      "Zona Norte · CDMX",
      "Zona Centro · CDMX",
      "Zona Sur · CDMX",
      "Estado de México",
    ],
    popular: false,
    cta: "Solicitar Premium",
    beneficios: [
      "Cobertura en 16 alcaldías CDMX + 5 municipios Edomex",
      "Perfil destacado con distintivo",
      "Servicios y productos ilimitados",
      "Prioridad máxima en búsquedas",
      "50% de descuento en paquetes de créditos",
      "Soporte prioritario 24/7",
      "Analytics avanzado",
    ],
  },
];

/** Plan gratuito para clientes. Nunca se cobra al cliente. */
export const planCliente: Plan = {
  slug: "cliente",
  nombre: "Cliente",
  precioAnual: 0,
  moneda: "MXN",
  tagline: "Gratis, siempre",
  zonas: ["CDMX", "Estado de México"],
  popular: false,
  cta: "Registrarme gratis",
  beneficios: [
    "Búsqueda ilimitada de profesionales y proveedores",
    "Solicita cotizaciones sin costo",
    "Tracking en tiempo real del servicio",
    "Historial completo de servicios",
    "Califica a los profesionales",
    "Sin compromiso ni permanencia",
  ],
};

/* Paquetes de créditos para trabajos urgentes (pay-per-lead). */
export const paquetesCreditos: PaqueteCreditos[] = [
  { creditos: 5, precio: 99, moneda: "MXN", descuentoPremium: 50 },
  { creditos: 15, precio: 249, moneda: "MXN", descuentoPremium: 50 },
  { creditos: 30, precio: 399, moneda: "MXN", descuentoPremium: 50 },
];

/** Comparativa fila por fila para la tabla de /planes. */
export const comparativaPlanes: {
  caracteristica: string;
  valores: Record<string, string>;
}[] = [
  {
    caracteristica: "Alcaldías y municipios",
    valores: { basica: "5", edomex: "5", intermedia: "10", premium: "21" },
  },
  {
    caracteristica: "Catálogo de productos",
    valores: {
      basica: "Limitado",
      edomex: "Limitado",
      intermedia: "Ilimitado",
      premium: "Ilimitado",
    },
  },
  {
    caracteristica: "Perfil destacado",
    valores: { basica: "—", edomex: "—", intermedia: "Sí", premium: "Sí ★" },
  },
  {
    caracteristica: "Prioridad en búsquedas",
    valores: { basica: "—", edomex: "—", intermedia: "Alta", premium: "Máxima" },
  },
  {
    caracteristica: "Estadísticas",
    valores: {
      basica: "Básicas",
      edomex: "Básicas",
      intermedia: "Avanzadas",
      premium: "Analytics",
    },
  },
  {
    caracteristica: "Descuento en créditos",
    valores: { basica: "—", edomex: "—", intermedia: "—", premium: "50%" },
  },
  {
    caracteristica: "Soporte",
    valores: {
      basica: "Email",
      edomex: "Email",
      intermedia: "Prioritario",
      premium: "24/7",
    },
  },
];

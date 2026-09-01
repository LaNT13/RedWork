import type { TrabajoRealizado } from "@/lib/types";

/* DATOS DE EJEMPLO para la galería.
   `imagen: null` es deliberado: hasta tener fotografía real de obra, la
   tarjeta pinta un marco marcado como "Foto pendiente". No se generan
   imágenes con IA ni se presentan como trabajos reales. */
export const trabajosRealizados: TrabajoRealizado[] = [
  {
    id: "job-001",
    titulo: "Impermeabilización de azotea de 90 m²",
    categoria: "impermeabilizacion",
    zona: "Tlalnepantla, Edomex",
    fecha: "2026-06-14",
    descripcion:
      "Preparación de superficie, sellado de grietas y aplicación de impermeabilizante elastomérico con garantía de 5 años.",
    duracion: "2 días",
    imagen: null,
  },
  {
    id: "job-002",
    titulo: "Cambio de centro de carga y 12 contactos",
    categoria: "electricidad",
    zona: "Gustavo A. Madero, CDMX",
    fecha: "2026-06-02",
    descripcion:
      "Sustitución de centro de carga por uno de 12 circuitos, pastillas nuevas y recableado de contactos en planta baja.",
    duracion: "1 día",
    imagen: null,
  },
  {
    id: "job-003",
    titulo: "Reparación de fuga en línea de agua fría",
    categoria: "plomeria",
    zona: "Iztapalapa, CDMX",
    fecha: "2026-05-28",
    descripcion:
      "Detección de fuga bajo firme, ruptura mínima, cambio de tramo de CPVC y resane del piso.",
    duracion: "6 horas",
    imagen: null,
  },
  {
    id: "job-004",
    titulo: "Pintura de fachada de 3 niveles",
    categoria: "pintura",
    zona: "Benito Juárez, CDMX",
    fecha: "2026-05-19",
    descripcion:
      "Lavado, resane, sellado y dos manos de vinílica para exterior con andamio certificado.",
    duracion: "4 días",
    imagen: null,
  },
  {
    id: "job-005",
    titulo: "Ampliación de recámara en planta alta",
    categoria: "construccion",
    zona: "Naucalpan, Edomex",
    fecha: "2026-04-30",
    descripcion:
      "Castillos, muros de block, losa aligerada y preparación para instalaciones eléctricas e hidráulicas.",
    duracion: "6 semanas",
    imagen: null,
  },
  {
    id: "job-006",
    titulo: "Aplanado fino en 120 m² de muros",
    categoria: "albanileria",
    zona: "Coacalco, Edomex",
    fecha: "2026-04-11",
    descripcion:
      "Aplanado fino a regla y plomo en muros interiores, listo para pintura.",
    duracion: "5 días",
    imagen: null,
  },
  {
    id: "job-007",
    titulo: "Limpieza fin de obra de departamento",
    categoria: "limpieza",
    zona: "Cuauhtémoc, CDMX",
    fecha: "2026-03-27",
    descripcion:
      "Retiro de residuos, limpieza de cristales, detallado de pisos y sanitarios tras remodelación.",
    duracion: "1 día",
    imagen: null,
  },
  {
    id: "job-008",
    titulo: "Entrega de 60 bultos de cemento y varilla",
    categoria: "materiales",
    zona: "Coyoacán, CDMX",
    fecha: "2026-03-15",
    descripcion:
      "Surtido desde casa de material de la zona con seguimiento GPS del camión hasta la obra.",
    duracion: "Mismo día",
    imagen: null,
  },
  {
    id: "job-009",
    titulo: "Mantenimiento preventivo de edificio",
    categoria: "mantenimiento",
    zona: "Miguel Hidalgo, CDMX",
    fecha: "2026-02-20",
    descripcion:
      "Revisión de instalaciones, cambio de luminarias en áreas comunes y ajuste de herrajes.",
    duracion: "3 días",
    imagen: null,
  },
];

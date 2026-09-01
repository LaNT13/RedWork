import type { Zona } from "@/lib/types";

/* Cobertura tal como la definen los planes de membresía.
   Las alcaldías por zona vienen del backend; aquí se replica la
   agrupación que ya usa la plataforma. */
export const zonas: Zona[] = [
  {
    slug: "cdmx-norte",
    nombre: "Zona Norte · CDMX",
    entidad: "CDMX",
    municipios: [
      "Gustavo A. Madero",
      "Azcapotzalco",
      "Miguel Hidalgo",
      "Cuauhtémoc",
      "Venustiano Carranza",
    ],
  },
  {
    slug: "cdmx-centro",
    nombre: "Zona Centro · CDMX",
    entidad: "CDMX",
    municipios: [
      "Benito Juárez",
      "Iztacalco",
      "Iztapalapa",
      "Coyoacán",
      "Álvaro Obregón",
    ],
  },
  {
    slug: "cdmx-sur",
    nombre: "Zona Sur · CDMX",
    entidad: "CDMX",
    municipios: [
      "Tlalpan",
      "Xochimilco",
      "Magdalena Contreras",
      "Tláhuac",
      "Milpa Alta",
      "Cuajimalpa",
    ],
  },
  {
    slug: "edomex",
    nombre: "Estado de México",
    entidad: "Edomex",
    municipios: [
      "Coacalco",
      "Tlalnepantla",
      "Atizapán de Zaragoza",
      "Huixquilucan",
      "Naucalpan",
    ],
  },
];

/** Lista plana para el selector de ubicación del buscador. */
export const ubicaciones: { valor: string; etiqueta: string; entidad: string }[] =
  zonas.flatMap((z) =>
    z.municipios.map((m) => ({
      valor: m,
      etiqueta: m,
      entidad: z.entidad,
    })),
  );

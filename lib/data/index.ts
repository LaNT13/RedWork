/* ============================================================
   Capa de acceso a datos.

   Los componentes NUNCA importan de /lib/mock directamente: piden
   los datos a estas funciones. Cuando el backend exponga la API,
   solo cambia el cuerpo de estas funciones (un fetch en vez de un
   import) y ningún componente se toca.

   Todas son async a propósito, aunque hoy resuelvan de inmediato:
   así la firma no cambia el día que haya red de por medio.
   ============================================================ */

import { categorias } from "@/lib/mock/categorias";
import { posts } from "@/lib/mock/blog";
import { metricasRed, profesionales, proveedores } from "@/lib/mock/directorio";
import {
  comparativaPlanes,
  paquetesCreditos,
  planCliente,
  planes,
} from "@/lib/mock/planes";
import { gruposFaq } from "@/lib/mock/faq";
import { trabajosRealizados } from "@/lib/mock/trabajos";
import { ubicaciones, zonas } from "@/lib/mock/zonas";
import type {
  Categoria,
  GrupoFaq,
  PaqueteCreditos,
  Plan,
  PostBlog,
  Profesional,
  Proveedor,
  TrabajoRealizado,
  Zona,
} from "@/lib/types";

/* ---------- Categorías ---------- */

export async function getCategorias(): Promise<Categoria[]> {
  return categorias;
}

export async function getCategoriasServicio(): Promise<Categoria[]> {
  return categorias.filter((c) => c.tipo === "servicio");
}

export async function getCategoriasActivas(): Promise<Categoria[]> {
  return categorias.filter((c) => c.activa);
}

export async function getCategoria(slug: string): Promise<Categoria | null> {
  return categorias.find((c) => c.slug === slug) ?? null;
}

/* ---------- Cobertura ---------- */

export async function getZonas(): Promise<Zona[]> {
  return zonas;
}

export async function getUbicaciones(): Promise<
  { valor: string; etiqueta: string; entidad: string }[]
> {
  return ubicaciones;
}

/* ---------- Directorio ---------- */

export async function getProfesionales(filtro?: {
  categoria?: string;
  zona?: string;
}): Promise<Profesional[]> {
  return profesionales.filter((p) => {
    const okCat = !filtro?.categoria || p.categorias.includes(filtro.categoria);
    const okZona =
      !filtro?.zona ||
      p.zona.toLowerCase().includes(filtro.zona.toLowerCase());
    return okCat && okZona;
  });
}

export async function getProveedores(): Promise<Proveedor[]> {
  return proveedores;
}

export async function getMetricasRed(): Promise<typeof metricasRed> {
  return metricasRed;
}

/* ---------- Monetización ---------- */

export async function getPlanes(): Promise<Plan[]> {
  return planes;
}

export async function getPlanCliente(): Promise<Plan> {
  return planCliente;
}

export async function getPaquetesCreditos(): Promise<PaqueteCreditos[]> {
  return paquetesCreditos;
}

export async function getComparativaPlanes(): Promise<typeof comparativaPlanes> {
  return comparativaPlanes;
}

/* ---------- FAQ ---------- */

export async function getGruposFaq(): Promise<GrupoFaq[]> {
  return gruposFaq;
}

/* ---------- Galería ---------- */

export async function getTrabajos(filtro?: {
  categoria?: string;
  zona?: string;
}): Promise<TrabajoRealizado[]> {
  return trabajosRealizados
    .filter((t) => {
      const okCat = !filtro?.categoria || t.categoria === filtro.categoria;
      const okZona = !filtro?.zona || t.zona === filtro.zona;
      return okCat && okZona;
    })
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

/* ---------- Blog ---------- */

export async function getPosts(): Promise<PostBlog[]> {
  return [...posts].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

export async function getPost(slug: string): Promise<PostBlog | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostsRelacionados(
  slug: string,
  limite = 3,
): Promise<PostBlog[]> {
  const actual = posts.find((p) => p.slug === slug);
  if (!actual) return [];
  const mismaCategoria = posts.filter(
    (p) => p.slug !== slug && p.categoria === actual.categoria,
  );
  const resto = posts.filter(
    (p) => p.slug !== slug && p.categoria !== actual.categoria,
  );
  return [...mismaCategoria, ...resto].slice(0, limite);
}

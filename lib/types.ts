/* ============================================================
   Formas de datos que este frontend espera de la API de RedWork.
   Mientras el contrato real se define con backend, /lib/mock
   entrega objetos con exactamente esta forma.
   ============================================================ */

export type Slug = string;

export type TipoCuenta = "cliente" | "profesional" | "proveedor";

export interface Categoria {
  slug: Slug;
  nombre: string;
  /** Nombre del icono en components/icons.tsx */
  icono: string;
  /** Frase corta para tarjetas y listados */
  resumen: string;
  /** Copy largo para /servicios/[categoria] */
  descripcion: string;
  /** Trabajos típicos que cubre el oficio */
  trabajos: string[];
  /** Rango de referencia, no cotización. */
  precioDesde: number | null;
  /** true = ya operando en la plataforma; false = por validar */
  activa: boolean;
  /** ¿Es una categoría de materiales en vez de servicio? */
  tipo: "servicio" | "material";
}

export interface Zona {
  slug: Slug;
  nombre: string;
  entidad: "CDMX" | "Edomex";
  municipios: string[];
}

export interface Profesional {
  id: string;
  nombre: string;
  negocio: string;
  iniciales: string;
  categorias: Slug[];
  zona: string;
  /** Promedio 0–5 calculado por la API */
  calificacion: number;
  totalResenas: number;
  trabajosCompletados: number;
  verificado: boolean;
  verificadoEl: string;
  /** Ruta a foto real. null = placeholder marcado, nunca imagen generada. */
  foto: string | null;
}

export interface Proveedor {
  id: string;
  nombre: string;
  iniciales: string;
  materiales: string[];
  zona: string;
  entregaMismoDia: boolean;
  verificado: boolean;
  foto: string | null;
}

export interface Plan {
  slug: Slug;
  nombre: string;
  precioAnual: number;
  moneda: "MXN";
  tagline: string;
  zonas: string[];
  popular: boolean;
  cta: string;
  beneficios: string[];
}

export interface PaqueteCreditos {
  creditos: number;
  precio: number;
  moneda: "MXN";
  /** Descuento aplicable con plan Premium, en porcentaje */
  descuentoPremium: number;
}

export interface PreguntaFaq {
  pregunta: string;
  respuesta: string;
}

export interface GrupoFaq {
  slug: Slug;
  titulo: string;
  preguntas: PreguntaFaq[];
}

export interface TrabajoRealizado {
  id: string;
  titulo: string;
  categoria: Slug;
  zona: string;
  /** ISO 8601 */
  fecha: string;
  descripcion: string;
  duracion: string;
  /** null hasta tener fotografía real del trabajo */
  imagen: string | null;
}

export interface PostBlog {
  slug: Slug;
  titulo: string;
  resumen: string;
  /** ISO 8601 */
  fecha: string;
  actualizado: string | null;
  autor: string;
  categoria: string;
  minutosLectura: number;
  imagen: string | null;
  /** Markdown ligero: párrafos, ## subtítulos y - listas */
  cuerpo: string;
}

export interface PasoComoFunciona {
  numero: string;
  titulo: string;
  texto: string;
}

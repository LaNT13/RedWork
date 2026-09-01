import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Ancho de lectura común a todo el sitio. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/* El espaciado va por prop, no por className: pasar `py-*` suelto chocaba
   con el del propio Section y ganaba el que Tailwind ordenara después, que
   es de donde salían los huecos enormes entre secciones. */
const espaciados = {
  /** Primera sección de una página: respira arriba, cierra pegado. */
  cabecera: "pt-10 pb-6 sm:pt-14 sm:pb-8",
  /** Sección que continúa a una cabecera, sin volver a abrir hueco arriba. */
  continuacion: "pt-4 pb-12 sm:pb-14 lg:pb-16",
  normal: "py-14 sm:py-16 lg:py-20",
  compacto: "py-10 sm:py-12",
  ninguno: "",
} as const;

export function Section({
  children,
  className,
  tono = "papel",
  espaciado = "normal",
  id,
}: {
  children: ReactNode;
  className?: string;
  tono?: "papel" | "superficie" | "navy";
  espaciado?: keyof typeof espaciados;
  id?: string;
}) {
  const tonos = {
    papel: "bg-bg text-ink",
    superficie: "bg-surface text-ink",
    navy: "bg-navy text-on-navy",
  };
  return (
    <section
      id={id}
      className={cn(espaciados[espaciado], tonos[tono], className)}
    >
      {children}
    </section>
  );
}

/** Etiqueta corta que antecede a un título de sección. */
export function Eyebrow({
  children,
  className,
  tono = "brand",
}: {
  children: ReactNode;
  className?: string;
  tono?: "brand" | "claro";
}) {
  return (
    <p
      className={cn(
        "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]",
        tono === "brand" ? "text-brand-ink" : "text-on-navy-2",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-px w-6",
          tono === "brand" ? "bg-brand" : "bg-on-navy-2",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  titulo,
  texto,
  centrado = false,
  tono = "papel",
  className,
  nivel = 2,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  centrado?: boolean;
  tono?: "papel" | "navy";
  className?: string;
  nivel?: 1 | 2 | 3;
}) {
  const Tag = nivel === 1 ? "h1" : nivel === 2 ? "h2" : "h3";
  return (
    <header
      className={cn(
        "max-w-2xl",
        centrado && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tono={tono === "navy" ? "claro" : "brand"}
          className={centrado ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag className="text-3xl sm:text-4xl lg:text-[2.75rem]">{titulo}</Tag>
      {texto ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tono === "navy" ? "text-on-navy-2" : "text-ink-2",
          )}
        >
          {texto}
        </p>
      ) : null}
    </header>
  );
}

export function Badge({
  children,
  tono = "verde",
  className,
}: {
  children: ReactNode;
  tono?: "verde" | "brand" | "navy" | "neutro";
  className?: string;
}) {
  const tonos = {
    verde: "bg-verde-soft text-verde-dark ring-verde/25",
    brand: "bg-brand/10 text-brand-ink ring-brand/30",
    navy: "bg-navy/10 text-navy ring-navy/25",
    neutro: "bg-surface text-ink-2 ring-line",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tonos[tono],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Marco para imágenes que todavía no existen.
 * Regla del proyecto: nunca se rellena con fotos generadas por IA ni con
 * retratos de "profesionales" que no son reales. Se muestra el hueco,
 * etiquetado, hasta tener fotografía propia.
 */
export function FotoPendiente({
  etiqueta,
  className,
  ratio = "4 / 3",
}: {
  etiqueta: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Espacio reservado para fotografía: ${etiqueta}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 bg-surface-2 p-6 text-center",
        "bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,rgb(33_31_27_/_0.045)_10px,rgb(33_31_27_/_0.045)_20px)]",
        className,
      )}
    >
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-3">
        Foto pendiente
      </span>
      <span className="max-w-[22ch] text-xs leading-snug text-ink-3">
        {etiqueta}
      </span>
    </div>
  );
}

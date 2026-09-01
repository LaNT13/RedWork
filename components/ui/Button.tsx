import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variante = "primario" | "navy" | "contorno" | "claro" | "texto";
type Tamano = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-tight " +
  "disabled:opacity-50 disabled:pointer-events-none";

/* El brillo exterior de cada variante se deriva del color que ya usa
   (--rw-brand-rgb / --rw-navy-rgb), no de un hex suelto. */
const variantes: Record<Variante, string> = {
  primario: "bg-brand text-white hover:bg-brand-dark",
  navy: "bg-navy text-on-navy hover:bg-navy-dark [--rw-brand-rgb:var(--rw-navy-rgb)]",
  contorno:
    "bg-transparent text-ink ring-1 ring-inset ring-line-strong hover:bg-surface hover:ring-brand/40",
  claro: "bg-bg text-ink hover:bg-surface",
  texto:
    "rw-subraya bg-transparent text-ink underline-offset-4 hover:text-brand-ink",
};

const tamanos: Record<Tamano, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base",
};

const cortes: Record<Tamano, string> = {
  sm: "rw-cut-sm",
  md: "rw-cut-sm",
  lg: "rw-cut",
};

interface PropsComunes {
  variante?: Variante;
  tamano?: Tamano;
  /** La esquina cortada es el gesto de marca; se puede apagar puntualmente. */
  corte?: boolean;
  className?: string;
  children: ReactNode;
}

type PropsEnlace = PropsComunes & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type PropsBoton = PropsComunes & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export function Button(props: PropsEnlace | PropsBoton) {
  const {
    variante = "primario",
    tamano = "md",
    corte = true,
    className,
    children,
    ...resto
  } = props as PropsComunes & Record<string, unknown>;

  const clases = cn(
    base,
    /* El enlace de texto no se escala ni proyecta sombra: solo subraya. */
    variante !== "texto" && "rw-brillo",
    variantes[variante],
    tamanos[tamano],
    corte && variante !== "texto" && cortes[tamano],
    className,
  );

  if (typeof (resto as { href?: string }).href === "string") {
    const { href, ...enlaceProps } = resto as { href: string };
    return (
      <Link href={href} className={clases} {...enlaceProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clases} {...(resto as ComponentProps<"button">)}>
      {children}
    </button>
  );
}

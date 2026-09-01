import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Categoria } from "@/lib/types";

export function CategoriaCard({
  categoria,
  className,
}: {
  categoria: Categoria;
  className?: string;
}) {
  return (
    <li className={cn("list-none", className)}>
      <Link
        href={`/servicios/${categoria.slug}`}
        data-spotlight
        className="rw-spotlight rw-elevar group relative flex h-full flex-col gap-3 overflow-hidden bg-bg p-5 ring-1 ring-inset ring-line hover:ring-brand/35"
      >
        <span className="rw-icono rw-cut-sm grid h-11 w-11 place-items-center bg-surface text-brand-ink group-hover:bg-brand group-hover:text-white">
          <Icon nombre={categoria.icono} className="h-5 w-5" />
        </span>
        <span className="font-display text-lg font-extrabold leading-tight text-ink">
          {categoria.nombre}
        </span>
        <span className="text-sm leading-snug text-ink-2">
          {categoria.resumen}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-ink">
          Ver{" "}
          {categoria.tipo === "material" ? "proveedores" : "profesionales"}
          <Icon
            nombre="flecha"
            className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-rw)] group-hover:translate-x-1"
          />
        </span>
      </Link>
    </li>
  );
}

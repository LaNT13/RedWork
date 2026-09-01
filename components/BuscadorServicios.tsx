"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface Opcion {
  valor: string;
  etiqueta: string;
  entidad?: string;
}

/**
 * Buscador de servicios y materiales.
 * Hoy solo compone la URL de resultados (/buscar?q=&zona=); cuando exista
 * el endpoint de búsqueda, la página de resultados es la única que cambia.
 */
export function BuscadorServicios({
  categorias,
  ubicaciones,
  valorInicial = "",
  zonaInicial = "",
  compacto = false,
  className,
}: {
  categorias: Opcion[];
  ubicaciones: Opcion[];
  valorInicial?: string;
  zonaInicial?: string;
  compacto?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const idQ = useId();
  const idZona = useId();
  const idLista = useId();
  const [q, setQ] = useState(valorInicial);
  const [zona, setZona] = useState(zonaInicial);

  const porEntidad = ubicaciones.reduce<Record<string, Opcion[]>>((acc, u) => {
    const clave = u.entidad ?? "Otras";
    (acc[clave] ??= []).push(u);
    return acc;
  }, {});

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (zona) params.set("zona", zona);
    const query = params.toString();
    router.push(query ? `/buscar?${query}` : "/buscar");
  }

  /* Cada campo es una caja con su propio estado de foco, para que se lea
     como dos controles distintos y no como una tira de texto. */
  const campo =
    "group/campo relative flex min-w-0 items-center gap-3 bg-bg px-4 py-3 " +
    "transition-colors duration-200 hover:bg-surface/60 " +
    "focus-within:bg-surface/60 focus-within:ring-2 focus-within:ring-inset focus-within:ring-navy";
  const etiqueta =
    "block text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-3 transition-colors group-focus-within/campo:text-navy";
  const valor =
    "w-full min-w-0 bg-transparent py-1.5 text-base text-ink focus:outline-none";

  return (
    <form
      onSubmit={enviar}
      role="search"
      aria-label="Buscar servicios y materiales"
      className={cn(
        "rw-cut bg-surface-2 p-1.5 shadow-[0_18px_44px_-26px_rgb(33_31_27_/_0.5)] ring-1 ring-inset ring-line",
        className,
      )}
    >
      {/* En el hero el buscador vive en media columna, así que los campos
          van arriba y el botón ocupa su propia fila. En las páginas
          internas hay ancho completo y entra todo en una sola línea. */}
      <div
        className={cn(
          "grid gap-1.5",
          compacto
            ? "sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1.15fr)_auto]"
            : "sm:grid-cols-2",
        )}
      >
        <div className={campo}>
          <Icon
            nombre="buscar"
            className="h-5 w-5 shrink-0 text-ink-3 transition-colors group-focus-within/campo:text-brand"
          />
          <span className="w-full min-w-0">
            <label htmlFor={idQ} className={etiqueta}>
              ¿Qué necesitas?
            </label>
            <input
              id={idQ}
              name="q"
              type="text"
              list={idLista}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
              placeholder="Impermeabilizar, fuga, cemento…"
              className={cn(valor, "placeholder:text-ink-3/70")}
            />
            <datalist id={idLista}>
              {categorias.map((c) => (
                <option key={c.valor} value={c.etiqueta} />
              ))}
            </datalist>
          </span>
        </div>

        <div className={campo}>
          <Icon
            nombre="pin"
            className="h-5 w-5 shrink-0 text-ink-3 transition-colors group-focus-within/campo:text-brand"
          />
          <span className="w-full min-w-0">
            <label htmlFor={idZona} className={etiqueta}>
              ¿Dónde?
            </label>
            <select
              id={idZona}
              name="zona"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              aria-label="Alcaldía o municipio"
              className={cn(valor, "cursor-pointer")}
            >
              <option value="">Toda la cobertura</option>
              {Object.entries(porEntidad).map(([entidad, opciones]) => (
                <optgroup key={entidad} label={entidad}>
                  {opciones.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.etiqueta}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </span>
        </div>

        <button
          type="submit"
          className={cn(
            "rw-cut-sm group/btn inline-flex items-center justify-center gap-2 bg-brand px-7 py-4 font-semibold text-white",
            "transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-rw)]",
            "hover:bg-brand-dark hover:shadow-[0_10px_30px_-10px_rgb(var(--rw-brand-rgb)/0.7)] active:translate-y-px",
            !compacto && "sm:col-span-2",
          )}
        >
          Buscar profesional
          <Icon
            nombre="flecha"
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}

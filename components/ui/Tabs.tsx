"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface Pestana {
  id: string;
  etiqueta: string;
  contenido: ReactNode;
}

/**
 * Pestañas accesibles (patrón tablist de WAI-ARIA) con navegación por
 * flechas. Todos los paneles se renderizan en el HTML y se ocultan con
 * `hidden`, para que buscadores y motores de IA lean el contenido completo.
 */
export function Tabs({
  pestanas,
  ariaLabel,
  className,
}: {
  pestanas: Pestana[];
  ariaLabel: string;
  className?: string;
}) {
  const base = useId();
  const [activa, setActiva] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const ultimo = pestanas.length - 1;
    let siguiente: number | null = null;
    if (e.key === "ArrowRight") siguiente = activa === ultimo ? 0 : activa + 1;
    if (e.key === "ArrowLeft") siguiente = activa === 0 ? ultimo : activa - 1;
    if (e.key === "Home") siguiente = 0;
    if (e.key === "End") siguiente = ultimo;
    if (siguiente === null) return;
    e.preventDefault();
    setActiva(siguiente);
    refs.current[siguiente]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="grid gap-2 sm:flex sm:flex-wrap"
      >
        {pestanas.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${p.id}`}
            aria-selected={activa === i}
            aria-controls={`${base}-panel-${p.id}`}
            tabIndex={activa === i ? 0 : -1}
            type="button"
            onClick={() => setActiva(i)}
            className={cn(
              "rw-cut-sm px-5 py-3 text-sm font-bold transition-colors",
              /* La inactiva va en papel, no en superficie: estas pestañas
                 suelen vivir sobre una sección de tono superficie y se
                 perdían contra el fondo. */
              activa === i
                ? "bg-brand text-white"
                : "bg-bg text-ink-2 ring-1 ring-inset ring-line hover:text-ink hover:ring-brand/40",
            )}
          >
            {p.etiqueta}
          </button>
        ))}
      </div>

      {pestanas.map((p, i) => (
        <div
          key={p.id}
          role="tabpanel"
          id={`${base}-panel-${p.id}`}
          aria-labelledby={`${base}-tab-${p.id}`}
          hidden={activa !== i}
          tabIndex={0}
          className="mt-8 focus-visible:outline-3"
        >
          {p.contenido}
        </div>
      ))}
    </div>
  );
}

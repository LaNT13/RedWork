"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Reparte las coordenadas del cursor a las tarjetas que lleven
 * `data-spotlight` dentro de este contenedor, escribiendo --mouse-x y
 * --mouse-y en cada una. El resplandor en sí lo pinta CSS
 * (utilidad `rw-spotlight` en globals.css).
 *
 * No hace nada en punteros táctiles ni con `prefers-reduced-motion`,
 * y las medidas se cachean: solo se recalculan al entrar el cursor,
 * al redimensionar o al hacer scroll.
 */
export function Spotlight({
  as: Tag = "div",
  className,
  children,
  ...resto
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const contenedor = ref.current;
    if (!contenedor) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Marca de vida: deja ver desde el DOM que el efecto está enganchado. */
    contenedor.dataset.rwSpotlight = "activo";

    let medidas: { nodo: HTMLElement; caja: DOMRect }[] = [];
    let cuadro = 0;

    const medir = () => {
      const nodos = Array.from(
        contenedor.querySelectorAll<HTMLElement>("[data-spotlight]"),
      );
      /* El propio contenedor puede ser la tarjeta iluminada. */
      if (contenedor.hasAttribute("data-spotlight")) nodos.unshift(contenedor);
      medidas = nodos.map((nodo) => ({
        nodo,
        caja: nodo.getBoundingClientRect(),
      }));
    };

    const mover = (e: PointerEvent) => {
      if (cuadro) return;
      cuadro = requestAnimationFrame(() => {
        cuadro = 0;
        for (const { nodo, caja } of medidas) {
          nodo.style.setProperty("--mouse-x", `${e.clientX - caja.left}px`);
          nodo.style.setProperty("--mouse-y", `${e.clientY - caja.top}px`);
        }
      });
    };

    contenedor.addEventListener("pointerenter", medir);
    contenedor.addEventListener("pointermove", mover);
    window.addEventListener("resize", medir, { passive: true });
    window.addEventListener("scroll", medir, { passive: true });

    return () => {
      if (cuadro) cancelAnimationFrame(cuadro);
      contenedor.removeEventListener("pointerenter", medir);
      contenedor.removeEventListener("pointermove", mover);
      window.removeEventListener("resize", medir);
      window.removeEventListener("scroll", medir);
    };
  }, []);

  return (
    <Tag ref={ref} className={className} {...resto}>
      {children}
    </Tag>
  );
}

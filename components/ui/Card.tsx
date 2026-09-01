import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Esquina cortada. Se reserva para tarjetas con jerarquía, no para todas. */
  corte?: boolean;
  tono?: "papel" | "superficie" | "navy";
  /** Añade elevación sutil al pasar el cursor (para tarjetas enlazadas). */
  interactiva?: boolean;
  as?: "div" | "article" | "li";
}

const tonos = {
  papel: "bg-bg ring-1 ring-inset ring-line",
  superficie: "bg-surface ring-1 ring-inset ring-line",
  navy: "bg-navy text-on-navy ring-1 ring-inset ring-line-navy",
};

export function Card({
  children,
  className,
  corte = false,
  tono = "papel",
  interactiva = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative",
        tonos[tono],
        corte && "rw-cut",
        interactiva &&
          "transition-transform duration-300 ease-[var(--ease-out-rw)] hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

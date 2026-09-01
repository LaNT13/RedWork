import Link from "next/link";
import { MarcaR } from "@/components/layout/MarcaR";
import { cn } from "@/lib/cn";

/** Marca RedWork: isotipo de red + logotipo. */
export function Logo({
  className,
  tono = "ink",
}: {
  className?: string;
  tono?: "ink" | "claro";
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="RedWork · Inicio"
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-500 ease-[var(--ease-out-rw)] group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <MarcaR
          className="h-9 w-9"
          tono={tono === "claro" ? "claro" : "oscuro"}
        />
      </span>
      <span
        className={cn(
          "font-display text-xl font-black tracking-tight",
          tono === "claro" ? "text-on-navy" : "text-ink",
        )}
      >
        RED<span className="text-brand">WORK</span>
      </span>
    </Link>
  );
}

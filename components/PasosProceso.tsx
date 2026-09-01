import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/cn";

export const pasosProceso = [
  {
    numero: "01",
    icono: "buscar",
    titulo: "Busca",
    texto:
      "Escribe el servicio o el material que necesitas y elige tu alcaldía o municipio. Te mostramos profesionales y proveedores verificados que trabajan en esa zona.",
  },
  {
    numero: "02",
    icono: "documento",
    titulo: "Cotiza",
    texto:
      "Pide cotizaciones sin compromiso y compara precios, tiempos y garantías. Para el cliente, cotizar nunca tiene costo.",
  },
  {
    numero: "03",
    icono: "pin",
    titulo: "Recibe y sigue",
    texto:
      "Aceptas la cotización que te convenga y sigues en el mapa por dónde viene el profesional o el material, hasta que llega a tu domicilio.",
  },
] as const;

export function PasosProceso({ tono = "papel" }: { tono?: "papel" | "navy" }) {
  const claro = tono === "navy";
  return (
    <Spotlight as="ol" className="grid gap-6 sm:grid-cols-3">
      {pasosProceso.map((paso) => (
        <li
          key={paso.numero}
          data-spotlight
          className={cn(
            "rw-cut rw-spotlight rw-elevar relative overflow-hidden p-6",
            claro
              ? "rw-spotlight-navy bg-navy-dark ring-1 ring-inset ring-line-navy"
              : "bg-bg ring-1 ring-inset ring-line hover:ring-brand/35",
          )}
        >
          <span
            aria-hidden="true"
            className="font-display text-4xl font-black leading-none text-brand/30"
          >
            {paso.numero}
          </span>
          <span
            className={cn(
              "rw-icono mt-4 grid h-11 w-11 place-items-center",
              claro
                ? "bg-on-navy/10 text-brand-soft"
                : "bg-surface text-brand-ink",
            )}
          >
            <Icon nombre={paso.icono} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-xl">{paso.titulo}</h3>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              claro ? "text-on-navy-2" : "text-ink-2",
            )}
          >
            {paso.texto}
          </p>
        </li>
      ))}
    </Spotlight>
  );
}

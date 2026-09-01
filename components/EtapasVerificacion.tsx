import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";

export const etapasVerificacion = [
  {
    numero: "01",
    icono: "documento",
    titulo: "Identificación oficial (INE)",
    texto:
      "Se sube la credencial al registrarse y se valida que esté vigente y que los datos coincidan.",
  },
  {
    numero: "02",
    icono: "rostro",
    titulo: "Reconocimiento facial",
    texto:
      "Prueba de vida: comparamos el rostro en vivo contra la fotografía del documento.",
  },
  {
    numero: "03",
    icono: "casa",
    titulo: "Comprobante de domicilio",
    texto:
      "Con referencias de ubicación, para confirmar la zona real donde vive y trabaja.",
  },
] as const;

export function EtapasVerificacion() {
  return (
    <Spotlight as="ol" className="grid gap-4 sm:grid-cols-3">
      {etapasVerificacion.map((etapa) => (
        <li
          key={etapa.numero}
          data-spotlight
          className="rw-spotlight rw-spotlight-navy rw-elevar relative flex gap-4 overflow-hidden bg-on-navy/[0.06] p-5 ring-1 ring-inset ring-line-navy sm:flex-col"
        >
          <span className="rw-icono grid h-11 w-11 shrink-0 place-items-center bg-brand text-white">
            <Icon nombre={etapa.icono} className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">
              Etapa {etapa.numero}
            </p>
            <h3 className="mt-1 text-lg text-on-navy">{etapa.titulo}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-on-navy-2">
              {etapa.texto}
            </p>
          </div>
        </li>
      ))}
    </Spotlight>
  );
}

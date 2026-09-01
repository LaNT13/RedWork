"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const motivos = [
  { valor: "cliente", etiqueta: "Necesito un servicio o materiales" },
  { valor: "urgente", etiqueta: "Tengo una emergencia" },
  { valor: "profesional", etiqueta: "Quiero registrarme como profesional" },
  { valor: "proveedor", etiqueta: "Quiero registrar mi negocio de materiales" },
  { valor: "creditos", etiqueta: "Dudas sobre créditos" },
  { valor: "soporte", etiqueta: "Soporte de mi cuenta" },
  { valor: "otro", etiqueta: "Otro tema" },
];

/**
 * Formulario de contacto. Todavía no hay endpoint: al enviar, la UI
 * confirma los datos y ofrece el correo directo. Cuando exista el POST del
 * backend, solo cambia el cuerpo de `enviar`.
 */
export function FormularioContacto({
  motivoInicial = "cliente",
  ubicaciones,
}: {
  motivoInicial?: string;
  ubicaciones: { valor: string; etiqueta: string; entidad: string }[];
}) {
  const id = useId();
  const [enviado, setEnviado] = useState(false);
  const [motivo, setMotivo] = useState(
    motivos.some((m) => m.valor === motivoInicial) ? motivoInicial : "cliente",
  );

  const porEntidad = ubicaciones.reduce<
    Record<string, { valor: string; etiqueta: string }[]>
  >((acc, u) => {
    (acc[u.entidad] ??= []).push(u);
    return acc;
  }, {});

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

  const campo =
    "mt-1.5 w-full bg-bg px-4 py-3 text-base text-ink ring-1 ring-inset ring-line placeholder:text-ink-3/70 focus:ring-2 focus:ring-navy";
  const etiqueta = "block text-sm font-semibold text-ink";

  if (enviado) {
    return (
      <div
        role="status"
        className="rw-cut bg-verde-soft p-8 ring-1 ring-inset ring-verde/25"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-verde text-white">
          <Icon nombre="check" className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-2xl">Gracias, ya tenemos tus datos</h2>
        <p className="mt-3 text-ink-2">
          Este formulario todavía no está conectado al sistema de RedWork: es
          la interfaz definitiva, a la espera del endpoint del backend.
          Mientras tanto, para que tu solicitud no se pierda, escríbenos
          directo:
        </p>
        <ul className="mt-5 space-y-2 text-ink">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-semibold underline decoration-brand decoration-2 underline-offset-4"
            >
              <Icon nombre="correo" className="h-4 w-4 text-brand" />
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${site.telefonoLink}`}
              className="inline-flex items-center gap-2 font-semibold underline decoration-brand decoration-2 underline-offset-4"
            >
              <Icon nombre="telefono" className="h-4 w-4 text-brand" />
              {site.telefono}
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-6 text-sm font-semibold text-ink-2 underline underline-offset-4 hover:text-ink"
        >
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className="rw-cut bg-surface p-6 ring-1 ring-inset ring-line sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-motivo`} className={etiqueta}>
            ¿En qué te ayudamos?
          </label>
          <select
            id={`${id}-motivo`}
            name="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className={campo}
          >
            {motivos.map((m) => (
              <option key={m.valor} value={m.valor}>
                {m.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-nombre`} className={etiqueta}>
            Nombre
          </label>
          <input
            id={`${id}-nombre`}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            className={campo}
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor={`${id}-telefono`} className={etiqueta}>
            Teléfono
          </label>
          <input
            id={`${id}-telefono`}
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={campo}
            placeholder="55 0000 0000"
          />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={etiqueta}>
            Correo electrónico
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={campo}
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label htmlFor={`${id}-zona`} className={etiqueta}>
            Alcaldía o municipio
          </label>
          <select id={`${id}-zona`} name="zona" className={campo}>
            <option value="">Selecciona tu zona</option>
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
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-mensaje`} className={etiqueta}>
            Cuéntanos qué necesitas
          </label>
          <textarea
            id={`${id}-mensaje`}
            name="mensaje"
            required
            rows={5}
            className={campo}
            placeholder={
              motivo === "urgente"
                ? "Describe la emergencia: qué pasó, desde cuándo y en qué parte de la casa."
                : "Describe el trabajo, el material o la duda que tengas."
            }
          />
          <p className="mt-2 text-xs text-ink-3">
            No incluyas datos bancarios ni documentos de identidad en este
            mensaje. La verificación se hace dentro de la plataforma.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="rw-brillo rw-cut-sm mt-7 inline-flex w-full items-center justify-center gap-2 bg-brand px-7 py-4 font-semibold text-white hover:bg-brand-dark sm:w-auto"
      >
        Enviar mensaje
        <Icon nombre="flecha" className="h-4 w-4" />
      </button>
    </form>
  );
}

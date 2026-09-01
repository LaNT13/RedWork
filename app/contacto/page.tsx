import type { Metadata } from "next";
import Link from "next/link";
import { FormularioContacto } from "@/components/FormularioContacto";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Primitivos";
import { getUbicaciones } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribe a RedWork para pedir un servicio, registrar tu negocio como profesional o proveedor, o resolver dudas de tu cuenta. Atendemos de lunes a sábado de 8:00 a 20:00.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;
  const ubicaciones = await getUbicaciones();

  /* Los CTA del sitio llegan con motivos específicos (plan-basica,
     plan-premium…); todos caen en el bloque de profesionales. */
  const motivoInicial = motivo?.startsWith("plan-")
    ? "profesional"
    : (motivo ?? "cliente");

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Contacto"
            titulo="Hablemos"
            texto="Cuéntanos qué necesitas y te orientamos: un servicio, materiales, tu registro como profesional o proveedor, o una duda de tu cuenta."
          />
        </Container>
      </Section>

      <Section tono="superficie" espaciado="continuacion">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <FormularioContacto
              motivoInicial={motivoInicial}
              ubicaciones={ubicaciones}
            />

            <aside className="space-y-4">
              <div className="bg-bg p-6 ring-1 ring-inset ring-line">
                <h2 className="text-xl">Directo</h2>
                <ul className="mt-4 space-y-4 text-sm">
                  <li>
                    <p className="text-ink-3">Soporte de cuenta</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand-ink"
                    >
                      <Icon nombre="correo" className="h-4 w-4 text-brand" />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-ink-3">Contacto general</p>
                    <a
                      href={`mailto:${site.emailContacto}`}
                      className="mt-1 inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand-ink"
                    >
                      <Icon nombre="correo" className="h-4 w-4 text-brand" />
                      {site.emailContacto}
                    </a>
                  </li>
                  <li>
                    <p className="text-ink-3">Teléfono</p>
                    <a
                      href={`tel:${site.telefonoLink}`}
                      className="mt-1 inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4"
                    >
                      <Icon nombre="telefono" className="h-4 w-4 text-brand" />
                      {site.telefono}
                    </a>
                  </li>
                  <li>
                    <p className="text-ink-3">Horario</p>
                    <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
                      <Icon nombre="reloj" className="h-4 w-4 text-brand" />
                      {site.horario}
                    </p>
                  </li>
                  <li>
                    <p className="text-ink-3">Cobertura</p>
                    <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
                      <Icon nombre="pin" className="h-4 w-4 text-brand" />
                      {site.cobertura}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-bg p-6 ring-1 ring-inset ring-line">
                <h2 className="text-xl">Antes de escribir</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  Muchas dudas de registro, verificación, membresías y créditos
                  ya están resueltas en las preguntas frecuentes.
                </p>
                <Link
                  href="/faq"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink underline decoration-2 underline-offset-4"
                >
                  Ver preguntas frecuentes
                  <Icon nombre="flecha" className="h-4 w-4" />
                </Link>
              </div>

              <div className="bg-navy p-6 text-on-navy ring-1 ring-inset ring-line-navy">
                <h2 className="text-xl text-on-navy">¿Es una emergencia?</h2>
                <p className="mt-3 text-sm leading-relaxed text-on-navy-2">
                  Para fugas, cortos o filtraciones activas, llama directo. Los
                  trabajos urgentes se atienden por teléfono para que un
                  profesional de tu zona pueda llamarte en minutos.
                </p>
                <a
                  href={`tel:${site.telefonoLink}`}
                  className="rw-cut-sm mt-5 inline-flex items-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  <Icon nombre="telefono" className="h-4 w-4" />
                  Llamar ahora
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

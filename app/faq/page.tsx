import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Primitivos";
import { getGruposFaq } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Cómo funciona RedWork: registro y verificación con INE, cotizaciones sin costo para clientes, tracking en tiempo real, membresías por zona y créditos para trabajos urgentes.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const grupos = await getGruposFaq();
  const todas = grupos.flatMap((g) => g.preguntas);

  return (
    <>
      {/* FAQPage: permite que buscadores y motores de IA generativa citen
          las respuestas como hechos, no solo como texto de página. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "es-MX",
          mainEntity: todas.map((p) => ({
            "@type": "Question",
            name: p.pregunta,
            acceptedAnswer: {
              "@type": "Answer",
              text: p.respuesta,
            },
          })),
        }}
      />

      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Preguntas frecuentes"
            titulo="Todo lo que suele preguntarse antes de empezar"
            texto="Si no encuentras tu duda aquí, escríbenos: contestamos de lunes a sábado de 8:00 a 20:00."
          />

          <nav aria-label="Secciones de preguntas" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {grupos.map((g) => (
                <li key={g.slug}>
                  <a
                    href={`#${g.slug}`}
                    className="rw-cut-sm inline-block bg-surface px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:text-brand-ink"
                  >
                    {g.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section tono="superficie" espaciado="continuacion">
        <Container>
          <div className="space-y-14">
            {grupos.map((grupo) => (
              <section key={grupo.slug} id={grupo.slug} className="scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl">{grupo.titulo}</h2>
                <div className="mt-6 divide-y divide-line border-y border-line">
                  {grupo.preguntas.map((p) => (
                    <details key={p.pregunta} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold marker:content-none">
                        {p.pregunta}
                        <Icon
                          nombre="chevron"
                          className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-90"
                        />
                      </summary>
                      <p className="pb-5 pr-10 leading-relaxed text-ink-2">
                        {p.respuesta}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rw-cut grid gap-6 bg-navy p-8 text-on-navy ring-1 ring-inset ring-line-navy lg:grid-cols-[1.3fr_1fr] lg:items-center sm:p-10">
            <div>
              <h2 className="text-3xl">¿No resolvimos tu duda?</h2>
              <p className="mt-3 max-w-xl text-on-navy-2">
                Escríbenos a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-brand-soft underline decoration-2 underline-offset-4"
                >
                  {site.email}
                </a>{" "}
                o llámanos al{" "}
                <a
                  href={`tel:${site.telefonoLink}`}
                  className="font-semibold text-brand-soft underline decoration-2 underline-offset-4"
                >
                  {site.telefono}
                </a>
                . {site.horario}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/contacto" tamano="lg">
                Ir a contacto
              </Button>
            </div>
          </div>

          <p className="mt-8 text-sm text-ink-3">
            ¿Buscas el detalle del modelo de membresías y créditos? Está en{" "}
            <Link
              href="/planes"
              className="font-semibold text-brand-ink underline decoration-2 underline-offset-4"
            >
              planes
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}

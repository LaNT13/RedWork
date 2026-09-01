import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  FotoPendiente,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Spotlight } from "@/components/ui/Spotlight";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog · Guías de precios y mantenimiento",
  description:
    "Guías prácticas de RedWork: cuánto cuestan los trabajos más comunes en CDMX, cómo verificar a un profesional, mantenimiento antes de lluvias y cómo funcionan los créditos.",
  alternates: { canonical: "/blog" },
};

function formatoFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [destacado, ...resto] = posts;

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Blog"
            titulo="Precios, mantenimiento y cómo no equivocarte"
            texto="Guías escritas para que llegues a una cotización sabiendo qué preguntar. Sin relleno y con números de referencia de la CDMX y el Estado de México."
          />
        </Container>
      </Section>

      {destacado ? (
        <Section espaciado="continuacion">
          <Container>
            <article className="rw-cut grid gap-0 overflow-hidden bg-surface ring-1 ring-inset ring-line lg:grid-cols-2">
              <FotoPendiente
                etiqueta={destacado.titulo}
                ratio="16 / 10"
                className="h-full"
              />
              <div className="p-6 sm:p-9">
                <p className="flex flex-wrap items-center gap-3 text-sm text-ink-3">
                  <Badge tono="brand">{destacado.categoria}</Badge>
                  <time dateTime={destacado.fecha}>
                    {formatoFecha(destacado.fecha)}
                  </time>
                  <span>· {destacado.minutosLectura} min de lectura</span>
                </p>
                <h2 className="mt-4 text-2xl sm:text-3xl">
                  <Link
                    href={`/blog/${destacado.slug}`}
                    className="hover:text-brand-ink"
                  >
                    {destacado.titulo}
                  </Link>
                </h2>
                <p className="mt-4 leading-relaxed text-ink-2">
                  {destacado.resumen}
                </p>
                <p className="mt-6">
                  <Link
                    href={`/blog/${destacado.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-brand-ink underline decoration-2 underline-offset-4"
                  >
                    Leer la guía
                    <Icon nombre="flecha" className="h-4 w-4" />
                  </Link>
                </p>
              </div>
            </article>
          </Container>
        </Section>
      ) : null}

      <Section tono="superficie">
        <Container>
          <h2 className="sr-only">Todas las entradas</h2>
          <Spotlight as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((post) => (
              <li
                key={post.slug}
                data-spotlight
                className="rw-spotlight rw-elevar flex flex-col overflow-hidden bg-bg ring-1 ring-inset ring-line hover:ring-brand/35"
              >
                <FotoPendiente etiqueta={post.titulo} ratio="16 / 9" />
                <article className="flex flex-1 flex-col p-5">
                  <p className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
                    <Badge tono="neutro">{post.categoria}</Badge>
                    <time dateTime={post.fecha}>
                      {formatoFecha(post.fecha)}
                    </time>
                  </p>
                  <h3 className="mt-3 font-display text-lg font-extrabold leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-brand-ink"
                    >
                      {post.titulo}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
                    {post.resumen}
                  </p>
                  <p className="mt-4 text-xs text-ink-3">
                    {post.minutosLectura} min de lectura
                  </p>
                </article>
              </li>
            ))}
          </Spotlight>
        </Container>
      </Section>
    </>
  );
}

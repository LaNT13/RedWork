import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownLigero } from "@/components/MarkdownLigero";
import { Button } from "@/components/ui/Button";
import {
  Badge,
  Container,
  FotoPendiente,
  Section,
} from "@/components/ui/Primitivos";
import { getPost, getPosts, getPostsRelacionados } from "@/lib/data";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.titulo,
    description: post.resumen,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.titulo,
      description: post.resumen,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.fecha,
      modifiedTime: post.actualizado ?? post.fecha,
      authors: [post.autor],
    },
  };
}

function formatoFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relacionados = await getPostsRelacionados(slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.titulo,
          description: post.resumen,
          inLanguage: "es-MX",
          datePublished: post.fecha,
          dateModified: post.actualizado ?? post.fecha,
          articleSection: post.categoria,
          author: { "@type": "Organization", name: post.autor, url: site.url },
          publisher: {
            "@type": "Organization",
            name: site.nombre,
            url: site.url,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${site.url}/blog/${post.slug}`,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${site.url}/blog`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.titulo,
              item: `${site.url}/blog/${post.slug}`,
            },
          ],
        }}
      />

      <Section espaciado="cabecera">
        <Container>
          <nav aria-label="Ruta de navegación" className="mb-6 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-ink-3">
              <li>
                <Link href="/" className="hover:text-ink">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-ink">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>

          <article>
            <header className="mx-auto max-w-3xl">
              <p className="flex flex-wrap items-center gap-3 text-sm text-ink-3">
                <Badge tono="brand">{post.categoria}</Badge>
                <time dateTime={post.fecha}>{formatoFecha(post.fecha)}</time>
                <span>· {post.minutosLectura} min de lectura</span>
              </p>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                {post.titulo}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">
                {post.resumen}
              </p>
              <p className="mt-5 border-t border-line pt-4 text-sm text-ink-3">
                Por {post.autor}
                {post.actualizado ? (
                  <>
                    {" · Actualizado el "}
                    <time dateTime={post.actualizado}>
                      {formatoFecha(post.actualizado)}
                    </time>
                  </>
                ) : null}
              </p>
            </header>

            <div className="mx-auto mt-8 max-w-3xl">
              <FotoPendiente etiqueta={post.titulo} ratio="16 / 9" />
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-[1.05rem]">
              <MarkdownLigero contenido={post.cuerpo} />
            </div>

            <aside className="rw-cut mx-auto mt-12 max-w-3xl bg-surface p-6 ring-1 ring-inset ring-line sm:p-8">
              <h2 className="text-xl">¿Necesitas resolverlo ya?</h2>
              <p className="mt-2 text-ink-2">
                Pide cotización a profesionales verificados con INE de tu
                alcaldía o municipio. Para el cliente, cotizar no tiene costo.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/servicios">Buscar profesional</Button>
                <Button href="/como-funciona" variante="contorno">
                  Cómo funciona
                </Button>
              </div>
            </aside>
          </article>
        </Container>
      </Section>

      {relacionados.length ? (
        <Section tono="superficie">
          <Container>
            <h2 className="text-2xl">Sigue leyendo</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {relacionados.map((r) => (
                <li
                  key={r.slug}
                  className="bg-bg p-5 ring-1 ring-inset ring-line"
                >
                  <p className="text-xs text-ink-3">{r.categoria}</p>
                  <h3 className="mt-2 font-display text-base font-extrabold leading-snug">
                    <Link href={`/blog/${r.slug}`} className="hover:text-brand-ink">
                      {r.titulo}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-ink-2">{r.resumen}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

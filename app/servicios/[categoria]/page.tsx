import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuscadorServicios } from "@/components/BuscadorServicios";
import { JsonLd } from "@/components/JsonLd";
import { PasosProceso } from "@/components/PasosProceso";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import {
  getCategoria,
  getCategorias,
  getProfesionales,
  getProveedores,
  getTrabajos,
  getUbicaciones,
  getZonas,
} from "@/lib/data";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria: slug } = await params;
  const categoria = await getCategoria(slug);
  if (!categoria) return {};

  const titulo =
    categoria.tipo === "material"
      ? `${categoria.nombre} en CDMX y Edomex · Proveedores verificados`
      : `${categoria.nombre} en CDMX y Edomex · Profesionales verificados`;

  return {
    title: titulo,
    description: categoria.descripcion.slice(0, 300),
    alternates: { canonical: `/servicios/${categoria.slug}` },
    openGraph: {
      title: `${titulo} · RedWork`,
      description: categoria.descripcion.slice(0, 300),
      url: `${site.url}/servicios/${categoria.slug}`,
    },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria: slug } = await params;
  const categoria = await getCategoria(slug);
  if (!categoria) notFound();

  const esMaterial = categoria.tipo === "material";
  const [todas, ubicaciones, zonas, profesionales, proveedores, trabajos] =
    await Promise.all([
      getCategorias(),
      getUbicaciones(),
      getZonas(),
      getProfesionales({ categoria: slug }),
      getProveedores(),
      getTrabajos({ categoria: slug }),
    ]);

  const relacionadas = todas
    .filter((c) => c.slug !== slug && c.tipo === categoria.tipo && c.activa)
    .slice(0, 5);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: categoria.nombre,
          name: `${categoria.nombre} en CDMX y Estado de México`,
          description: categoria.descripcion,
          provider: {
            "@type": "Organization",
            name: site.nombre,
            url: site.url,
          },
          areaServed: zonas.map((z) => ({
            "@type": "AdministrativeArea",
            name: z.nombre,
          })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Trabajos de ${categoria.nombre.toLowerCase()}`,
            itemListElement: categoria.trabajos.map((t) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: t },
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Inicio",
              item: site.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Servicios",
              item: `${site.url}/servicios`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: categoria.nombre,
              item: `${site.url}/servicios/${categoria.slug}`,
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
                <Link href="/servicios" className="hover:text-ink">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink">{categoria.nombre}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rw-cut-sm grid h-12 w-12 place-items-center bg-brand text-white">
                  <Icon nombre={categoria.icono} className="h-6 w-6" />
                </span>
                {categoria.activa ? (
                  <Badge tono="verde">
                    <Icon nombre="escudo" className="h-3.5 w-3.5" />
                    Categoría activa
                  </Badge>
                ) : (
                  <Badge tono="neutro">En incorporación</Badge>
                )}
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl">
                {categoria.nombre}{" "}
                <span className="text-brand">en CDMX y Edomex</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">
                {categoria.descripcion}
              </p>

              {categoria.precioDesde ? (
                <p className="mt-5 inline-flex flex-wrap items-baseline gap-2 bg-surface px-4 py-3 text-sm ring-1 ring-inset ring-line">
                  <span className="text-ink-3">Precio de referencia desde</span>
                  <span className="font-display text-xl font-black text-brand">
                    ${categoria.precioDesde} MXN
                  </span>
                  <span className="text-ink-3">
                    · es una referencia para comparar, no una cotización
                  </span>
                </p>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href={`/buscar?q=${encodeURIComponent(categoria.nombre)}`}
                  tamano="lg"
                >
                  {esMaterial ? "Buscar proveedores" : "Buscar profesionales"}
                </Button>
                <Button href="/como-funciona" variante="contorno" tamano="lg">
                  Cómo funciona
                </Button>
              </div>
            </div>

            <div className="rw-cut bg-surface p-6 ring-1 ring-inset ring-line">
              <h2 className="text-xl">
                {esMaterial
                  ? "Qué puedes surtir"
                  : `Qué cubre ${categoria.nombre.toLowerCase()}`}
              </h2>
              <ul className="mt-4 space-y-3">
                {categoria.trabajos.map((t) => (
                  <li key={t} className="flex gap-3 text-ink-2">
                    <Icon
                      nombre="check"
                      className="mt-1 h-4 w-4 shrink-0 text-verde"
                    />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-sm text-ink-3">
                ¿No ves lo que necesitas? Descríbelo en la búsqueda: el
                profesional te dirá si lo cubre antes de cotizar.
              </p>
            </div>
          </div>

          <BuscadorServicios
            className="mt-10"
            compacto
            valorInicial={categoria.nombre}
            categorias={todas.map((c) => ({ valor: c.slug, etiqueta: c.nombre }))}
            ubicaciones={ubicaciones}
          />
        </Container>
      </Section>

      {/* Directorio de ejemplo */}
      <Section tono="superficie">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={esMaterial ? "Proveedores" : "Profesionales"}
              titulo={
                esMaterial
                  ? "Proveedores en la red"
                  : `Perfiles de ${categoria.nombre.toLowerCase()}`
              }
              texto="Cada perfil pasó validación de INE, reconocimiento facial y comprobante de domicilio antes de poder operar."
            />
            <Badge tono="neutro">Datos de ejemplo</Badge>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(esMaterial ? proveedores : profesionales).map((p) => (
              <li
                key={p.id}
                className="flex gap-4 bg-bg p-5 ring-1 ring-inset ring-line"
              >
                <span
                  role="img"
                  aria-label="Espacio reservado para la fotografía del perfil"
                  className="rw-cut-sm grid h-14 w-14 shrink-0 place-items-center bg-surface-2 font-display text-lg font-black text-ink-3"
                >
                  {p.iniciales}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-display text-base font-extrabold">
                    {"negocio" in p ? p.negocio : p.nombre}
                    {p.verificado ? (
                      <Icon
                        nombre="escudo"
                        titulo="Perfil verificado"
                        className="h-4 w-4 text-verde"
                      />
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-ink-3">{p.zona}</p>
                  {"calificacion" in p ? (
                    <p className="mt-2 text-sm text-ink-2">
                      <span className="font-semibold text-ink">
                        {p.calificacion.toFixed(1)}
                      </span>{" "}
                      · {p.totalResenas} calificaciones ·{" "}
                      {p.trabajosCompletados} trabajos
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-ink-2">
                      {p.materiales.join(" · ")}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {(esMaterial ? proveedores : profesionales).length === 0 ? (
            <p className="mt-8 bg-bg p-6 text-ink-2 ring-1 ring-inset ring-line">
              Todavía no hay perfiles publicados en esta categoría. Pide tu
              cotización y te avisamos en cuanto haya profesionales disponibles
              en tu zona.
            </p>
          ) : null}

          <p className="mt-6 text-sm text-ink-3">
            Los perfiles mostrados son de ejemplo mientras se conecta la API.
            Las fotografías se sustituirán por fotografía real; no se usan
            retratos generados.
          </p>
        </Container>
      </Section>

      {/* Trabajos de esta categoría */}
      {trabajos.length ? (
        <Section>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Trabajos realizados"
                titulo={`${categoria.nombre} en la red`}
                texto="Trabajos terminados por profesionales de RedWork en la zona."
              />
              <Button
                href={`/trabajos-realizados?categoria=${categoria.slug}`}
                variante="contorno"
              >
                Ver la galería
              </Button>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trabajos.slice(0, 3).map((t) => (
                <li
                  key={t.id}
                  className="bg-surface p-5 ring-1 ring-inset ring-line"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">
                    {t.zona}
                  </p>
                  <p className="mt-2 font-display text-lg font-extrabold leading-snug">
                    {t.titulo}
                  </p>
                  <p className="mt-2 text-sm text-ink-2">{t.descripcion}</p>
                  <p className="mt-3 text-sm text-ink-3">
                    Duración: {t.duracion}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section tono="superficie">
        <Container>
          <SectionHeading
            centrado
            eyebrow="Cómo funciona"
            titulo={`Pedir ${categoria.nombre.toLowerCase()} en RedWork`}
          />
          <div className="mt-10">
            <PasosProceso />
          </div>

          {relacionadas.length ? (
            <div className="mt-14">
              <h2 className="text-xl">Otras categorías</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {relacionadas.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/servicios/${c.slug}`}
                      className="inline-flex items-center gap-2 bg-bg px-4 py-2 text-sm font-medium text-ink-2 ring-1 ring-inset ring-line transition-colors hover:text-brand-ink"
                    >
                      <Icon nombre={c.icono} className="h-4 w-4" />
                      {c.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}

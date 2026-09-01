import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  FotoPendiente,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Spotlight } from "@/components/ui/Spotlight";
import { getCategorias, getTrabajos } from "@/lib/data";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Trabajos realizados en CDMX y Edomex",
  description:
    "Galería de trabajos terminados por profesionales verificados de RedWork: impermeabilización, electricidad, plomería, pintura, construcción y entregas de material, por categoría y zona.",
  alternates: { canonical: "/trabajos-realizados" },
};

/* Los filtros son enlaces con query, no estado de cliente: funcionan sin
   JavaScript, se pueden compartir y quedan indexables. */
function Filtro({
  href,
  activo,
  children,
}: {
  href: string;
  activo: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={activo ? "true" : undefined}
      className={cn(
        "rw-cut-sm inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-colors",
        activo
          ? "bg-brand text-white"
          : "bg-bg text-ink-2 ring-1 ring-inset ring-line hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

export default async function TrabajosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; zona?: string }>;
}) {
  const { categoria = "", zona = "" } = await searchParams;
  const [categorias, todos] = await Promise.all([
    getCategorias(),
    getTrabajos(),
  ]);

  const trabajos = await getTrabajos({
    categoria: categoria || undefined,
    zona: zona || undefined,
  });

  const conTrabajos = categorias.filter((c) =>
    todos.some((t) => t.categoria === c.slug),
  );
  const zonasDisponibles = Array.from(new Set(todos.map((t) => t.zona))).sort();

  const nombreCategoria = (slug: string) =>
    categorias.find((c) => c.slug === slug)?.nombre ?? slug;

  const qs = (params: { categoria?: string; zona?: string }) => {
    const sp = new URLSearchParams();
    if (params.categoria) sp.set("categoria", params.categoria);
    if (params.zona) sp.set("zona", params.zona);
    const s = sp.toString();
    return s ? `/trabajos-realizados?${s}` : "/trabajos-realizados";
  };

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Trabajos realizados"
            titulo="Lo que ya se resolvió en la red"
            texto="Trabajos terminados por profesionales y proveedores verificados de RedWork. Cada uno se califica al cerrar, y ese historial lo escriben los clientes."
          />
        </Container>
      </Section>

      <Section tono="superficie" espaciado="continuacion">
        <Container>
          {/* Filtros */}
          <div className="space-y-4">
            <div>
              <p
                id="filtro-categoria"
                className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-3"
              >
                Categoría
              </p>
              <ul
                aria-labelledby="filtro-categoria"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              >
                <li>
                  <Filtro href={qs({ zona })} activo={!categoria}>
                    Todas
                  </Filtro>
                </li>
                {conTrabajos.map((c) => (
                  <li key={c.slug}>
                    <Filtro
                      href={qs({ categoria: c.slug, zona })}
                      activo={categoria === c.slug}
                    >
                      <Icon nombre={c.icono} className="h-4 w-4" />
                      {c.nombre}
                    </Filtro>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                id="filtro-zona"
                className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-3"
              >
                Zona
              </p>
              <ul
                aria-labelledby="filtro-zona"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              >
                <li>
                  <Filtro href={qs({ categoria })} activo={!zona}>
                    Toda la cobertura
                  </Filtro>
                </li>
                {zonasDisponibles.map((z) => (
                  <li key={z}>
                    <Filtro
                      href={qs({ categoria, zona: z })}
                      activo={zona === z}
                    >
                      {z}
                    </Filtro>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p aria-live="polite" className="mt-8 text-sm text-ink-3">
            {trabajos.length}{" "}
            {trabajos.length === 1 ? "trabajo" : "trabajos"}
            {categoria ? ` de ${nombreCategoria(categoria)}` : ""}
            {zona ? ` en ${zona}` : ""}.
          </p>

          {trabajos.length ? (
            <Spotlight as="ul" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trabajos.map((t) => (
                <li
                  key={t.id}
                  data-spotlight
                  className="rw-spotlight rw-elevar flex flex-col overflow-hidden bg-bg ring-1 ring-inset ring-line hover:ring-brand/35"
                >
                  <FotoPendiente etiqueta={`${t.titulo} — ${t.zona}`} />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
                      <Badge tono="neutro">
                        {nombreCategoria(t.categoria)}
                      </Badge>
                      <time dateTime={t.fecha}>
                        {new Date(t.fecha).toLocaleDateString("es-MX", {
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </p>
                    <h2 className="mt-3 font-display text-lg font-extrabold leading-snug">
                      {t.titulo}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
                      {t.descripcion}
                    </p>
                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-4 text-sm">
                      <div className="flex gap-1.5">
                        <dt className="text-ink-3">Zona:</dt>
                        <dd className="text-ink-2">{t.zona}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-ink-3">Duración:</dt>
                        <dd className="text-ink-2">{t.duracion}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </Spotlight>
          ) : (
            <div className="rw-cut mt-6 bg-bg p-8 text-center ring-1 ring-inset ring-line">
              <h2 className="text-xl">Sin trabajos con esos filtros</h2>
              <p className="mt-2 text-ink-2">
                Prueba con otra categoría o quita el filtro de zona.
              </p>
              <div className="mt-5">
                <Button href="/trabajos-realizados" variante="contorno">
                  Ver todos
                </Button>
              </div>
            </div>
          )}

          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-3">
            Las fotografías de esta galería están pendientes: se publicarán
            fotos reales de obra, autorizadas por el cliente y el profesional.
            No usamos imágenes generadas ni fotografía de banco presentada como
            trabajo propio.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rw-cut grid gap-6 bg-surface p-8 ring-1 ring-inset ring-line lg:grid-cols-[1.3fr_1fr] lg:items-center sm:p-10">
            <div>
              <h2 className="text-3xl">¿Tienes un trabajo parecido?</h2>
              <p className="mt-3 max-w-xl text-ink-2">
                Describe lo que necesitas y recibe cotizaciones de profesionales
                verificados de tu alcaldía o municipio. Para el cliente, cotizar
                no tiene costo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/servicios" tamano="lg">
                Buscar profesional o proveedor
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

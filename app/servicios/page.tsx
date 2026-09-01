import type { Metadata } from "next";
import Link from "next/link";
import { BuscadorServicios } from "@/components/BuscadorServicios";
import { CategoriaCard } from "@/components/CategoriaCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { getCategorias, getUbicaciones, getZonas } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servicios de construcción y mantenimiento en CDMX y Edomex",
  description:
    "Todas las categorías de RedWork: plomería, electricidad, impermeabilización, pintura, construcción, albañilería, limpieza, mantenimiento y materiales, con profesionales verificados con INE.",
  alternates: { canonical: "/servicios" },
};

export default async function ServiciosPage({
  searchParams,
}: {
  searchParams: Promise<{ urgente?: string }>;
}) {
  const { urgente } = await searchParams;
  const [categorias, ubicaciones, zonas] = await Promise.all([
    getCategorias(),
    getUbicaciones(),
    getZonas(),
  ]);

  const servicios = categorias.filter((c) => c.tipo === "servicio");
  const activos = servicios.filter((c) => c.activa);
  const proximos = servicios.filter((c) => !c.activa);
  const materiales = categorias.filter((c) => c.tipo === "material");

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Servicios"
            titulo="¿Qué necesitas resolver?"
            texto="Elige la categoría y tu alcaldía o municipio. Te conectamos con profesionales verificados con INE y con proveedores de materiales de esa zona. Cotizar es gratis para el cliente."
          />

          {urgente ? (
            <div className="rw-cut mt-8 flex flex-wrap items-center gap-4 bg-brand/10 p-5 ring-1 ring-inset ring-brand/30">
              <Icon nombre="rayo" className="h-6 w-6 shrink-0 text-brand" />
              <div className="flex-1">
                <p className="font-display text-lg font-extrabold">
                  ¿Es una emergencia?
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  Publica el trabajo con hasta 3 fotos del problema. Hasta 5
                  profesionales de tu zona desbloquean tu contacto y te llaman
                  directo con un presupuesto. Para ti no tiene costo.
                </p>
              </div>
              <Button href="/contacto?motivo=urgente">
                Publicar trabajo urgente
              </Button>
            </div>
          ) : null}

          <BuscadorServicios
            className="mt-8"
            compacto
            categorias={categorias.map((c) => ({
              valor: c.slug,
              etiqueta: c.nombre,
            }))}
            ubicaciones={ubicaciones}
          />
        </Container>
      </Section>

      <Section tono="superficie" espaciado="continuacion">
        <Container>
          <h2 className="text-2xl sm:text-3xl">Servicios disponibles hoy</h2>
          <p className="mt-2 max-w-2xl text-ink-2">
            Categorías con profesionales activos y verificados en la
            plataforma.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activos.map((categoria) => (
              <CategoriaCard key={categoria.slug} categoria={categoria} />
            ))}
          </ul>

          <h2 className="mt-14 text-2xl sm:text-3xl">
            Materiales de construcción
          </h2>
          <p className="mt-2 max-w-2xl text-ink-2">
            Ferreterías, casas de material y distribuidores de tu zona, con
            entrega rastreada en el mapa.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {materiales.map((categoria) => (
              <CategoriaCard key={categoria.slug} categoria={categoria} />
            ))}
          </ul>

          {proximos.length ? (
            <>
              <div className="mt-14 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl sm:text-3xl">Próximas categorías</h2>
                <Badge tono="neutro">En incorporación</Badge>
              </div>
              <p className="mt-2 max-w-2xl text-ink-2">
                Oficios que estamos sumando a la red. Si trabajas en alguno,
                puedes registrarte desde ahora.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {proximos.map((categoria) => (
                  <CategoriaCard key={categoria.slug} categoria={categoria} />
                ))}
              </ul>
            </>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading
              eyebrow="Cobertura"
              titulo="Dónde opera RedWork"
              texto="16 alcaldías de la Ciudad de México y 5 municipios del Estado de México. La zona en la que aparece cada profesional depende de su plan."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {zonas.map((zona) => (
                <li
                  key={zona.slug}
                  className="bg-surface p-5 ring-1 ring-inset ring-line"
                >
                  <p className="font-display text-lg font-extrabold">
                    {zona.nombre}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {zona.municipios.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10">
            <Link
              href="/planes"
              className="inline-flex items-center gap-2 font-semibold text-brand-ink underline decoration-2 underline-offset-4"
            >
              Ver qué zonas cubre cada plan
              <Icon nombre="flecha" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

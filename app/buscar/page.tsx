import type { Metadata } from "next";
import Link from "next/link";
import { BuscadorServicios } from "@/components/BuscadorServicios";
import { CategoriaCard } from "@/components/CategoriaCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge, Container, Section } from "@/components/ui/Primitivos";
import {
  getCategorias,
  getProfesionales,
  getProveedores,
  getUbicaciones,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Resultados de búsqueda",
  description:
    "Profesionales y proveedores verificados de RedWork que coinciden con tu búsqueda en CDMX y el Estado de México.",
  /* Las páginas de resultados no aportan valor en buscadores y generan
     duplicados por combinación de parámetros. */
  robots: { index: false, follow: true },
};

/** Coincidencia laxa: ignora acentos y mayúsculas. */
function normaliza(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; zona?: string }>;
}) {
  const { q = "", zona = "" } = await searchParams;
  const [categorias, ubicaciones, profesionales, proveedores] =
    await Promise.all([
      getCategorias(),
      getUbicaciones(),
      getProfesionales(),
      getProveedores(),
    ]);

  const termino = normaliza(q.trim());

  const categoriasCoinciden = termino
    ? categorias.filter((c) => {
        const campo = normaliza(
          `${c.nombre} ${c.resumen} ${c.trabajos.join(" ")}`,
        );
        return campo.includes(termino);
      })
    : categorias.filter((c) => c.activa);

  const slugsCoinciden = new Set(categoriasCoinciden.map((c) => c.slug));

  const profesionalesCoinciden = profesionales.filter((p) => {
    const okCat =
      !termino || p.categorias.some((c) => slugsCoinciden.has(c));
    const okZona = !zona || normaliza(p.zona).includes(normaliza(zona));
    return okCat && okZona;
  });

  const proveedoresCoinciden = proveedores.filter((p) => {
    const okZona = !zona || normaliza(p.zona).includes(normaliza(zona));
    const okTermino =
      !termino ||
      normaliza(`${p.nombre} ${p.materiales.join(" ")}`).includes(termino) ||
      slugsCoinciden.has("materiales");
    return okZona && okTermino;
  });

  const hayResultados =
    categoriasCoinciden.length > 0 ||
    profesionalesCoinciden.length > 0 ||
    proveedoresCoinciden.length > 0;

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <h1 className="text-3xl sm:text-4xl">
            {q ? (
              <>
                Resultados para{" "}
                <span className="text-brand">&laquo;{q}&raquo;</span>
              </>
            ) : (
              "Buscar en RedWork"
            )}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-2">
            {zona
              ? `Mostrando disponibilidad en ${zona}.`
              : "Mostrando toda la cobertura: CDMX y municipios del Estado de México."}{" "}
            Cotizar no tiene costo para el cliente.
          </p>

          <BuscadorServicios
            className="mt-7"
            compacto
            valorInicial={q}
            zonaInicial={zona}
            categorias={categorias.map((c) => ({
              valor: c.slug,
              etiqueta: c.nombre,
            }))}
            ubicaciones={ubicaciones}
          />

          <div className="rw-cut mt-6 flex flex-wrap items-center gap-3 bg-surface p-4 text-sm ring-1 ring-inset ring-line">
            <Icon nombre="reloj" className="h-5 w-5 shrink-0 text-brand" />
            <p className="flex-1 text-ink-2">
              Esta pantalla ya arma la consulta ({q ? `q=${q}` : "sin término"}
              {zona ? `, zona=${zona}` : ""}) y filtra sobre datos de ejemplo.
              Al conectar la API de búsqueda solo cambia la fuente de datos.
            </p>
          </div>
        </Container>
      </Section>

      {!hayResultados ? (
        <Section tono="superficie">
          <Container>
            <div className="rw-cut mx-auto max-w-xl bg-bg p-8 text-center ring-1 ring-inset ring-line">
              <h2 className="text-2xl">Sin coincidencias</h2>
              <p className="mt-3 text-ink-2">
                No encontramos categorías ni perfiles para esa búsqueda.
                Describe el problema con otras palabras, o cuéntanos qué
                necesitas y te ayudamos a encontrar al profesional adecuado.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/servicios">Ver todas las categorías</Button>
                <Button href="/contacto" variante="contorno">
                  Escríbenos
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      ) : (
        <Section tono="superficie">
          <Container>
            {categoriasCoinciden.length ? (
              <>
                <h2 className="text-2xl">
                  Categorías ({categoriasCoinciden.length})
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {categoriasCoinciden.map((c) => (
                    <CategoriaCard key={c.slug} categoria={c} />
                  ))}
                </ul>
              </>
            ) : null}

            {profesionalesCoinciden.length ? (
              <>
                <div className="mt-14 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl">
                    Profesionales ({profesionalesCoinciden.length})
                  </h2>
                  <Badge tono="neutro">Datos de ejemplo</Badge>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {profesionalesCoinciden.map((p) => (
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
                        <p className="font-display text-base font-extrabold">
                          {p.negocio}
                        </p>
                        <p className="mt-1 text-sm text-ink-3">{p.zona}</p>
                        <p className="mt-2 text-sm text-ink-2">
                          {p.calificacion.toFixed(1)} · {p.totalResenas}{" "}
                          calificaciones
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {proveedoresCoinciden.length ? (
              <>
                <div className="mt-14 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl">
                    Proveedores ({proveedoresCoinciden.length})
                  </h2>
                  <Badge tono="neutro">Datos de ejemplo</Badge>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {proveedoresCoinciden.map((p) => (
                    <li
                      key={p.id}
                      className="bg-bg p-5 ring-1 ring-inset ring-line"
                    >
                      <p className="font-display text-base font-extrabold">
                        {p.nombre}
                      </p>
                      <p className="mt-1 text-sm text-ink-3">{p.zona}</p>
                      <p className="mt-2 text-sm text-ink-2">
                        {p.materiales.join(" · ")}
                      </p>
                      {p.entregaMismoDia ? (
                        <p className="mt-3">
                          <Badge tono="verde">Entrega el mismo día</Badge>
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="mt-12 text-sm text-ink-3">
              ¿No encuentras lo que buscas?{" "}
              <Link
                href="/contacto"
                className="font-semibold text-brand-ink underline decoration-2 underline-offset-4"
              >
                Cuéntanos qué necesitas
              </Link>
              .
            </p>
          </Container>
        </Section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Spotlight } from "@/components/ui/Spotlight";
import {
  getComparativaPlanes,
  getPaquetesCreditos,
  getPlanCliente,
  getPlanes,
  getZonas,
} from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Planes, membresías y créditos",
  description:
    "Para clientes RedWork es gratis siempre. Membresías anuales para profesionales y proveedores desde $299 MXN y paquetes de créditos para trabajos urgentes desde $99 MXN.",
  alternates: { canonical: "/planes" },
};

export default async function PlanesPage() {
  const [planes, planCliente, paquetes, comparativa, zonas] =
    await Promise.all([
      getPlanes(),
      getPlanCliente(),
      getPaquetesCreditos(),
      getComparativaPlanes(),
      getZonas(),
    ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Planes de membresía de RedWork",
          itemListElement: planes.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Offer",
              name: `Membresía ${p.nombre}`,
              description: p.tagline,
              price: String(p.precioAnual),
              priceCurrency: p.moneda,
              url: `${site.url}/planes`,
              category: "Membresía anual",
              seller: { "@type": "Organization", name: site.nombre },
            },
          })),
        }}
      />

      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            centrado
            nivel={1}
            eyebrow="Planes"
            titulo="Gratis para clientes. Por zona para quien trabaja."
            texto="Buscar, cotizar y seguir tu servicio nunca le cuesta al cliente. Profesionales y proveedores pagan una membresía anual según la zona que quieren cubrir, y créditos solo si quieren tomar trabajos urgentes."
          />
        </Container>
      </Section>

      {/* Plan cliente */}
      <Section espaciado="continuacion">
        <Container>
          <div className="rw-cut grid gap-6 bg-verde-soft p-6 ring-1 ring-inset ring-verde/25 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <Badge tono="verde">
                <Icon nombre="check" className="h-3.5 w-3.5" />
                Plan Cliente
              </Badge>
              <p className="mt-4 font-display text-5xl font-black text-verde">
                $0
              </p>
              <p className="mt-1 text-ink-2">{planCliente.tagline}</p>
              <div className="mt-6">
                <Button href="/contacto?motivo=cliente" variante="navy">
                  {planCliente.cta}
                </Button>
              </div>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {planCliente.beneficios.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-ink-2">
                  <Icon
                    nombre="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-verde"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Membresías */}
      <Section tono="superficie">
        <Container>
          <SectionHeading
            eyebrow="Membresías anuales"
            titulo="Para profesionales y proveedores"
            texto="Todas incluyen perfil verificado con INE. Lo que cambia es la zona de cobertura y la visibilidad en las búsquedas."
          />

          <Spotlight
            as="ul"
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {planes.map((plan) => (
              <li
                key={plan.slug}
                data-spotlight
                className={
                  plan.popular
                    ? "rw-cut rw-spotlight rw-elevar relative flex flex-col overflow-hidden bg-bg p-6 ring-2 ring-inset ring-brand"
                    : "rw-cut rw-spotlight rw-elevar relative flex flex-col overflow-hidden bg-bg p-6 ring-1 ring-inset ring-line hover:ring-brand/35"
                }
              >
                {plan.popular ? (
                  <span className="absolute right-0 top-0 bg-brand px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">
                    Popular
                  </span>
                ) : null}
                <h3 className="text-xl">{plan.nombre}</h3>
                <p className="mt-1 text-sm text-ink-3">{plan.tagline}</p>
                <p className="mt-4">
                  <span className="font-display text-4xl font-black text-brand">
                    ${plan.precioAnual}
                  </span>
                  <span className="ml-1 text-sm text-ink-3">
                    {plan.moneda} / año
                  </span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.beneficios.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-ink-2">
                      <Icon
                        nombre="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-verde"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    href={`/contacto?motivo=plan-${plan.slug}`}
                    variante={plan.popular ? "primario" : "contorno"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </li>
            ))}
          </Spotlight>

          {/* Comparativa */}
          <h3 className="mt-16 text-2xl">Qué cubre cada plan</h3>
          <p className="mt-2 text-sm text-ink-3 md:hidden">
            Desliza la tabla para ver los cuatro planes.
          </p>
          {/* Márgenes negativos en móvil: el scroll llega al borde de la
              pantalla en vez de cortarse dentro del contenedor. */}
          <div className="-mx-5 mt-6 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <table className="w-full min-w-[42rem] border-collapse text-sm">
              <caption className="sr-only">
                Comparativa de características por plan de membresía
              </caption>
              <thead>
                <tr className="border-b border-line-strong text-left">
                  <th scope="col" className="py-3 pr-4 font-display">
                    Característica
                  </th>
                  {planes.map((p) => (
                    <th
                      key={p.slug}
                      scope="col"
                      className="py-3 pr-4 font-display"
                    >
                      {p.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativa.map((fila) => (
                  <tr
                    key={fila.caracteristica}
                    className="border-b border-line"
                  >
                    <th
                      scope="row"
                      className="py-3 pr-4 text-left font-medium text-ink-2"
                    >
                      {fila.caracteristica}
                    </th>
                    {planes.map((p) => (
                      <td key={p.slug} className="py-3 pr-4 text-ink">
                        {fila.valores[p.slug] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Créditos */}
      <Section tono="navy" id="creditos">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              tono="navy"
              eyebrow="Créditos"
              titulo="Se compran aparte, y solo si los necesitas"
              texto="Los créditos sirven para desbloquear trabajos urgentes: 1 crédito abre las fotos del problema y el teléfono del cliente. No caducan con el plan y son independientes de la membresía."
            />
            <div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {paquetes.map((p) => (
                  <li
                    key={p.creditos}
                    className="rw-cut-sm bg-on-navy/[0.07] p-5 text-center ring-1 ring-inset ring-line-navy"
                  >
                    <p className="font-display text-3xl font-black text-on-navy">
                      {p.creditos}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-on-navy-2">
                      créditos
                    </p>
                    <p className="mt-3 font-display text-xl font-black text-brand-soft">
                      ${p.precio}
                    </p>
                    <p className="text-xs text-on-navy-2">{p.moneda}</p>
                    <p className="mt-3 border-t border-line-navy pt-3 text-xs text-on-navy-2">
                      Premium: ${Math.round(p.precio / 2)} {p.moneda}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-on-navy-2">
                Con el plan Premium, todos los paquetes tienen 50% de descuento.
              </p>
              <div className="mt-6">
                <Button href="/contacto?motivo=creditos" tamano="lg">
                  Comprar créditos
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Zonas */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Cobertura"
            titulo="Zonas incluidas"
            texto="La zona de tu plan define en qué búsquedas apareces."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {zonas.map((z) => (
              <li
                key={z.slug}
                className="bg-surface p-5 ring-1 ring-inset ring-line"
              >
                <p className="font-display text-3xl font-black text-brand">
                  {String(z.municipios.length).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display text-base font-extrabold">
                  {z.nombre}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {z.municipios.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-3">
            ¿Dudas sobre qué plan te conviene?{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-ink underline decoration-2 underline-offset-4"
            >
              Escríbenos
            </a>{" "}
            y te ayudamos a elegir.
          </p>
        </Container>
      </Section>
    </>
  );
}

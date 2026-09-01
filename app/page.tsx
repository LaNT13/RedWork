import type { Metadata } from "next";
import Link from "next/link";
import { BuscadorServicios } from "@/components/BuscadorServicios";
import { CategoriaCard } from "@/components/CategoriaCard";
import { EtapasVerificacion } from "@/components/EtapasVerificacion";
import { JsonLd } from "@/components/JsonLd";
import { PasosProceso } from "@/components/PasosProceso";
import { WidgetTracking } from "@/components/home/WidgetTracking";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Spotlight } from "@/components/ui/Spotlight";
import {
  getCategorias,
  getMetricasRed,
  getPaquetesCreditos,
  getPlanes,
  getUbicaciones,
} from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "RedWork · Profesionales y proveedores verificados en CDMX y Edomex",
  description:
    "Encuentra electricistas, plomeros, pintores, albañiles e impermeabilizadores verificados con INE, y proveedores de materiales, en CDMX y municipios del Estado de México. Cotiza gratis y sigue tu servicio con GPS en tiempo real.",
  alternates: { canonical: "/" },
};

const beneficios = [
  "Sin costo para clientes",
  "Geolocalización en tiempo real",
  "Cotizaciones inmediatas",
  "Materiales y servicios",
];

export default async function Home() {
  const [categorias, ubicaciones, metricas, planes, paquetes] =
    await Promise.all([
      getCategorias(),
      getUbicaciones(),
      getMetricasRed(),
      getPlanes(),
      getPaquetesCreditos(),
    ]);

  const destacadas = categorias.filter((c) => c.activa).slice(0, 8);
  const materiales = categorias.find((c) => c.slug === "materiales");
  const planPopular = planes.find((p) => p.popular) ?? planes[0];
  const paqueteBase = paquetes[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.nombre,
          url: site.url,
          inLanguage: "es-MX",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${site.url}/buscar?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-bg">
        {/* Trama de fondo: sugiere plano de obra sin robar contraste. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(33_31_27_/_0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(33_31_27_/_0.045)_1px,transparent_1px)] bg-[size:56px_56px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
        />

        <Container className="relative py-12 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="min-w-0">
              <Badge tono="verde">
                <Icon nombre="escudo" className="h-3.5 w-3.5" />
                Verificados con INE · Cobertura CDMX y Edomex
              </Badge>

              <h1 className="mt-5 text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-[3.75rem]">
                Encuentra profesionales y proveedores{" "}
                <span className="relative inline-block text-brand">
                  de confianza
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1.5 bg-brand/25"
                  />
                </span>
                .
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
                Construcción, impermeabilización, mantenimiento y más. Te
                conectamos con profesionales verificados y con proveedores de
                materiales de la CDMX y municipios del Estado de México, con
                seguimiento en tiempo real hasta tu domicilio.
              </p>

              <BuscadorServicios
                className="mt-7"
                categorias={categorias.map((c) => ({
                  valor: c.slug,
                  etiqueta: c.nombre,
                }))}
                ubicaciones={ubicaciones}
              />

              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Link
                  href="/servicios?urgente=1"
                  className="inline-flex items-center gap-2 font-semibold text-brand-ink underline decoration-2 underline-offset-4 hover:text-brand-dark"
                >
                  <Icon nombre="rayo" className="h-4 w-4" />
                  Tengo una emergencia
                </Link>
                <Link
                  href="/profesionales"
                  className="inline-flex items-center gap-2 font-semibold text-ink-2 underline decoration-line-strong decoration-2 underline-offset-4 hover:text-ink"
                >
                  <Icon nombre="usuario" className="h-4 w-4" />
                  Soy profesional o proveedor
                </Link>
              </p>

              <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {beneficios.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-sm font-medium text-ink-2"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-verde-soft text-verde">
                      <Icon nombre="check" className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 lg:pl-4">
              <WidgetTracking />
            </div>
          </div>
        </Container>
      </section>

      {/* ================= CÓMO FUNCIONA ================= */}
      <Section tono="superficie">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="El proceso"
              titulo="Tres pasos, sin llamar a ciegas"
              texto="RedWork es el conector: tú eliges con quién trabajas y le pagas directo. Nosotros nos encargamos de que esa persona esté verificada y de que sepas por dónde viene."
            />
            <Button href="/como-funciona" variante="contorno">
              Ver el proceso completo
            </Button>
          </div>
          <div className="mt-10">
            <PasosProceso />
          </div>
        </Container>
      </Section>

      {/* ================= CATEGORÍAS ================= */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Categorías"
              titulo="Encuentra profesionales de…"
              texto="Oficios verificados para tu casa, tu local o tu obra, en las 16 alcaldías de la CDMX y 5 municipios del Estado de México."
            />
            <Button href="/servicios" variante="contorno">
              Ver todos los servicios
            </Button>
          </div>

          <Spotlight>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destacadas.map((categoria) => (
                <CategoriaCard key={categoria.slug} categoria={categoria} />
              ))}
            </ul>

            {/* Bloque de materiales: el otro lado del marketplace. */}
            {materiales ? (
            <div
              data-spotlight
              className="rw-cut rw-spotlight mt-6 grid gap-6 overflow-hidden bg-surface p-6 ring-1 ring-inset ring-line sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center"
            >
              <div>
                <Eyebrow>Proveedores</Eyebrow>
                <h3 className="text-2xl sm:text-3xl">
                  Materiales, con entrega rastreada
                </h3>
                <p className="mt-3 max-w-xl text-ink-2">
                  Cotiza con ferreterías, casas de material y distribuidores de
                  tu zona. Catálogo con precios y disponibilidad reales, y la
                  entrega se sigue en el mapa igual que un servicio.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {materiales.trabajos.map((m) => (
                    <li
                      key={m}
                      className="bg-bg px-3 py-1.5 text-sm text-ink-2 ring-1 ring-inset ring-line"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:justify-self-end">
                <Button href="/servicios/materiales" variante="navy" tamano="lg">
                  Ver proveedores de materiales
                  <Icon nombre="flecha" className="h-4 w-4" />
                </Button>
              </div>
            </div>
            ) : null}
          </Spotlight>
        </Container>
      </Section>

      {/* ================= VERIFICACIÓN ================= */}
      <Section tono="navy">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <SectionHeading
              tono="navy"
              eyebrow="Verificación de identidad"
              titulo="Sabemos quién entra a tu casa."
              texto="Antes de operar en RedWork, cada profesional, cada proveedor y cada cliente pasa por un proceso de tres etapas. Sin excepciones y sin pagar por saltarlo."
            />
            <EtapasVerificacion />
          </div>
        </Container>
      </Section>

      {/* ================= URGENTES Y CRÉDITOS ================= */}
      <Section tono="superficie">
        <Container>
          <SectionHeading
            centrado
            eyebrow="Trabajos urgentes"
            titulo="Una fuga no espera a que llames a cinco personas"
            texto="Publica la emergencia con fotos y recibe llamadas de profesionales de tu zona en minutos. Del lado del profesional, cada trabajo se desbloquea con un crédito."
          />

          <Spotlight className="mt-10 grid gap-4 lg:grid-cols-2">
            <div
              data-spotlight
              className="rw-cut rw-spotlight rw-elevar flex flex-col overflow-hidden bg-bg p-6 ring-1 ring-inset ring-line sm:p-8"
            >
              <Badge tono="brand">Si eres cliente</Badge>
              <h3 className="mt-4 text-2xl">Publica tu emergencia gratis</h3>
              <p className="mt-3 text-ink-2">
                Describe el problema y sube hasta 3 fotos. Los profesionales
                interesados desbloquean tu contacto y te llaman directo con un
                presupuesto. Sin costo y sin compromiso.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
                {[
                  "Hasta 3 fotos del problema",
                  "Máximo 5 profesionales",
                  "Llamadas directas",
                  "Sin costo para ti",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon nombre="check" className="h-4 w-4 text-verde" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-2">
                <Button href="/servicios?urgente=1" tamano="lg">
                  Publicar trabajo urgente
                </Button>
              </div>
            </div>

            <div
              data-spotlight
              className="rw-cut rw-spotlight rw-spotlight-navy rw-elevar flex flex-col overflow-hidden bg-navy p-6 text-on-navy ring-1 ring-inset ring-line-navy sm:p-8"
            >
              <Badge tono="brand" className="bg-brand/20 text-brand-soft">
                Si eres profesional
              </Badge>
              <h3 className="mt-4 text-2xl text-on-navy">
                Desbloquea con 1 crédito y llama primero
              </h3>
              <p className="mt-3 text-on-navy-2">
                Ves el servicio, la colonia y la descripción sin costo. Usas 1
                crédito y se abren las fotos y el teléfono del cliente al
                instante. Solo 5 profesionales pueden tomar cada trabajo.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {paquetes.map((p) => (
                  <div
                    key={p.creditos}
                    className="bg-on-navy/[0.07] p-3 text-center ring-1 ring-inset ring-line-navy"
                  >
                    <dt className="font-display text-xl font-black text-on-navy">
                      {p.creditos}
                    </dt>
                    <dd className="text-xs text-on-navy-2">
                      créditos · ${p.precio} {p.moneda}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-on-navy-2">
                Desde ${paqueteBase.precio} MXN el paquete de{" "}
                {paqueteBase.creditos}. Con el plan Premium, 50% de descuento en
                todos los paquetes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 pt-2">
                <Button href="/planes" variante="primario" tamano="lg">
                  Ver planes y créditos
                </Button>
                <Button href="/profesionales" variante="claro" tamano="lg">
                  Cómo funciona para mí
                </Button>
              </div>
            </div>
          </Spotlight>
        </Container>
      </Section>

      {/* ================= MÉTRICAS ================= */}
      <Section espaciado="compacto">
        <Container>
          <dl className="grid grid-cols-2 gap-px overflow-hidden bg-line lg:grid-cols-4">
            {[
              {
                valor: `+${metricas.profesionales.toLocaleString("es-MX")}`,
                etiqueta: "profesionales registrados",
              },
              {
                valor: `+${metricas.proveedores.toLocaleString("es-MX")}`,
                etiqueta: "proveedores registrados",
              },
              {
                valor: `+${metricas.serviciosCompletados.toLocaleString("es-MX")}`,
                etiqueta: "servicios completados",
              },
              {
                valor: `${metricas.satisfaccion}%`,
                etiqueta: "clientes satisfechos",
              },
            ].map((m) => (
              <div
                key={m.etiqueta}
                className="group bg-bg px-5 py-7 text-center transition-colors duration-300 hover:bg-surface"
              >
                <dt className="sr-only">{m.etiqueta}</dt>
                <dd>
                  <span className="block font-display text-3xl font-black text-brand transition-transform duration-300 ease-[var(--ease-out-rw)] group-hover:scale-105 sm:text-4xl">
                    {m.valor}
                  </span>
                  <span className="mt-1 block text-sm text-ink-2">
                    {m.etiqueta}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ================= PLANES (TEASER) ================= */}
      <Section tono="superficie">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              eyebrow="Planes y membresías"
              titulo="Para clientes es gratis. Siempre."
              texto="Buscar, cotizar y seguir tu servicio no te cuesta nada. Profesionales y proveedores eligen una membresía anual según la zona que quieren cubrir, y compran créditos solo si quieren tomar trabajos urgentes."
            />
            <Spotlight
              data-spotlight
              className="rw-cut rw-spotlight rw-elevar overflow-hidden bg-bg p-6 ring-1 ring-inset ring-line sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-3">
                    Más elegido
                  </p>
                  <p className="mt-1 font-display text-2xl font-black">
                    Plan {planPopular.nombre}
                  </p>
                </div>
                <p className="text-right">
                  <span className="font-display text-3xl font-black text-brand">
                    ${planPopular.precioAnual}
                  </span>
                  <span className="block text-xs text-ink-3">MXN / año</span>
                </p>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-2">
                {planPopular.beneficios.slice(0, 4).map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Icon
                      nombre="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-verde"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/planes">Comparar los 4 planes</Button>
                <Button href="/planes#creditos" variante="contorno">
                  Ver créditos
                </Button>
              </div>
            </Spotlight>
          </div>
        </Container>
      </Section>

      {/* ================= CTA FINAL =================
          Va en crema, no en azul: pegado al footer azul, dos bloques
          oscuros seguidos se leían como uno solo. */}
      <Section espaciado="compacto">
        <Container>
          <div className="rw-cut grid gap-8 bg-surface p-7 ring-1 ring-inset ring-line sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>Únete hoy</Eyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem]">
                ¿Eres profesional{" "}
                <span className="text-brand">o proveedor?</span>
              </h2>
              <p className="mt-4 max-w-xl text-ink-2">
                Contacta al instante con personas que están buscando en tu zona
                construcción, impermeabilización, mantenimiento, instalaciones y
                materiales. Tú eliges hasta dónde llegas y qué trabajos tomas.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Solicitudes de tu zona",
                  "Perfil verificado con INE",
                  "Cobras sin intermediarios",
                  "Trabajos urgentes con créditos",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-ink-2"
                  >
                    <Icon nombre="check" className="h-4 w-4 text-verde" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Button href="/profesionales" tamano="lg" className="w-full lg:w-auto">
                Regístrate gratis
              </Button>
              <Button
                href="/planes"
                variante="navy"
                tamano="lg"
                className="w-full lg:w-auto"
              >
                Ver membresías
              </Button>
              <p className="max-w-xs text-xs leading-relaxed text-ink-3 lg:text-right">
                Al registrarte eliges el tipo de cuenta: Cliente, Profesional o
                Proveedor. Puedes operar como profesional y proveedor desde la
                misma cuenta.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

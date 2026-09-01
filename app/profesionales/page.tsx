import type { Metadata } from "next";
import { EtapasVerificacion } from "@/components/EtapasVerificacion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Tabs } from "@/components/ui/Tabs";
import { getPaquetesCreditos, getPlanes, getZonas } from "@/lib/data";
import type { PaqueteCreditos, Plan, Zona } from "@/lib/types";

export const metadata: Metadata = {
  title: "Para profesionales y proveedores de materiales",
  description:
    "Recibe solicitudes de tu zona en CDMX y Edomex. Membresías anuales desde $299 MXN, créditos para trabajos urgentes desde $99 MXN y cobro directo sin comisión por trabajo.",
  alternates: { canonical: "/profesionales" },
};

function ListaCheck({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5 text-sm text-ink-2">
          <Icon nombre="check" className="mt-0.5 h-4 w-4 shrink-0 text-verde" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function BloqueCreditos({ paquetes }: { paquetes: PaqueteCreditos[] }) {
  return (
    <div className="rw-cut bg-navy p-6 text-on-navy ring-1 ring-inset ring-line-navy sm:p-8">
      <Badge tono="brand" className="bg-brand/20 text-brand-soft">
        Pay-per-lead
      </Badge>
      <h3 className="mt-4 text-2xl text-on-navy">
        Créditos para trabajos urgentes
      </h3>
      <ol className="mt-6 space-y-4">
        {[
          "Ves el trabajo urgente de tu zona: servicio, colonia y descripción. Todavía sin fotos ni datos de contacto.",
          "Usas 1 crédito y se abren las fotos del problema y el teléfono del cliente al instante.",
          "Llamas antes que nadie con un presupuesto exacto. Solo 5 profesionales pueden desbloquear cada trabajo.",
        ].map((texto, i) => (
          <li key={texto} className="flex gap-4">
            <span className="font-display text-xl font-black text-brand-soft">
              0{i + 1}
            </span>
            <p className="text-sm leading-relaxed text-on-navy-2">{texto}</p>
          </li>
        ))}
      </ol>
      <dl className="mt-7 grid grid-cols-3 gap-3">
        {paquetes.map((p) => (
          <div
            key={p.creditos}
            className="bg-on-navy/[0.07] p-3 text-center ring-1 ring-inset ring-line-navy"
          >
            <dt className="font-display text-2xl font-black text-on-navy">
              {p.creditos}
            </dt>
            <dd className="mt-1 text-xs text-on-navy-2">
              créditos
              <span className="mt-1 block font-semibold text-brand-soft">
                ${p.precio} {p.moneda}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-on-navy-2">
        Con el plan Premium, 50% de descuento en todos los paquetes.
      </p>
      <div className="mt-6">
        <Button href="/planes#creditos" tamano="lg">
          Ver planes y créditos
        </Button>
      </div>
    </div>
  );
}

function PanelProfesional({
  paquetes,
  planes,
}: {
  paquetes: PaqueteCreditos[];
  planes: Plan[];
}) {
  const base = planes[0];
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rw-cut bg-surface p-6 ring-1 ring-inset ring-line sm:p-8">
        <Badge tono="brand">Si eres profesional</Badge>
        <h3 className="mt-4 text-2xl">
          Que te encuentren quienes ya están buscando
        </h3>
        <p className="mt-3 text-ink-2">
          Electricistas, plomeros, pintores, albañiles, impermeabilizadores y
          maestros de obra: tu perfil verificado aparece en las búsquedas de la
          zona que cubra tu membresía. Acuerdas el precio con el cliente y
          cobras tú, sin comisión por trabajo.
        </p>
        <ListaCheck
          items={[
            "Solicitudes de clientes de tu zona",
            "Perfil verificado con INE",
            "Historial y calificaciones públicas",
            "Cobro directo, sin intermediarios",
            "Estadísticas de tu perfil",
            "Trabajos urgentes con créditos",
          ]}
        />
        <div className="mt-7 rounded-sm bg-bg p-4 ring-1 ring-inset ring-line">
          <p className="text-sm text-ink-2">
            Membresía anual desde{" "}
            <span className="font-display text-lg font-black text-brand">
              ${base.precioAnual} MXN
            </span>{" "}
            · sin contratos largos.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/contacto?motivo=profesional" tamano="lg">
            Regístrate gratis
          </Button>
          <Button href="/planes" variante="contorno" tamano="lg">
            Comparar planes
          </Button>
        </div>
      </div>

      <BloqueCreditos paquetes={paquetes} />
    </div>
  );
}

function PanelProveedor({ zonas }: { zonas: Zona[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rw-cut bg-surface p-6 ring-1 ring-inset ring-line sm:p-8">
        <Badge tono="brand">Si eres proveedor de materiales</Badge>
        <h3 className="mt-4 text-2xl">
          Tu catálogo, en las búsquedas de tu zona
        </h3>
        <p className="mt-3 text-ink-2">
          Ferreterías, casas de material y distribuidores: publica precios y
          disponibilidad reales, recibe pedidos de clientes y profesionales de
          la zona, y entrega con seguimiento GPS igual que un servicio.
        </p>
        <ListaCheck
          items={[
            "Catálogo con precios y existencias",
            "Pedidos de clientes y de profesionales",
            "Entregas con tracking en el mapa",
            "Perfil de negocio verificado",
            "Productos ilimitados desde el plan Intermedia",
            "Cobro directo, sin comisión por venta",
          ]}
        />
        <div className="mt-7 rounded-sm bg-bg p-4 ring-1 ring-inset ring-line">
          <p className="text-sm text-ink-2">
            La verificación cubre al negocio y al representante: INE,
            reconocimiento facial y comprobante de domicilio.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/contacto?motivo=proveedor" tamano="lg">
            Registrar mi negocio
          </Button>
          <Button href="/planes" variante="contorno" tamano="lg">
            Ver planes
          </Button>
        </div>
      </div>

      <div className="rw-cut bg-bg p-6 ring-1 ring-inset ring-line sm:p-8">
        <h3 className="text-2xl">Dónde puedes vender</h3>
        <p className="mt-3 text-ink-2">
          Tu plan define las zonas en las que apareces. Puedes empezar por tu
          municipio y ampliar después.
        </p>
        <ul className="mt-6 space-y-4">
          {zonas.map((z) => (
            <li key={z.slug} className="border-l-2 border-brand pl-4">
              <p className="font-display text-base font-extrabold">
                {z.nombre}
              </p>
              <p className="mt-1 text-sm text-ink-2">
                {z.municipios.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-line pt-4 text-sm text-ink-3">
          ¿Entregas fuera de estas zonas? Escríbenos: estamos ampliando
          cobertura por demanda.
        </p>
      </div>
    </div>
  );
}

export default async function ProfesionalesPage() {
  const [planes, paquetes, zonas] = await Promise.all([
    getPlanes(),
    getPaquetesCreditos(),
    getZonas(),
  ]);

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Para el lado de la oferta"
            titulo="Trabaja con RedWork"
            texto="Dos formas de estar en la red: como profesional que ejecuta el servicio o como proveedor que surte el material. En ambos casos, verificación con INE, cobertura por zona y cobro directo al cliente."
          />
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            {[
              { valor: "Desde $299", etiqueta: "membresía anual MXN" },
              { valor: "Desde $99", etiqueta: "paquete de 5 créditos MXN" },
              { valor: "0%", etiqueta: "comisión por trabajo" },
            ].map((d) => (
              <p key={d.etiqueta} className="border-l-2 border-brand pl-4">
                <span className="block font-display text-2xl font-black">
                  {d.valor}
                </span>
                <span className="text-ink-3">{d.etiqueta}</span>
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tono="superficie" espaciado="continuacion">
        <Container>
          <Tabs
            ariaLabel="Elige tu tipo de cuenta"
            pestanas={[
              {
                id: "profesional",
                etiqueta: "Si eres profesional",
                contenido: (
                  <PanelProfesional paquetes={paquetes} planes={planes} />
                ),
              },
              {
                id: "proveedor",
                etiqueta: "Si eres proveedor de materiales",
                contenido: <PanelProveedor zonas={zonas} />,
              },
            ]}
          />
        </Container>
      </Section>

      <Section tono="navy">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <SectionHeading
              tono="navy"
              eyebrow="Antes de operar"
              titulo="Qué necesitas para registrarte"
              texto="El mismo proceso para profesionales y proveedores. Toma unos minutos y solo se hace una vez."
            />
            <EtapasVerificacion />
          </div>
          <p className="mt-8 text-sm text-on-navy-2">
            Puedes operar como profesional y como proveedor desde la misma
            cuenta.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rw-cut grid gap-8 bg-surface p-8 ring-1 ring-inset ring-line lg:grid-cols-[1.3fr_1fr] lg:items-center sm:p-10">
            <div>
              <h2 className="text-3xl">¿Listo para recibir solicitudes?</h2>
              <p className="mt-3 max-w-xl text-ink-2">
                Registrarte es gratis. La membresía se elige después, según la
                zona que quieras cubrir, y los créditos se compran solo si
                quieres tomar trabajos urgentes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/contacto?motivo=profesional" tamano="lg">
                Regístrate gratis
              </Button>
              <Button href="/faq" variante="contorno" tamano="lg">
                Resolver dudas
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

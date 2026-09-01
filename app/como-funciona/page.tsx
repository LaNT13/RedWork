import type { Metadata } from "next";
import { EtapasVerificacion } from "@/components/EtapasVerificacion";
import { JsonLd } from "@/components/JsonLd";
import { PasosProceso, pasosProceso } from "@/components/PasosProceso";
import { WidgetTracking } from "@/components/home/WidgetTracking";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Badge,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Spotlight } from "@/components/ui/Spotlight";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo funciona RedWork",
  description:
    "Busca, cotiza y sigue tu servicio en tiempo real. Así funciona RedWork para clientes, y así funcionan las membresías y los créditos para profesionales y proveedores.",
  alternates: { canonical: "/como-funciona" },
};

const paraOferta = [
  {
    icono: "usuario",
    titulo: "Te registras y te verificas",
    texto:
      "Subes tu INE, pasas el reconocimiento facial y compruebas domicilio. Sin ese paso no puedes operar, y por eso el distintivo de verificado significa algo.",
  },
  {
    icono: "mapa",
    titulo: "Eliges tu zona con una membresía",
    texto:
      "Tu plan anual define en cuántas alcaldías o municipios apareces: 5, 10 o las 16 de la CDMX, más los 5 municipios del Estado de México.",
  },
  {
    icono: "credito",
    titulo: "Tomas urgencias con créditos",
    texto:
      "Los trabajos urgentes se desbloquean con 1 crédito: se abren las fotos y el teléfono del cliente. Solo 5 profesionales pueden tomar cada trabajo.",
  },
  {
    icono: "escudo",
    titulo: "Cobras directo, sin comisión",
    texto:
      "RedWork no se queda un porcentaje del trabajo. Acuerdas el precio con el cliente y cobras tú.",
  },
] as const;

export default function ComoFuncionaPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Cómo contratar un profesional verificado en RedWork",
          description:
            "Proceso de tres pasos para contratar servicios de construcción y mantenimiento o comprar materiales en CDMX y el Estado de México.",
          totalTime: "PT10M",
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "MXN",
            value: "0",
          },
          step: pasosProceso.map((paso, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: paso.titulo,
            text: paso.texto,
            url: `${site.url}/como-funciona#paso-${paso.numero}`,
          })),
        }}
      />

      <Section espaciado="cabecera">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="min-w-0">
              <Badge tono="brand">Para clientes</Badge>
              <h1 className="mt-4 text-4xl sm:text-5xl">
                Contrata sin llamar a ciegas
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">
                RedWork es un conector: no ejecutamos el servicio. Nos
                encargamos de que la persona que llega a tu casa esté
                verificada, de que puedas comparar cotizaciones con números
                sobre la mesa y de que sepas exactamente por dónde viene.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/servicios" tamano="lg">
                  Buscar profesional o proveedor
                </Button>
                <Button href="/faq" variante="contorno" tamano="lg">
                  Preguntas frecuentes
                </Button>
              </div>
            </div>
            <WidgetTracking />
          </div>
        </Container>
      </Section>

      <Section tono="superficie">
        <Container>
          <SectionHeading
            eyebrow="El proceso"
            titulo="Tres pasos, de principio a fin"
            texto="Del primer clic a la entrega, sin llamadas a ciegas ni precios inventados sobre la marcha."
          />
          <div className="mt-10">
            <PasosProceso />
          </div>

          <div className="rw-cut mt-8 grid gap-6 bg-bg p-6 ring-1 ring-inset ring-line sm:p-8 lg:grid-cols-3">
            {[
              {
                icono: "buscar",
                titulo: "Qué ves al buscar",
                texto:
                  "Perfiles verificados con INE, historial de trabajos y calificaciones escritas por clientes de tu zona.",
              },
              {
                icono: "documento",
                titulo: "Qué debe traer una cotización",
                texto:
                  "Alcance, materiales, tiempo estimado y garantía. Si viene en un solo número redondo, pide el desglose.",
              },
              {
                icono: "pin",
                titulo: "Qué ves durante el servicio",
                texto:
                  "La posición del profesional o del material en el mapa y el tiempo estimado de llegada, en vivo.",
              },
            ].map((b) => (
              <div key={b.titulo}>
                <span className="grid h-10 w-10 place-items-center bg-surface text-brand">
                  <Icon nombre={b.icono} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg">{b.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {b.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tono="navy">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <SectionHeading
              tono="navy"
              eyebrow="Verificación de identidad"
              titulo="Tres etapas, sin excepciones"
              texto="Clientes, profesionales y proveedores pasan por el mismo proceso. Nadie puede pagar por saltárselo."
            />
            <EtapasVerificacion />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Para profesionales y proveedores"
            titulo="Y del otro lado, ¿cómo funciona?"
            texto="El modelo tiene dos piezas independientes: la membresía anual define tu zona, y los créditos sirven para tomar trabajos urgentes."
          />
          <Spotlight as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
            {paraOferta.map((item) => (
              <li
                key={item.titulo}
                data-spotlight
                className="rw-spotlight rw-elevar flex gap-4 overflow-hidden bg-surface p-6 ring-1 ring-inset ring-line hover:ring-brand/35"
              >
                <span className="rw-cut-sm grid h-11 w-11 shrink-0 place-items-center bg-bg text-brand">
                  <Icon nombre={item.icono} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {item.texto}
                  </p>
                </div>
              </li>
            ))}
          </Spotlight>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/profesionales" tamano="lg">
              Ver la página de profesionales
            </Button>
            <Button href="/planes" variante="contorno" tamano="lg">
              Planes y créditos
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

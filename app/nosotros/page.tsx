import type { Metadata } from "next";
import { EtapasVerificacion } from "@/components/EtapasVerificacion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Primitivos";
import { Spotlight } from "@/components/ui/Spotlight";
import { getMetricasRed, getZonas } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "RedWork es un marketplace mexicano que conecta clientes con profesionales de la construcción verificados con INE y con proveedores de materiales en CDMX y el Estado de México.",
  alternates: { canonical: "/nosotros" },
};

const principios = [
  {
    icono: "escudo",
    titulo: "Verificamos antes, no después",
    texto:
      "Nadie opera en RedWork sin INE vigente, prueba de vida y comprobante de domicilio. No hay forma de pagar por saltarse el proceso, ni para clientes ni para profesionales.",
  },
  {
    icono: "pin",
    titulo: "Lo que pasa, se ve",
    texto:
      "Geolocalización en tiempo real del profesional y del material. Saber por dónde viene tu servicio no debería ser un privilegio.",
  },
  {
    icono: "credito",
    titulo: "Cobras tú, no nosotros",
    texto:
      "No tomamos comisión por trabajo. La plataforma se financia con membresías y créditos, así que el precio que acuerdas con el cliente es el que cobras.",
  },
  {
    icono: "usuario",
    titulo: "Somos el conector, no el ejecutor",
    texto:
      "RedWork no realiza los trabajos: los realiza el profesional o el proveedor que tú elijas. Nuestro trabajo es que esa elección sea informada.",
  },
] as const;

export default async function NosotrosPage() {
  const [metricas, zonas] = await Promise.all([getMetricasRed(), getZonas()]);

  return (
    <>
      <Section espaciado="cabecera">
        <Container>
          <SectionHeading
            nivel={1}
            eyebrow="Nosotros"
            titulo="Que contratar a alguien para tu casa deje de ser una apuesta"
            texto="RedWork nació en la Ciudad de México con una idea simple: el problema de contratar un plomero, un electricista o un maestro de obra no es que no existan buenos profesionales, sino que no hay forma de saber quién es quién antes de que toque tu puerta."
          />
        </Container>
      </Section>

      <Section espaciado="continuacion">
        <Container>
          <div className="rw-cut grid gap-8 bg-surface p-8 ring-1 ring-inset ring-line sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl">Qué hacemos</h2>
              <p className="mt-3 leading-relaxed text-ink-2">
                Conectamos a clientes con dos lados de la misma obra: los
                profesionales que ejecutan el servicio —electricistas,
                plomeros, pintores, albañiles, impermeabilizadores— y los
                proveedores que surten el material. Verificamos la identidad de
                todos, mostramos el historial de cada perfil y dejamos que
                cliente y profesional acuerden el precio directamente.
              </p>
            </div>
            <div>
              <h2 className="text-2xl">Qué no hacemos</h2>
              <p className="mt-3 leading-relaxed text-ink-2">
                No ejecutamos obra, no somos contratistas y no cobramos
                comisión por trabajo. Tampoco decidimos por ti: te damos la
                información —verificación, historial, calificaciones, ubicación
                en vivo— para que la decisión sea tuya y esté fundamentada.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tono="superficie">
        <Container>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            titulo="Cuatro principios que no se negocian"
          />
          <Spotlight as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
            {principios.map((p) => (
              <li
                key={p.titulo}
                data-spotlight
                className="rw-spotlight rw-elevar flex gap-4 overflow-hidden bg-bg p-6 ring-1 ring-inset ring-line hover:ring-brand/35"
              >
                <span className="rw-cut-sm grid h-11 w-11 shrink-0 place-items-center bg-surface text-brand">
                  <Icon nombre={p.icono} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {p.texto}
                  </p>
                </div>
              </li>
            ))}
          </Spotlight>
        </Container>
      </Section>

      <Section tono="navy">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <SectionHeading
              tono="navy"
              eyebrow="Verificación"
              titulo="El proceso que hace posible todo lo demás"
              texto="Tres etapas, iguales para clientes, profesionales y proveedores. Es la parte menos vistosa de la plataforma y la más importante."
            />
            <EtapasVerificacion />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl">La red hoy</h2>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden bg-line">
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
                  <div key={m.etiqueta} className="bg-bg px-5 py-6">
                    <dt className="sr-only">{m.etiqueta}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-black text-brand">
                        {m.valor}
                      </span>
                      <span className="mt-1 block text-sm text-ink-2">
                        {m.etiqueta}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-2xl">Dónde operamos</h2>
              <p className="mt-3 text-ink-2">
                Cobertura en {site.cobertura}. Ampliamos por demanda: cuando
                una zona junta suficientes solicitudes y profesionales
                verificados, se abre.
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
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/profesionales" tamano="lg">
              Trabaja con RedWork
            </Button>
            <Button href="/contacto" variante="contorno" tamano="lg">
              Hablar con nosotros
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

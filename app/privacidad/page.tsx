import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Primitivos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad de RedWork. Documento en preparación por el área legal.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <Section espaciado="cabecera">
      <Container>
        <SectionHeading
          nivel={1}
          eyebrow="Legal"
          titulo="Aviso de privacidad"
          texto="Documento en preparación conforme a la legislación mexicana de protección de datos personales."
        />
        <div className="rw-cut mt-8 max-w-3xl bg-surface p-6 ring-1 ring-inset ring-line sm:p-8">
          <p className="leading-relaxed text-ink-2">
            RedWork trata datos personales sensibles como parte de su proceso
            de verificación: identificación oficial, datos biométricos
            (reconocimiento facial) y comprobante de domicilio. Por eso el aviso
            de privacidad debe redactarlo y validarlo el área legal antes de
            publicarse, no una plantilla genérica.
          </p>
          <p className="mt-4 leading-relaxed text-ink-2">
            Para ejercer tus derechos ARCO o para solicitar el aviso vigente
            aplicable a tu cuenta, escríbenos a{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-ink underline decoration-2 underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
          <div className="mt-6">
            <Button href="/contacto" variante="contorno">
              Ir a contacto
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

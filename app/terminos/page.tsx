import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Primitivos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso de RedWork. Documento en preparación por el área legal.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <Section espaciado="cabecera">
      <Container>
        <SectionHeading
          nivel={1}
          eyebrow="Legal"
          titulo="Términos y condiciones"
          texto="Este documento está en preparación con el área legal de RedWork."
        />
        <div className="rw-cut mt-8 max-w-3xl bg-surface p-6 ring-1 ring-inset ring-line sm:p-8">
          <p className="leading-relaxed text-ink-2">
            La versión vigente de los términos y condiciones se publicará aquí
            una vez revisada y aprobada. No publicamos borradores ni textos de
            plantilla como si fueran definitivos: un documento legal a medias
            es peor que ninguno.
          </p>
          <p className="mt-4 leading-relaxed text-ink-2">
            Mientras tanto, si necesitas la versión aplicable a tu contrato o
            membresía, escríbenos a{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-ink underline decoration-2 underline-offset-4"
            >
              {site.email}
            </a>{" "}
            y te la enviamos.
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

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Primitivos";

export default function NoEncontrado() {
  return (
    <Section espaciado="ninguno" className="py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-6xl font-black text-brand">404</p>
          <h1 className="mt-4 text-3xl sm:text-4xl">
            Esta página no existe (o ya se movió)
          </h1>
          <p className="mt-4 text-ink-2">
            Puede que el enlace esté mal escrito o que la sección haya cambiado
            de lugar. Desde aquí puedes seguir buscando lo que necesitas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/servicios" tamano="lg">
              Ver servicios
            </Button>
            <Button href="/" variante="contorno" tamano="lg">
              Ir al inicio
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-3">
            ¿Buscabas algo en concreto?{" "}
            <Link
              href="/contacto"
              className="font-semibold text-brand-ink underline decoration-2 underline-offset-4"
            >
              Escríbenos
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}

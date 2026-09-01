import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Primitivos";
import { navFooter, site } from "@/lib/site";

export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-navy text-on-navy">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tono="claro" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-navy-2">
              Conectamos a clientes con profesionales y proveedores verificados
              de construcción, impermeabilización y mantenimiento en la CDMX y
              el Estado de México. RedWork conecta; el servicio lo ejecuta el
              profesional que elijas.
            </p>
          </div>

          {navFooter.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo}>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-on-navy">
                {grupo.titulo}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {grupo.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-sm text-on-navy-2 transition-colors hover:text-white"
                    >
                      {item.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-on-navy">
              Contacto
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-on-navy-2">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Icon nombre="correo" className="h-4 w-4 text-brand-soft" />
                  {site.email}
                </a>
                <span className="mt-0.5 block pl-6 text-xs text-on-navy-2/70">
                  Soporte de cuenta
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${site.emailContacto}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Icon nombre="correo" className="h-4 w-4 text-brand-soft" />
                  {site.emailContacto}
                </a>
                <span className="mt-0.5 block pl-6 text-xs text-on-navy-2/70">
                  Contacto general y comercial
                </span>
              </li>
              <li>
                <a
                  href={`tel:${site.telefonoLink}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Icon nombre="telefono" className="h-4 w-4 text-brand-soft" />
                  {site.telefono}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon nombre="pin" className="h-4 w-4 text-brand-soft" />
                {site.ciudad}
              </li>
              <li className="flex items-center gap-2">
                <Icon nombre="reloj" className="h-4 w-4 text-brand-soft" />
                {site.horario}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-navy pt-6 text-xs text-on-navy-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {anio} RedWork — Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-5">
            <li>
              <Link href="/terminos" className="inline-block py-1 hover:text-white">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="inline-block py-1 hover:text-white">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link href="/faq" className="inline-block py-1 hover:text-white">
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

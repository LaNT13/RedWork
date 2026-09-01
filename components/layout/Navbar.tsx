"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Primitivos";
import { cn } from "@/lib/cn";
import { navComunidad, navPrincipal, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [comunidad, setComunidad] = useState(false);
  const comunidadRef = useRef<HTMLLIElement>(null);
  const cierreDiferido = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* El menú se cierra solo al cambiar de ruta: con rutas reales (no anclas)
     cada clic navega y el panel debe desaparecer. */
  useEffect(() => {
    setAbierto(false);
    setComunidad(false);
  }, [pathname]);

  /* Bloquea el scroll del fondo mientras el panel móvil está abierto. */
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  /* Cierre del desplegable por Escape o clic fuera. */
  useEffect(() => {
    if (!comunidad) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setComunidad(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!comunidadRef.current?.contains(e.target as Node)) {
        setComunidad(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [comunidad]);

  const esActiva = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const comunidadActiva = navComunidad.some((i) => esActiva(i.href));

  /* En puntero fino el desplegable también responde al hover, con un
     retardo al salir para que no se cierre al cruzar el hueco. */
  const abrirHover = () => {
    if (cierreDiferido.current) clearTimeout(cierreDiferido.current);
    if (window.matchMedia("(hover: hover)").matches) setComunidad(true);
  };
  const cerrarHover = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    cierreDiferido.current = setTimeout(() => setComunidad(false), 160);
  };

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-on-navy"
      >
        Saltar al contenido
      </a>

      {/* Cinta superior: atención directa + puerta de entrada de la oferta. */}
      <div className="bg-navy text-on-navy">
        <Container className="flex min-h-11 items-center justify-center gap-2 text-xs sm:justify-between">
          <p className="hidden items-center gap-4 sm:flex">
            <a
              href={`tel:${site.telefonoLink}`}
              className="inline-flex items-center gap-1.5 text-on-navy-2 transition-colors hover:text-white"
            >
              <Icon nombre="telefono" className="h-3.5 w-3.5" />
              {site.telefono}
            </a>
            <span className="hidden text-on-navy-2 lg:inline">
              {site.horario}
            </span>
          </p>
          {/* py-2.5 para que el área táctil llegue a ~40px en móvil, donde
              este enlace es lo único que ocupa la cinta. */}
          <Link
            href="/profesionales"
            className="group inline-flex items-center gap-1.5 py-2.5 font-semibold transition-colors hover:text-white"
          >
            <span className="sm:hidden">Soy profesional o proveedor</span>
            <span className="hidden sm:inline">
              ¿Eres profesional o proveedor? Regístrate gratis
            </span>
            <Icon
              nombre="flecha"
              className="h-3.5 w-3.5 text-brand-soft transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
        <Container>
          <nav
            aria-label="Navegación principal"
            className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]"
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {navPrincipal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={esActiva(item.href) ? "page" : undefined}
                    className={cn(
                      "relative px-2.5 py-2 text-sm font-semibold transition-colors xl:px-3",
                      esActiva(item.href)
                        ? "text-brand-ink"
                        : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {item.etiqueta}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300 ease-[var(--ease-out-rw)] xl:inset-x-3",
                        esActiva(item.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}

              {/* Comunidad: lo no transaccional, agrupado */}
              <li
                ref={comunidadRef}
                className="relative"
                onMouseEnter={abrirHover}
                onMouseLeave={cerrarHover}
              >
                <button
                  type="button"
                  aria-expanded={comunidad}
                  aria-controls="menu-comunidad"
                  onClick={() => setComunidad((v) => !v)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-semibold transition-colors xl:px-3",
                    comunidadActiva || comunidad
                      ? "text-brand-ink"
                      : "text-ink-2 hover:text-ink",
                  )}
                >
                  Comunidad
                  <Icon
                    nombre="chevron"
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      comunidad ? "rotate-90" : "rotate-0",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300 ease-[var(--ease-out-rw)] xl:inset-x-3",
                      comunidadActiva ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>

                <div
                  id="menu-comunidad"
                  hidden={!comunidad}
                  className="rw-cut absolute right-0 top-full z-50 mt-2 w-80 origin-top-right bg-bg p-2 shadow-[0_24px_60px_-30px_rgb(33_31_27_/_0.55)] ring-1 ring-inset ring-line"
                >
                  <ul>
                    {navComunidad.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={
                            esActiva(item.href) ? "page" : undefined
                          }
                          className="group flex items-start gap-3 p-3 transition-colors hover:bg-surface"
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center transition-colors",
                              esActiva(item.href)
                                ? "bg-brand text-white"
                                : "bg-surface text-brand-ink group-hover:bg-brand group-hover:text-white",
                            )}
                          >
                            <Icon
                              nombre={item.icono ?? "flecha"}
                              className="h-4 w-4"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-ink">
                              {item.etiqueta}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-ink-3">
                              {item.descripcion}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/contacto"
                className="hidden px-3 py-2 text-sm font-semibold text-ink-2 transition-colors hover:text-ink xl:block"
              >
                Contacto
              </Link>
              <Button href="/servicios" tamano="sm">
                Buscar profesional
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              className="rw-cut-sm inline-flex items-center gap-2 bg-surface px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-2 lg:hidden"
            >
              <Icon nombre={abierto ? "cerrar" : "menu"} className="h-5 w-5" />
              {abierto ? "Cerrar" : "Menú"}
            </button>
          </nav>
        </Container>
      </header>

      {/* Panel móvil */}
      <div
        id="menu-movil"
        hidden={!abierto}
        className="fixed inset-x-0 bottom-0 top-[6.75rem] z-40 overflow-y-auto overscroll-contain bg-bg lg:hidden"
      >
        <Container className="py-6">
          <ul className="divide-y divide-line border-y border-line">
            {navPrincipal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={esActiva(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-4 font-display text-xl font-extrabold",
                    esActiva(item.href) ? "text-brand-ink" : "text-ink",
                  )}
                >
                  {item.etiqueta}
                  <Icon nombre="chevron" className="h-5 w-5 text-ink-3" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-ink-3">
            Comunidad
          </p>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {navComunidad.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={esActiva(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 py-4 font-display text-lg font-extrabold",
                    esActiva(item.href) ? "text-brand-ink" : "text-ink",
                  )}
                >
                  <Icon
                    nombre={item.icono ?? "flecha"}
                    className="h-5 w-5 text-brand"
                  />
                  {item.etiqueta}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3">
            <Button href="/servicios" tamano="lg" className="w-full">
              Buscar profesional
            </Button>
            <Button
              href="/profesionales"
              variante="contorno"
              tamano="lg"
              className="w-full"
            >
              Soy profesional o proveedor
            </Button>
            <Button
              href="/contacto"
              variante="texto"
              className="justify-self-center"
            >
              Contacto y soporte
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

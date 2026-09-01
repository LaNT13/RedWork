import { Icon } from "@/components/ui/Icon";

/**
 * Demostración visual del diferenciador de geolocalización.
 * Es una animación CSS con datos de ejemplo: no consume la API de
 * tracking ni pretende mostrar un servicio real en curso.
 */
export function WidgetTracking() {
  return (
    <figure className="rw-cut-lg w-full min-w-0 bg-navy p-4 text-on-navy shadow-[0_40px_80px_-40px_rgb(31_61_92_/_0.55)] ring-1 ring-inset ring-line-navy sm:p-5">
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="rw-latido absolute inline-flex h-full w-full rounded-full bg-verde" />
          </span>
          Tracking activo · <span className="text-brand-soft">En camino</span>
        </p>
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-on-navy-2">
          Folio RW-4821
        </p>
      </div>

      {/* Mapa simplificado */}
      <div className="mt-4 overflow-hidden rounded-sm bg-navy-dark ring-1 ring-inset ring-line-navy">
        <svg
          viewBox="0 0 400 260"
          className="h-auto w-full"
          role="img"
          aria-label="Mapa de ejemplo: la ruta del proveedor avanza desde el almacén hasta el domicilio del cliente."
        >
          {/* Manzanas y calles: trama de fondo, decorativa */}
          <g stroke="currentColor" className="text-on-navy" opacity="0.09">
            <path d="M0 60H400M0 132H400M0 200H400" strokeWidth="14" />
            <path d="M150 0V260M244 0V260M60 0V260M330 0V260" strokeWidth="12" />
          </g>
          <g fill="currentColor" className="text-on-navy" opacity="0.05">
            <rect x="70" y="12" width="68" height="38" rx="3" />
            <rect x="262" y="12" width="56" height="38" rx="3" />
            <rect x="70" y="144" width="68" height="46" rx="3" />
            <rect x="262" y="144" width="56" height="46" rx="3" />
            <rect x="162" y="72" width="70" height="48" rx="3" />
          </g>
          {/* Un parque, para que el mapa no se lea como una retícula vacía */}
          <rect
            x="262"
            y="72"
            width="56"
            height="48"
            rx="4"
            className="fill-verde"
            opacity="0.18"
          />

          {/* Ruta punteada */}
          <path
            d="M46 200H150V132H244V60H344"
            fill="none"
            stroke="currentColor"
            className="rw-ruta-dash text-brand"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Origen */}
          <g>
            <circle cx="46" cy="200" r="7" className="fill-on-navy-2" />
            <circle cx="46" cy="200" r="3" className="fill-navy-dark" />
          </g>

          {/* Destino */}
          <g>
            <circle cx="344" cy="60" r="10" className="fill-brand" opacity="0.25" />
            <circle cx="344" cy="60" r="5.5" className="fill-brand" />
          </g>

          {/* Marcador en movimiento */}
          <g className="rw-marcador">
            <circle r="14" className="rw-halo fill-brand-soft" opacity="0.35" />
            <circle r="9" className="fill-bg" />
            <circle r="6" className="fill-brand" />
          </g>

          {/* Sin texto dentro del SVG: escalaría con el ancho del mapa
              (12px en móvil, 23px en tablet). Los extremos del trayecto
              se nombran en la leyenda de abajo, que sí es HTML. */}
        </svg>
      </div>

      {/* Tarjeta del proveedor */}
      <div className="mt-4 flex items-center gap-3 bg-navy-dark p-3 ring-1 ring-inset ring-line-navy">
        <div
          role="img"
          aria-label="Espacio reservado para la fotografía del proveedor"
          className="grid h-12 w-12 shrink-0 place-items-center bg-on-navy/10 font-display text-base font-black text-on-navy ring-1 ring-inset ring-line-navy"
        >
          JL
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-bold text-on-navy">
            Juan L.
            <Icon
              nombre="escudo"
              titulo="Perfil verificado con INE"
              className="h-4 w-4 text-verde"
            />
          </p>
          <p className="truncate text-xs text-on-navy-2">
            Proveedor · Materiales de construcción
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[0.65rem] uppercase tracking-wider text-on-navy-2">
            Llega en
          </p>
          <p className="font-display text-lg font-black leading-none text-brand-soft">
            7 min
          </p>
        </div>
      </div>

      {/* Barra de avance */}
      <div className="mt-3">
        <div
          className="h-1 w-full overflow-hidden bg-on-navy/15"
          role="progressbar"
          aria-label="Avance del trayecto de ejemplo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={60}
          aria-valuetext="Recorrido a media ruta"
        >
          <div className="rw-avance h-full bg-brand" style={{ width: "8%" }} />
        </div>
        <div className="mt-2 flex justify-between gap-3 text-[0.7rem] text-on-navy-2">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-on-navy-2" />
            Almacén · Coacalco
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            Tu domicilio · GAM
          </span>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-[0.7rem] leading-snug text-on-navy-2">
        Demostración con datos de ejemplo. En un servicio real ves la posición
        del profesional o del material en vivo.
      </figcaption>
    </figure>
  );
}

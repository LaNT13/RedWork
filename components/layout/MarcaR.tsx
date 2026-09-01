/* ============================================================
   Isotipo RedWork: la "R" construida como una red de nodos.
   Vectorizado a partir de la referencia de marca: el trazo izquierdo
   (asta) va en naranja y la panza/pierna derecha en el color secundario,
   que cambia según el fondo.

   NOTA: es una reconstrucción en SVG, no el archivo original. Si dejas
   el PNG/SVG oficial en web/public/, se sustituye aquí y ya.
   ============================================================ */

interface Nodo {
  x: number;
  y: number;
  r: number;
  lado: "izq" | "der";
}

/* Malla de la R. Coordenadas en un lienzo de 100×100. */
const nodos: Nodo[] = [
  // Asta vertical
  { x: 20, y: 12, r: 5, lado: "izq" },
  { x: 20, y: 31, r: 4.2, lado: "izq" },
  { x: 20, y: 50, r: 5, lado: "izq" },
  { x: 20, y: 69, r: 4.2, lado: "izq" },
  { x: 20, y: 88, r: 5, lado: "izq" },
  // Travesaños internos
  { x: 37, y: 12, r: 4.2, lado: "izq" },
  { x: 37, y: 30, r: 3.4, lado: "izq" },
  { x: 37, y: 50, r: 4.6, lado: "izq" },
  { x: 37, y: 62, r: 3.4, lado: "izq" },
  { x: 37, y: 88, r: 4.2, lado: "izq" },
  // Panza (bowl) derecha
  { x: 55, y: 10, r: 4.6, lado: "der" },
  { x: 68, y: 17, r: 3.6, lado: "der" },
  { x: 74, y: 30, r: 4.6, lado: "der" },
  { x: 68, y: 43, r: 3.6, lado: "der" },
  { x: 55, y: 50, r: 4.2, lado: "der" },
  // Pierna diagonal
  { x: 60, y: 62, r: 3.6, lado: "der" },
  { x: 70, y: 75, r: 3.6, lado: "der" },
  { x: 80, y: 88, r: 5.4, lado: "der" },
];

/* Aristas por índice de nodo. La malla es deliberadamente redundante:
   es lo que hace que se lea como red y no como contorno. */
const aristas: [number, number][] = [
  // asta
  [0, 1], [1, 2], [2, 3], [3, 4],
  // travesaño superior y trama del cuadrante alto
  [0, 5], [5, 6], [6, 2], [0, 6], [5, 1], [1, 7], [6, 7],
  // travesaño medio
  [2, 7], [7, 8], [8, 4], [2, 8], [3, 7], [3, 9], [4, 9], [7, 9],
  // panza
  [5, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 7],
  [10, 12], [12, 14], [11, 13], [6, 10], [10, 14],
  // pierna
  [14, 15], [15, 16], [16, 17], [7, 15], [14, 16], [15, 17], [8, 15],
];

export function MarcaR({
  className = "h-9 w-9",
  tono = "oscuro",
}: {
  className?: string;
  /** "oscuro" = fondo claro (secundario azul) · "claro" = fondo azul (secundario blanco) */
  tono?: "oscuro" | "claro";
}) {
  const secundario = tono === "claro" ? "#ffffff" : "var(--color-navy)";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="RedWork"
      fill="none"
    >
      <g strokeLinecap="round">
        {aristas.map(([a, b]) => {
          const na = nodos[a];
          const nb = nodos[b];
          /* La arista toma el color del lado dominante: si toca la panza,
             va en secundario. Así el degradado de la marca se mantiene. */
          const color =
            na.lado === "der" || nb.lado === "der"
              ? secundario
              : "var(--color-brand)";
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={color}
              strokeWidth={1.6}
              opacity={0.55}
            />
          );
        })}
      </g>
      <g>
        {nodos.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.lado === "izq" ? "var(--color-brand)" : secundario}
          />
        ))}
      </g>
    </svg>
  );
}

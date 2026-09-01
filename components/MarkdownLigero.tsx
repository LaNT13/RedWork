import { Fragment, type ReactNode } from "react";

/**
 * Renderizador mínimo para el markdown ligero de los posts:
 * `## subtítulo`, párrafos, listas con `- ` y **negritas**.
 * Cuando el contenido venga de un CMS habrá que sustituirlo por un parser
 * completo; mientras tanto evita meter una dependencia por cuatro reglas.
 */

function conNegritas(texto: string): ReactNode[] {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) => {
    if (parte.startsWith("**") && parte.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {parte.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{parte}</Fragment>;
  });
}

export function MarkdownLigero({ contenido }: { contenido: string }) {
  const bloques = contenido.split(/\n{2,}/);

  return (
    <div className="space-y-5">
      {bloques.map((bloque, i) => {
        const lineas = bloque.split("\n");

        if (bloque.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 text-2xl sm:text-3xl">
              {bloque.replace(/^##\s+/, "")}
            </h2>
          );
        }

        if (lineas.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2.5">
              {lineas.map((l, j) => (
                <li key={j} className="flex gap-3 text-ink-2">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand"
                  />
                  <span>{conNegritas(l.replace(/^-\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="leading-relaxed text-ink-2">
            {conNegritas(bloque)}
          </p>
        );
      })}
    </div>
  );
}

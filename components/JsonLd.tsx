/**
 * Inyecta datos estructurados Schema.org.
 * Se usa para que buscadores y motores de IA generativa puedan leer el
 * contenido como hechos y no solo como texto.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El objeto lo construimos nosotros desde datos propios, nunca desde
      // entrada de usuario, por eso es seguro serializarlo aquí.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

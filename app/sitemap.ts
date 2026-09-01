import type { MetadataRoute } from "next";
import { getCategorias, getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categorias, posts] = await Promise.all([getCategorias(), getPosts()]);
  const hoy = new Date();

  const fijas: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, priority: 1, changeFrequency: "weekly" as const },
    {
      url: `${site.url}/servicios`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    { url: `${site.url}/como-funciona`, priority: 0.8 },
    { url: `${site.url}/profesionales`, priority: 0.9 },
    { url: `${site.url}/planes`, priority: 0.9 },
    { url: `${site.url}/trabajos-realizados`, priority: 0.7 },
    {
      url: `${site.url}/blog`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    { url: `${site.url}/nosotros`, priority: 0.6 },
    { url: `${site.url}/faq`, priority: 0.8 },
    { url: `${site.url}/contacto`, priority: 0.6 },
  ].map((e) => ({ ...e, lastModified: hoy }));

  return [
    ...fijas,
    ...categorias.map((c) => ({
      url: `${site.url}/servicios/${c.slug}`,
      lastModified: hoy,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.actualizado ?? p.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

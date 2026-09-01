import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "RedWork · Profesionales y proveedores verificados en CDMX y Edomex",
    template: "%s · RedWork",
  },
  description: site.descripcion,
  applicationName: site.nombre,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: site.nombre,
    url: site.url,
    title:
      "RedWork · Profesionales y proveedores verificados en CDMX y Edomex",
    description: site.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: "RedWork · Profesionales y proveedores verificados",
    description: site.descripcion,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ec",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${archivo.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.nombre,
            url: site.url,
            email: site.email,
            telephone: site.telefono,
            description: site.descripcion,
            areaServed: [
              { "@type": "City", name: "Ciudad de México" },
              { "@type": "State", name: "Estado de México" },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ciudad de México",
              addressCountry: "MX",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: site.email,
              telephone: site.telefono,
              availableLanguage: ["es-MX"],
            },
          }}
        />
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

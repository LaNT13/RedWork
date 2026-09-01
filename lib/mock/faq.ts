import type { GrupoFaq } from "@/lib/types";

/* Preguntas frecuentes. Estas respuestas alimentan tanto la página /faq
   como el JSON-LD de FAQPage, así que deben ser exactas: confirmar cada
   una con el equipo antes de publicar. */
export const gruposFaq: GrupoFaq[] = [
  {
    slug: "primeros-pasos",
    titulo: "Primeros pasos",
    preguntas: [
      {
        pregunta: "¿Qué es RedWork?",
        respuesta:
          "RedWork es una plataforma que conecta clientes con profesionales y proveedores verificados de construcción, impermeabilización y mantenimiento en la Ciudad de México y municipios del Estado de México. RedWork conecta a las partes; el servicio lo ejecuta el profesional o proveedor que tú elijas.",
      },
      {
        pregunta: "¿Cómo me registro en RedWork?",
        respuesta:
          "Crea tu cuenta gratis y elige el tipo: Cliente, Profesional o Proveedor. El registro toma unos minutos e incluye la validación de identidad.",
      },
      {
        pregunta: "¿Qué documentos necesito para registrarme?",
        respuesta:
          "INE vigente, reconocimiento facial (prueba de vida) y comprobante de domicilio con referencias de ubicación.",
      },
      {
        pregunta: "¿Cuánto cuesta usar RedWork?",
        respuesta:
          "Para clientes es gratis siempre. Profesionales y proveedores eligen una membresía anual desde $299 MXN, y pueden comprar créditos para trabajos urgentes por separado.",
      },
      {
        pregunta: "¿Qué tipos de usuario existen?",
        respuesta:
          "Cliente, Profesional y Proveedor. Cada uno tiene su propio panel, sus requisitos y su forma de operar dentro de la plataforma.",
      },
      {
        pregunta: "¿Puedo tener más de un rol en la misma cuenta?",
        respuesta:
          "Sí. Puedes operar como profesional y como proveedor desde la misma cuenta.",
      },
    ],
  },
  {
    slug: "trabajos-urgentes",
    titulo: "Trabajos urgentes y créditos",
    preguntas: [
      {
        pregunta: "¿Qué son los trabajos urgentes?",
        respuesta:
          "Son solicitudes de emergencia que el cliente publica para recibir ayuda de profesionales en minutos, sin tener que llamar uno por uno.",
      },
      {
        pregunta: "¿Cómo publico un trabajo urgente?",
        respuesta:
          "Describe la emergencia, sube hasta 3 fotos del problema y publícalo. Para el cliente no tiene costo.",
      },
      {
        pregunta: "¿Cómo funcionan los créditos de RedWork?",
        respuesta:
          "Cada profesional usa 1 crédito para desbloquear las fotos del problema y el teléfono del cliente, y llamarle directo con un presupuesto. Los paquetes empiezan en $99 MXN por 5 créditos.",
      },
      {
        pregunta: "¿Hay descuentos en los paquetes de créditos?",
        respuesta:
          "Sí: con el plan Premium obtienes 50% de descuento en todos los paquetes de créditos.",
      },
      {
        pregunta: "¿Qué ve un profesional antes de gastar un crédito?",
        respuesta:
          "El servicio solicitado, la colonia y la descripción del problema. Las fotos y el teléfono del cliente siguen ocultos hasta desbloquear.",
      },
      {
        pregunta: "¿Por qué solo 5 profesionales pueden desbloquear cada trabajo?",
        respuesta:
          "Para que el cliente reciba propuestas útiles y no decenas de llamadas, y para que el crédito del profesional valga la pena.",
      },
    ],
  },
  {
    slug: "clientes",
    titulo: "Para clientes",
    preguntas: [
      {
        pregunta: "¿Cómo solicito una cotización?",
        respuesta:
          "Busca el servicio o el material que necesitas, elige tu alcaldía o municipio y pide cotización sin compromiso. No pagas nada por cotizar.",
      },
      {
        pregunta: "¿Cómo funciona el tracking en tiempo real?",
        respuesta:
          "Ves en el mapa por dónde viene el profesional o el material, en tiempo real, hasta que llega a tu domicilio, junto con el tiempo estimado de llegada.",
      },
      {
        pregunta: "¿Necesito subir documentos como cliente?",
        respuesta:
          "Sí: identificación oficial, reconocimiento facial y comprobante de domicilio. La verificación protege a las dos partes.",
      },
      {
        pregunta: "¿Qué pasa si cancelo un servicio?",
        respuesta:
          "Puedes cancelar sin compromiso mientras no hayas aceptado una cotización.",
      },
      {
        pregunta: "¿Cómo califico a un profesional?",
        respuesta:
          "Al terminar el servicio, desde tu historial. Tu calificación queda publicada en el perfil del profesional.",
      },
      {
        pregunta: "¿Es seguro contratar por RedWork?",
        respuesta:
          "Cada perfil pasa validación de INE, reconocimiento facial y comprobante de domicilio antes de poder operar. Además, cada trabajo terminado se califica y ese historial es público.",
      },
    ],
  },
  {
    slug: "profesionales",
    titulo: "Para profesionales",
    preguntas: [
      {
        pregunta: "¿Qué documentos debo subir como profesional?",
        respuesta:
          "INE vigente, reconocimiento facial y comprobante de domicilio con referencias de tu zona de trabajo.",
      },
      {
        pregunta: "¿Qué son las membresías de RedWork?",
        respuesta:
          "Son planes anuales que definen tu zona de cobertura y tus beneficios dentro de la plataforma, desde $299 MXN al año.",
      },
      {
        pregunta: "¿Cómo funcionan las zonas de cobertura?",
        respuesta:
          "Tu plan define en cuántas alcaldías o municipios apareces: 5, 10 o las 16 de la CDMX, más los 5 municipios del Estado de México.",
      },
      {
        pregunta: "¿RedWork se queda una comisión de mi trabajo?",
        respuesta:
          "No. Cobras directo al cliente, sin intermediarios. RedWork se financia con las membresías y los créditos, no con comisión por trabajo.",
      },
    ],
  },
  {
    slug: "proveedores",
    titulo: "Para proveedores de materiales",
    preguntas: [
      {
        pregunta: "¿Qué documentos debo subir como proveedor?",
        respuesta:
          "Los del negocio y los del representante: INE, reconocimiento facial y comprobante de domicilio.",
      },
      {
        pregunta: "¿Cuántos productos puedo publicar?",
        respuesta:
          "Depende del plan: catálogo limitado en Básica y Edomex, productos ilimitados desde Intermedia.",
      },
      {
        pregunta: "¿Necesito membresía como proveedor?",
        respuesta:
          "Sí, para publicar catálogo y aparecer en las búsquedas de tu zona.",
      },
      {
        pregunta: "¿Cómo funcionan las entregas de material?",
        respuesta:
          "Las entregas se siguen con tracking GPS en tiempo real, igual que un servicio, desde el almacén hasta el domicilio del cliente.",
      },
    ],
  },
  {
    slug: "soporte",
    titulo: "Soporte y cuenta",
    preguntas: [
      {
        pregunta: "¿Cómo contacto a soporte de RedWork?",
        respuesta:
          "Escribe a soporte@redwork.com.mx o llama al +52 55 7764 9864, de lunes a sábado de 8:00 a 20:00.",
      },
      {
        pregunta: "¿Dónde veo mi historial de servicios?",
        respuesta:
          "En tu panel, en la sección de servicios. Ahí quedan todas tus solicitudes, cotizaciones y calificaciones.",
      },
      {
        pregunta: "¿En qué zonas opera RedWork?",
        respuesta:
          "En las 16 alcaldías de la Ciudad de México y en Coacalco, Tlalnepantla, Atizapán de Zaragoza, Huixquilucan y Naucalpan, en el Estado de México.",
      },
    ],
  },
];

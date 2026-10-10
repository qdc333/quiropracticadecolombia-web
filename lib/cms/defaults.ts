import { padMissionPhotos } from "@/lib/cms/mission-practice";
import { DEFAULT_CONTACT, DEFAULT_GOOGLE_REVIEWS, DEFAULT_HERO } from "@/lib/content";
import type { SiteContent } from "@/lib/cms/types";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  version: 1,
  updatedAt: new Date().toISOString(),
  hero: DEFAULT_HERO,
  visionMision: {
    vision: {
      title: "Visión",
      heading: "Salud cervical superior en todo Colombia",
      statement:
        "Que Quiropráctica de Colombia deje de ser solo una clínica en Barranquilla y se convierta en un referente nacional: un país donde millones entiendan que el bienestar nace cuando el cerebro y el cuerpo se comunican sin interferencias.",
      paragraphs: [
        "Como un director de orquesta, el cuello superior — atlas (C1) y axis (C2) — coordina la señal entre tu cerebro y el resto del sistema. Ese equilibrio preciso y duradero es el estándar que el Dr. Kevin Ernesto quiere extender más allá de la costa.",
        "Uno de sus sueños es expandir este modelo de cuidado — ciencia, precisión cervical y acompañamiento humano — a ciudades de todo Colombia, para que familias en cada región accedan a la misma excelencia quiropráctica que hoy encuentran en Barranquilla.",
      ],
      image: {
        src: "/images/cms/vision-colombia-map.jpg",
        alt: "Ilustración: visión de cuidado quiropráctico cervical en Colombia, con sede en Barranquilla y proyección nacional",
      },
    },
    mision: {
      title: "Misión",
      heading: "Lo que hacemos en cada consulta",
      statement:
        "En Barranquilla, devolver claridad al sistema nervioso con evaluación rigurosa y ajustes cervicales superiores específicos — con honestidad clínica y sin atajos.",
      paragraphs: [
        "Medimos, observamos y te explicamos antes de intervenir. Cada plan se arma con tu historia, tus síntomas y tus metas; no aplicamos rutinas genéricas ni ajustes «por inercia».",
        "Te acompañamos en el tiempo: seguimiento, educación y transparencia sobre lo que encontramos y lo que podemos esperar en cada etapa. Si hace falta, te orientamos para integrar otros profesionales de salud, siempre con tu bienestar al centro.",
        "Atendemos a quienes viven en la costa y a quienes viajan desde otras regiones buscando una segunda opinión en cervical superior, con la misma exigencia en cada visita.",
      ],
      image: {
        src: "/images/cms/mision-cervical-superior.jpg",
        alt: "Ilustración: alineación cervical superior (C1 y C2) y vía nerviosa",
      },
    },
  },
  misiones: {
    tag: "Misiones quiroprácticas",
    title: "Misiones de práctica y formación",
    lead: "Salidas al territorio y encuentros para quiroprácticos en formación — mismo estándar clínico, distintos escenarios.",
    paragraphs: [
      "En el territorio llevamos evaluación, educación y ajustes específicos a colegios, centros penitenciarios, iglesias y comunidades.",
      "Las jornadas de salida — con fechas, relatos y fotos — están en el listado de misiones. Abajo encontrarás el espacio de formación para quiroprácticos en curso o recién graduados.",
    ],
    archiveCtaLabel: "Ver todas nuestras misiones",
    introImage: {
      src: "",
      alt: "Jornada quiropráctica de práctica en la comunidad",
    },
    arte: {
      tag: "Desarrollo del arte quiropráctico",
      title: "Afianzar lo aprendido antes de consulta",
      paragraphs: [
        "No nos encerramos en una sola técnica de forma rígida: trabajamos el arte quiropráctico con criterio, repetición consciente y acompañamiento del Dr. Kevin.",
        "Particularmente profundizamos en knee chest (pecho sobre rodilla): setup, línea de drive, contacto y verificación para que el ajuste sea específico y reproducible.",
        "Si estás cursando la carrera o acabas de graduarte y quieres reforzar lo aprendido en la universidad, este espacio es para ti — no es una misión de salida al territorio.",
      ],
      image: {
        src: "/images/cms/misiones-arte-knee-chest.jpg",
        alt: "Dr. Kevin Ernesto en práctica de ajuste knee chest con mesa portable",
      },
    },
    archiveTitle: "Todas nuestras misiones",
    archiveLead: "Jornadas de práctica fuera del consultorio: el relato, las fotos y las fechas de cada salida al territorio.",
    archiveParagraphs: [
      "Colegios, centros penitenciarios, iglesias y comunidades donde compartimos evaluación, educación y ajustes específicos cuando corresponde.",
      "Elige una misión para ver el contexto, la galería y escribir al doctor si quieres participar o proponer un lugar.",
    ],
    archiveImage: {
      src: "/images/cms/misiones-archivo-atlantico.png",
      alt: "Ilustración: misiones quiroprácticas en el departamento del Atlántico, con sede en Barranquilla",
    },
    photos: [
      { src: "", alt: "Misión quiropráctica — lugar 1" },
      { src: "", alt: "Misión quiropráctica — lugar 2" },
      { src: "", alt: "Misión quiropráctica — lugar 3" },
    ],
    ctaLabel: "¿Te interesa participar? Chatea directo con el doctor",
    missions: [
      {
        id: "mision-carcel-2027",
        title: "Misión en centro penitenciario",
        category: "carcel",
        typeLabel: "Centro penitenciario",
        eventDate: "",
        location: "Barranquilla y área metropolitana",
        summary:
          "Jornada de educación en salud cervical y valoración quiropráctica para población privada de la libertad y personal de apoyo.",
        paragraphs: [
          "Próxima misión programada para 2027. Aquí publicaremos el relato completo, aprendizajes y fotografías cuando el Dr. Kevin confirme lugar y fecha definitivos.",
        ],
        photos: [
          { src: "", alt: "Misión penitenciaria — foto 1" },
          { src: "", alt: "Misión penitenciaria — foto 2" },
          { src: "", alt: "Misión penitenciaria — foto 3" },
          { src: "", alt: "Misión penitenciaria — foto 4" },
          { src: "", alt: "Misión penitenciaria — foto 5" },
          { src: "", alt: "Misión penitenciaria — foto 6" },
        ],
        venuePhotos: padMissionPhotos([]),
        lodgingPhotos: padMissionPhotos([]),
        isFeatured: true,
      },
      {
        id: "mision-colegio",
        title: "Misiones en centros educativos",
        category: "colegio",
        typeLabel: "Colegios y centros educativos",
        eventDate: "",
        location: "Colegios, SENA y jornadas educativas en la región",
        summary:
          "Charlas y estaciones de bienestar en colegios y centros de formación: postura, pantallas, cuidado del cuello y valoraciones puntuales para estudiantes y docentes.",
        paragraphs: [
          "Unimos en una sola línea de misiones todo lo educativo: colegios, ferias de salud escolar, SENA y espacios donde estudiantes y formadores aprenden sobre columna y sistema nervioso.",
          "Mismo enfoque clínico que en consulta, adaptado al aula y al stand: explicación con modelo de columna, preguntas y acompañamiento cuando corresponde.",
        ],
        photos: [
          {
            src: "/images/cms/mision-educacion-1.jpg",
            alt: "Charla quiropráctica con estudiantes en jornada educativa",
          },
          {
            src: "/images/cms/mision-educacion-2.jpg",
            alt: "Estación educativa sobre salud cervical en centro educativo",
          },
          {
            src: "/images/cms/mision-educacion-3.jpg",
            alt: "Dr. Kevin Ernesto enseñando con modelo de columna en SENA",
          },
          {
            src: "/images/cms/mision-educacion-4.jpg",
            alt: "Equipo y docentes al cierre de misión en centro educativo",
          },
          {
            src: "/images/cms/mision-educacion-5.jpg",
            alt: "Explicación quiropráctica a familias en aula de educación infantil",
          },
          { src: "", alt: "Centros educativos — foto 6" },
        ],
        venuePhotos: padMissionPhotos([]),
        lodgingPhotos: padMissionPhotos([]),
        isFeatured: false,
      },
      {
        id: "mision-iglesia",
        title: "Misión en iglesia y comunidad",
        category: "iglesia",
        typeLabel: "Iglesia y comunidad",
        eventDate: "",
        location: "Comunidad de fe en Barranquilla",
        summary:
          "Encuentro de bienestar, educación cervical y acompañamiento quiropráctico para feligreses y vecinos.",
        paragraphs: [
          "Jornada en comunidad de fe: mesas de valoración, ajustes específicos y charla educativa con modelo de columna para explicar el cuidado quiropráctico.",
          "Acompañamiento a feligreses y vecinos en un espacio de confianza — mismo estándar clínico que en consulta.",
        ],
        photos: [
          {
            src: "/images/cms/mision-iglesia-1.jpg",
            alt: "Dr. Kevin Ernesto realizando un ajuste quiropráctico durante misión en iglesia y comunidad",
          },
          {
            src: "/images/cms/mision-iglesia-2.jpg",
            alt: "Vista de la jornada de misión quiropráctica en salón comunitario con mesas de atención",
          },
          {
            src: "/images/cms/mision-iglesia-3.jpg",
            alt: "Dr. Kevin explicando anatomía de columna con modelo didáctico en misión comunitaria",
          },
          { src: "", alt: "Misión en iglesia — foto 4" },
          { src: "", alt: "Misión en iglesia — foto 5" },
          { src: "", alt: "Misión en iglesia — foto 6" },
        ],
        venuePhotos: padMissionPhotos([]),
        lodgingPhotos: padMissionPhotos([]),
        isFeatured: false,
      },
    ],
  },
  googleReviews: DEFAULT_GOOGLE_REVIEWS,
  causa: {
    tag: "Elevación de conciencia",
    title: "Tu dolor no es un error de tu cuerpo, es una falla de comunicación.",
    paragraphs: [
      "Tus vértebras cervicales — los huesos de tu cuello — tienen una función primordial: ser la armadura que protege los nervios que viajan desde tu cerebro hacia todo tu cuerpo.",
      "¿Qué sucede cuando vives bajo altos niveles de estrés, sufres un accidente o un golpe traumático? La tensión muscular aumenta y, si una o más vértebras cervicales se salen de su posición natural, se origina el siguiente efecto dominó de la enfermedad:",
    ],
    figcaption: "Dr. Kevin Ernesto · Quiropráctica de Colombia",
    steps: [
      { icon: "UnfoldVertical", num: "01", title: "Desalineación", text: "La vértebra pierde su eje." },
      { icon: "Zap", num: "02", title: "Presión neurológica", text: "El hueso «pellizca» o presiona el nervio." },
      { icon: "Flame", num: "03", title: "Inflamación", text: "El nervio se inflama y la señal del cerebro se interrumpe." },
      { icon: "CircleAlert", num: "04", title: "Disfunción", text: "Aparecen los malestares crónicos que te impiden vivir tranquilo." },
    ],
  },
  especialidad: {
    tag: "Nuestra especialidad",
    title: "Quiropráctica cervical superior",
    lead:
      "Nos enfocamos en el eslabón más sensible entre tu cerebro y tu cuerpo: la cervical superior — atlas (C1) y axis (C2). Acompañamos patrones de compresión neurológica como:",
    symptoms: [
      { icon: "Orbit", title: "Vértigo y mareos", text: "Sensación de inestabilidad constante." },
      { icon: "Brain", title: "Migrañas y cefaleas", text: "Dolores de cabeza crónicos e incapacitantes." },
      { icon: "AudioLines", title: "Tinnitus", text: "Zumbido interno y molesto en los oídos." },
      { icon: "ScanFace", title: "Neuralgia del trigémino", text: "Dolores punzantes, como «corrientazos», en un lado de la cara." },
    ],
    ctaLabel: "¿Te identificas con estos síntomas? Habla con un especialista",
  },
  metodo: {
    tag: "Nuestra solución",
    title: "No es fuerza por fuerza. Es precisión neurológica.",
    paragraphs: [
      "La quiropráctica cervical superior es como afinar la comunicación entre tu cerebro y tu cuerpo. Con evaluación cuidadosa identificamos qué segmento cervical está interfiriendo con tu sistema nervioso.",
      "Aplicamos un ajuste específico para reducir la presión sobre el nervio, favorecer la alineación y dejar que la capacidad innata de sanación de tu cuerpo actúe — de forma natural y sin movimientos bruscos innecesarios.",
    ],
    pillars: [
      { icon: "ClipboardCheck", title: "Diagnóstico avanzado", text: "Identificación exacta de la vértebra afectada" },
      { icon: "Crosshair", title: "Ajuste específico", text: "Sin movimientos bruscos ni adivinanzas" },
      { icon: "Leaf", title: "Sanación natural", text: "El cuerpo recupera su capacidad al 100%" },
    ],
  },
  nosotros: {
    tag: "Quiénes somos",
    title: "Elevando el estándar de la salud en Colombia",
    paragraphs: [
      "Quiropráctica de Colombia, liderada por el Dr. Kevin Ernesto, nació con una misión clara: sacar a las personas del ciclo infinito de la medicación temporal y ofrecerles una solución natural, real y sostenible.",
      "Somos una clínica especializada en el cuidado neurológico estructural. Entendemos que el cuerpo humano no tiene límites cuando su sistema de comunicación está libre de interferencias. Nuestro compromiso es brindarte un cuidado quiropráctico de primer nivel, basado en ciencia, biomecánica y resultados objetivos.",
    ],
    badges: [
      { icon: "Leaf", value: "100%", label: "Enfoque natural" },
      { icon: "Bone", value: "C1–C3", label: "Zona cervical superior" },
      { icon: "UserRound", value: "Dr. Kevin", label: "Liderazgo clínico" },
    ],
  },
  redes: {
    tag: "Comunidad",
    title: "Síguenos en Instagram",
    lead: "Contenido educativo, casos clínicos y actualidad de la clínica y del Dr. Kevin.",
    clinic: {
      title: "Quiropráctica de Colombia",
      handle: "@quiropracticadecolombia",
      url: "https://www.instagram.com/quiropracticadecolombia?igsh=MXhzYnY2MTd1ZTJjdA==",
      avatar: "/images/logo.png",
      bullets: [
        "Educación sobre salud cervical y neurológica",
        "Casos y enfoque de la clínica en Colombia",
        "Comunidad oficial de pacientes y seguidores",
      ],
      buttonLabel: "Ver perfil de la clínica",
    },
    doctor: {
      title: "Dr. Kevin Ernesto Castro",
      handle: "@kevinfixme",
      url: "https://www.instagram.com/kevinfixme?igsh=MW82dzRuODkxb2ZxMA==",
      avatar: "/images/dr-kevin-metodo.png",
      bullets: [
        "Quiropráctico específico — precisión neurológica",
        "Contenido profesional y cercano con pacientes",
        "Referencias clínicas y trayectoria del Dr. Kevin",
      ],
      buttonLabel: "Ver perfil del doctor",
    },
  },
  contactPage: {
    tag: "Contacto",
    title: "Da el primer paso hacia tu bienestar",
    lead: "Deja de tratar los síntomas y empieza a corregir la causa.",
    mapTitle: "Ubicación de la clínica",
    mapAddress: "Centro Comercial Gabianelly · Cl. 84 #46 Local #7, 2.º piso · Barranquilla, Atlántico",
    mapButtonLabel: "Abrir ubicación en Google Maps",
  },
  contact: DEFAULT_CONTACT,
  images: {
    hero: "/images/hero-fondo.png",
    causa: "/images/dr-kevin-causa.png",
    metodo: "/images/dr-kevin-metodo.png",
    nosotros: "/images/dr-kevin-nosotros.png",
    logo: "/images/logo.png",
  },
};

import type { SiteContent } from "@/lib/cms/types";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** English overlay (Momentum-inspired tone, Quiropráctica de Colombia facts). CMS stays in Spanish. */
export const ENGLISH_SITE_OVERLAY: DeepPartial<SiteContent> = {
  hero: {
    eyebrow: "Upper cervical care · Barranquilla, Colombia",
    title: "Vertigo, migraines, or ear ringing—and medication is no longer enough?",
    subtitle:
      "Find the neurological root of your symptoms. At Quiropráctica de Colombia we do not “crack bones for the sake of it”: we reduce nerve interference at the upper cervical spine so your body can heal naturally.",
  },
  visionMision: {
    vision: {
      title: "Vision",
      heading: "Upper cervical care across Colombia",
      statement:
        "For Quiropráctica de Colombia to grow beyond our home clinic in Barranquilla into a national reference—so people across the country understand that wellness begins when the brain and body communicate without interference.",
      paragraphs: [
        "Like a conductor leading an orchestra, your upper neck (atlas C1 and axis C2) guides signals between your brain and the rest of your body. That aligned, precise, lasting balance is the standard Dr. Kevin Ernesto wants to share far beyond the coast.",
        "One of his dreams is to expand this model—science, upper cervical precision, and human-centered care—to more cities throughout Colombia, so families in every region can access the same chiropractic excellence patients find in Barranquilla today.",
      ],
    },
    mision: {
      title: "Mission",
      heading: "What we do at every visit",
      statement:
        "In Barranquilla, restore clarity to the nervous system through rigorous assessment and specific upper cervical adjustments—honest clinical care, no shortcuts.",
      paragraphs: [
        "We measure, observe, and explain before we intervene. Every care plan is built from your history, symptoms, and goals—not generic routines or adjustments «by habit».",
        "We stay with you over time: follow-up, education, and transparency about what we find and what to expect at each stage. When needed, we help you coordinate with other health professionals, with your wellbeing at the center.",
        "We care for local patients and for people who travel from other regions seeking a second opinion on upper cervical care—with the same clinical standard at every visit.",
      ],
    },
  },
  misiones: {
    tag: "Chiropractic missions",
    title: "Practice and training missions",
    lead: "Outreach in the community and sessions for chiropractors in training—the same clinical standard, different settings.",
    paragraphs: [
      "In the field we bring assessment, education, and specific adjustments to schools, correctional facilities, churches, and communities.",
      "Outreach dates, stories, and photos live in the missions list. Below is our training space for students and new graduates.",
    ],
    archiveCtaLabel: "See all our missions",
    ctaLabel: "Interested in joining? Chat directly with the doctor",
    arte: {
      tag: "Developing the chiropractic art",
      title: "Solidify what you learned before clinic",
      paragraphs: [
        "We are not locked into one technique in a rigid way: we work the chiropractic art with clinical reasoning, deliberate repetition, and Dr. Kevin’s guidance.",
        "We especially go deep on knee chest: setup, line of drive, contact, and checking so the adjustment stays specific and reproducible.",
        "If you are still in school or just graduated and want to reinforce what you learned, this section is for you—it is not a field outreach mission.",
      ],
      image: {
        alt: "Dr. Kevin Ernesto practicing a knee chest adjustment on a portable table",
      },
    },
    archiveTitle: "All our missions",
    archiveLead: "Practice days outside the clinic: the story, photos, and dates for each outreach.",
    archiveParagraphs: [
      "Schools, correctional facilities, churches, and communities where we share assessment, education, and specific adjustments when appropriate.",
      "Pick a mission to read the context, see the gallery, and message the doctor if you want to join or suggest a venue.",
    ],
    introImage: {
      alt: "Chiropractic practice day in the community",
    },
    archiveImage: {
      alt: "Illustration: chiropractic missions in Atlántico department, based in Barranquilla",
    },
    missions: [
      {
        id: "mision-carcel-2027",
        typeLabel: "Correctional facility",
        title: "Mission at a correctional facility",
        location: "Barranquilla and metropolitan area",
        summary:
          "Upper cervical health education and chiropractic assessment for incarcerated people and support staff.",
        paragraphs: [
          "Upcoming mission scheduled for 2027. We will publish the full story, learnings, and photos here once Dr. Kevin confirms the final venue and date.",
        ],
      },
      {
        id: "mision-colegio",
        typeLabel: "Schools and educational centers",
        title: "Missions in educational centers",
        location: "Schools, SENA, and educational outreach in the region",
        summary:
          "Wellness stations and talks in schools and training centers: posture, screens, neck care, and targeted assessments for students and teachers.",
        paragraphs: [
          "One mission track for all educational outreach: schools, health fairs, SENA, and any space where students and trainers learn about the spine and nervous system.",
          "The same clinical standard as in office care, adapted to the classroom or booth: spine model, Q&A, and support when appropriate.",
        ],
      },
      {
        id: "mision-iglesia",
        typeLabel: "Church and community",
        title: "Church and community mission",
        location: "Faith community in Barranquilla",
        summary:
          "Wellness gathering, cervical education, and chiropractic support for congregants and neighbors.",
        paragraphs: [
          "Story and gallery from the community mission. Images will appear here as soon as they are available.",
        ],
      },
    ],
  },
  especialidad: {
    tag: "Our specialty",
    title: "Upper cervical chiropractic specialists",
    lead:
      "We focus on the most sensitive link between your brain and body: the upper cervical spine—atlas (C1) and axis (C2). We help patients with neurological compression patterns such as:",
    ctaLabel: "Do these symptoms sound familiar? Talk to a specialist",
    symptoms: [
      { icon: "Orbit", title: "Vertigo and dizziness", text: "A constant sense of imbalance." },
      { icon: "Brain", title: "Migraines and headaches", text: "Chronic, disabling head pain." },
      { icon: "AudioLines", title: "Tinnitus", text: "Ringing or noise in the ears." },
      {
        icon: "ScanFace",
        title: "Trigeminal neuralgia",
        text: "Sharp, shock-like pain on one side of the face.",
      },
    ],
  },
  metodo: {
    tag: "Our approach",
    title: "Not force for force’s sake. Neurological precision.",
    paragraphs: [
      "Upper cervical care is like fine-tuning the communication between your brain and your body. Through careful evaluation we identify which cervical segment is interfering with your nervous system.",
      "We apply a specific adjustment to reduce pressure on the nerve, support alignment, and allow your body’s innate healing capacity to work—naturally and without unnecessary rough movements.",
    ],
    pillars: [
      { icon: "ClipboardCheck", title: "Advanced assessment", text: "Pinpoint the affected segment" },
      { icon: "Crosshair", title: "Specific adjustment", text: "Gentle, precise—not generic" },
      { icon: "Leaf", title: "Natural healing", text: "Support the body’s own recovery" },
    ],
  },
  causa: {
    tag: "Raising awareness",
    title: "Your pain is not your body’s mistake—it’s a communication breakdown.",
    paragraphs: [
      "Your cervical vertebrae—the bones of your neck—have a vital job: protecting the nerves that carry signals from your brain to your entire body.",
      "What happens when you live with high stress, an accident, or a traumatic impact? Muscle tension rises, and if one or more cervical vertebrae shift out of their natural position, the following domino effect begins:",
    ],
    figcaption: "Dr. Kevin Ernesto · Quiropráctica de Colombia",
    steps: [
      { icon: "UnfoldVertical", num: "01", title: "Misalignment", text: "The vertebra loses its axis." },
      { icon: "Zap", num: "02", title: "Neurological pressure", text: "The bone pinches or compresses the nerve." },
      { icon: "Flame", num: "03", title: "Inflammation", text: "The nerve inflames and brain signals are disrupted." },
      { icon: "CircleAlert", num: "04", title: "Dysfunction", text: "Chronic symptoms appear and keep you from living at ease." },
    ],
  },
  nosotros: {
    tag: "Who we are",
    title: "Raising the standard of health in Colombia",
    paragraphs: [
      "Quiropráctica de Colombia, led by Dr. Kevin Ernesto, was founded with a clear mission: to help people break the cycle of temporary medication and offer a natural, real, sustainable solution.",
      "We are a clinic focused on structural neurological care. We believe the human body has no limits when its communication system is free of interference. Our commitment is first-class chiropractic care grounded in science, biomechanics, and measurable outcomes.",
    ],
    badges: [
      { icon: "Leaf", value: "100%", label: "Natural approach" },
      { icon: "Bone", value: "C1–C3", label: "Upper cervical zone" },
      { icon: "UserRound", value: "Dr. Kevin", label: "Clinical leadership" },
    ],
  },
  redes: {
    tag: "Community",
    title: "Follow us on Instagram",
    lead: "Educational content, clinical stories, and updates from the clinic and Dr. Kevin.",
    clinic: {
      title: "Quiropráctica de Colombia",
      handle: "@quiropracticadecolombia",
      bullets: [
        "Education on cervical and neurological health",
        "Clinical approach and cases from Colombia",
        "Official community of patients and followers",
      ],
      buttonLabel: "View clinic profile",
    },
    doctor: {
      title: "Dr. Kevin Ernesto Castro",
      handle: "@kevinfixme",
      bullets: [
        "Specific chiropractor — neurological precision",
        "Professional, approachable content with patients",
        "Clinical references and Dr. Kevin’s background",
      ],
      buttonLabel: "View doctor profile",
    },
  },
  contact: {
    address: "Gabianelly Shopping Center, Cl. 84 #46 Local #7, 2nd floor, Barranquilla",
  },
  contactPage: {
    tag: "Contact",
    title: "Take the first step toward feeling better",
    lead: "Stop chasing symptoms—start addressing the cause.",
    mapTitle: "Clinic location",
    mapAddress: "Gabianelly Shopping Center · Cl. 84 #46 Local #7, 2nd floor · Barranquilla, Atlántico",
    mapButtonLabel: "Open in Google Maps",
  },
  googleReviews: {
    items: [
      {
        author: "Jesús Reza",
        rating: 5,
        text: "I want to express my deepest gratitude to this wonderful office. Here I found not only physical, mental, and spiritual relief, but genuine care, teaching, listening, and real support. Every visit has been a lesson about my body and a reconnection with my health. Thank you for the relief, the wellbeing, and for reminding me that the body can heal when guided with respect and knowledge.",
      },
      {
        author: "Keydis Barranco",
        rating: 5,
        text: "I am so grateful I found this place. After options that only gave temporary relief, I tried chiropractic for bruxism, neck and back pain. Since starting with Dr. Kevin I have felt incredible relief. In two weeks I noticed a big difference in my quality of life. His approach really works. If you want a natural alternative for pain and better health, I recommend it without hesitation.",
      },
      {
        author: "Roberto Tinoco",
        rating: 5,
        text: "I came to Dr. Kevin for wellness and chronic muscle issues in shoulders, tendinitis, lower back, and tightness. From the first adjustment, with his professional, science-based approach, I have improved in my health and even in sleep. Quiropráctica de Colombia is a space of positive energy, peace, and calm. I am very grateful I found them.",
      },
      {
        author: "Emmanuel Indaburo Arrieta",
        rating: 5,
        text: "Four sessions and my spine is aligned. Headaches and hip pain dropped dramatically. The rest and peace you feel when your body is aligned is an experience you should not miss. The care they give everyone is outstanding. Thank you for everything.",
      },
      {
        author: "Jeison Morales",
        rating: 5,
        text: "At first I was afraid, but the doctor’s videos gave me confidence. The experience is 10/10—they treat you extremely well. Dr. Kevin has a gifted touch; fear from the videos is worse than what the adjustment actually feels like. I had a lot of neck and foot pain, and since treatment my quality of life has improved a lot. I am more aware of my spine.",
      },
      {
        author: "IG Telecomunicaciones",
        rating: 5,
        text: "I could go on all day about why everyone should visit Quiropráctica de Colombia. One hundred percent recommended. Not only my spine but my life feels in harmony and alignment. No more lower back pain is the least of what I can thank them for. Wonderful energy, knowledge, and vocation.",
      },
      {
        author: "Camilo Llinas",
        rating: 5,
        text: "I arrived with spinal discomfort treated by my insurer with only temporary relief. Here they helped my recovery and today I feel full of energy, moving and exercising without pain. I regained my confidence. Thank you, Dr. Kevin.",
      },
      {
        author: "Angela M",
        rating: 5,
        text: "I am so glad I found Dr. Kevin. After only two visits I felt better than after ten conventional therapy sessions. I suffered unbearable pain for a year and now I can exercise again without fear. I am almost fully recovered. If you have back pain, book a consultation—you will not regret it.",
      },
      {
        author: "Juan David Rodríguez",
        rating: 5,
        text: "When we were desperate for my father—eight years of intense headaches, migraine, vertigo, dizziness—we found Dr. Kevin Ernesto. We traveled from Boyacá to Barranquilla seeking healing. Today his pain has dropped greatly, he moves better, and his smile is back. Chiropractic addressed the cause, not just the symptom. Thank you for your knowledge, dedication, and care.",
      },
    ],
  },
};

export const HERO_UI_ES = {
  ctaPrimary: "Agenda tu consulta de diagnóstico hoy",
  ctaSecondary: "Entender la causa",
  scrollNext: "Ir a la siguiente sección",
};

export const HERO_UI_EN = {
  ctaPrimary: "Book your diagnostic consultation today",
  ctaSecondary: "Understand the cause",
  scrollNext: "Go to next section",
};

export const REVIEWS_UI_EN = {
  tag: "Real patients",
  title: "What they say on Google Maps",
  lead: "Stories from people who trusted their healing process with us.",
  prev: "Previous",
  next: "Next",
  chooseReview: "Choose review",
  seeOnMaps: "See all on Google Maps",
  starsAria: (rating: number) => `${rating} out of 5 stars`,
};

export const REVIEWS_UI_ES = {
  tag: "Pacientes reales",
  title: "Lo que dicen en Google Maps",
  lead: "Testimonios reales de quienes confiaron en su proceso de sanación.",
  prev: "Anterior",
  next: "Siguiente",
  chooseReview: "Elegir reseña",
  seeOnMaps: "Ver todas en Google Maps",
  starsAria: (rating: number) => `${rating} de 5 estrellas`,
};

export const INSTAGRAM_UI_ES = {
  followers: "Seguidores",
  posts: "Publicaciones",
  following: "Siguiendo",
};

export const INSTAGRAM_UI_EN = {
  followers: "Followers",
  posts: "Posts",
  following: "Following",
};

export const CONTACT_CARD_UI_ES = {
  addressTitle: "Dirección",
  addressLines: [
    "Centro Comercial Gabianelly, Cl. 84 #46 Local #7, 2.º piso,",
    "Nte. Centro Histórico, Barranquilla, Atlántico",
  ],
  openMaps: "Abrir en Google Maps",
  whatsappTitle: "WhatsApp",
  emailTitle: "Correo",
  bookWhatsApp: "Agendar mi primera cita por WhatsApp",
  mapIframeTitle: "Mapa — Quiropráctica de Colombia, Barranquilla",
};

export const CONTACT_CARD_UI_EN = {
  addressTitle: "Address",
  addressLines: [
    "Gabianelly Shopping Center, Cl. 84 #46 Local #7, 2nd floor,",
    "North Historic Center, Barranquilla, Atlántico",
  ],
  openMaps: "Open in Google Maps",
  whatsappTitle: "WhatsApp",
  emailTitle: "Email",
  bookWhatsApp: "Book my first visit on WhatsApp",
  mapIframeTitle: "Map — Quiropráctica de Colombia, Barranquilla",
};

export const LANDING_UI_ES = {
  skipToContent: "Saltar al contenido",
  causaGalleryAria: "Fotos del Dr. Kevin en la clínica",
  causaStepsAria: "Efecto dominó de la enfermedad",
  heroImgAlt: "Dr. Kevin Ernesto en su consultorio, quiropráctico especialista en cuidado cervical superior",
  causaImgAlt: "Dr. Kevin Ernesto en consultorio, especialista en cuidado cervical superior",
  metodoImgAlt: "Dr. Kevin Ernesto en consultorio durante evaluación clínica",
  nosotrosImgAlt: "Dr. Kevin Ernesto, director clínico de Quiropráctica de Colombia",
};

export const LANDING_UI_EN = {
  skipToContent: "Skip to content",
  causaGalleryAria: "Photos of Dr. Kevin at the clinic",
  causaStepsAria: "Domino effect of illness",
  heroImgAlt: "Dr. Kevin Ernesto in his office, upper cervical chiropractic specialist",
  causaImgAlt: "Dr. Kevin Ernesto in office, upper cervical care specialist",
  metodoImgAlt: "Dr. Kevin Ernesto during a clinical evaluation",
  nosotrosImgAlt: "Dr. Kevin Ernesto, clinical director of Quiropráctica de Colombia",
};

export const MISSION_GALLERY_UI_ES = {
  regionLabel: "Galerías de la misión",
  activity: "La misión en imágenes",
  venue: "Centro de operaciones",
  lodging: "Hospedaje y logística",
  comingSoon: "Fotos próximamente",
};

export const MISSION_GALLERY_UI_EN = {
  regionLabel: "Mission photo galleries",
  activity: "The mission in photos",
  venue: "Operations center",
  lodging: "Lodging and logistics",
  comingSoon: "Photos coming soon",
};

export const MISIONES_INTRO_ASIDE_ES = {
  cardAria: "Tipos de misiones en el territorio",
  photoAria: "Imagen de misión en el territorio",
  photoAltFallback: "Jornada quiropráctica en la comunidad",
  kicker: "¿Dónde servimos?",
  note: "Fechas, relatos y fotos de cada salida en el listado completo.",
  items: [
    {
      icon: "GraduationCap" as const,
      label: "Colegios y centros educativos",
      href: "/misiones-quiropracticas#mision-colegio",
    },
    {
      icon: "Building2" as const,
      label: "Centros penitenciarios",
      href: "/misiones-quiropracticas#mision-carcel-2027",
    },
    {
      icon: "Church" as const,
      label: "Iglesias y comunidades de fe",
      href: "/misiones-quiropracticas#mision-iglesia",
    },
    {
      icon: "Users" as const,
      label: "Barrios, empresas y eventos",
      href: "/misiones-quiropracticas",
    },
  ],
};

export const MISIONES_INTRO_ASIDE_EN = {
  cardAria: "Types of field missions",
  photoAria: "Field mission photo",
  photoAltFallback: "Chiropractic outreach in the community",
  kicker: "Where we serve",
  note: "Dates, stories, and photos for each outreach are in the full list.",
  items: [
    {
      icon: "GraduationCap" as const,
      label: "Schools and institutions",
      href: "/misiones-quiropracticas#mision-colegio",
    },
    {
      icon: "Building2" as const,
      label: "Correctional facilities",
      href: "/misiones-quiropracticas#mision-carcel-2027",
    },
    {
      icon: "Church" as const,
      label: "Churches and faith communities",
      href: "/misiones-quiropracticas#mision-iglesia",
    },
    {
      icon: "Users" as const,
      label: "Neighborhoods, workplaces, events",
      href: "/misiones-quiropracticas",
    },
  ],
};

export const MISIONES_ARTE_UI_ES = {
  photoPlaceholder: "Foto del Dr. Kevin en práctica knee chest (próximamente)",
  photoAltFallback: "Dr. Kevin Ernesto en práctica quiropráctica",
};

export const MISIONES_ARTE_UI_EN = {
  photoPlaceholder: "Photo of Dr. Kevin practicing knee chest (coming soon)",
  photoAltFallback: "Dr. Kevin Ernesto during chiropractic practice",
};

export const MISIONES_UI_ES = {
  galleryPlaceholder: "Espacio para 2–3 fotos de misiones (próximamente)",
  upcomingBadge: "Próxima misión",
  featuredWa: "Quiero participar en esta misión",
};

export const MISIONES_UI_EN = {
  galleryPlaceholder: "Space for 2–3 mission photos (coming soon)",
  upcomingBadge: "Upcoming mission",
  featuredWa: "I want to join this mission",
};

export const MISIONES_ARCHIVE_UI_ES = {
  backToHome: "← Volver a la página principal",
  listAria: "Listado de misiones quiroprácticas",
  missionWa: "Quiero participar en esta misión",
  upcomingBadge: "Próxima misión",
};

export const MISIONES_ARCHIVE_UI_EN = {
  backToHome: "← Back to home",
  listAria: "Chiropractic missions list",
  missionWa: "I want to join this mission",
  upcomingBadge: "Upcoming mission",
};

export const FORM_UI_ES = {
  title: "Solicitud de consulta",
  desc: "Completa este formulario. La información llegará al correo de la clínica para que el Dr. Kevin haga el filtro inicial.",
  name: "Nombre completo",
  phone: "Teléfono / WhatsApp",
  emailOptional: "Correo (opcional)",
  symptom: "Síntoma principal",
  message: "Cuéntanos brevemente tu caso",
  namePlaceholder: "Tu nombre",
  emailPlaceholder: "correo@ejemplo.com",
  messagePlaceholder: "Desde cuándo tienes el síntoma, qué has probado, etc.",
  selectPlaceholder: "Selecciona una opción",
  symptoms: [
    "Vértigo o mareos",
    "Migrañas o cefaleas",
    "Tinnitus (zumbido)",
    "Neuralgia del trigémino",
    "Otro / varios síntomas",
  ],
  submit: "Enviar solicitud al doctor",
  noteBefore: "También puedes escribir directo por",
  errorRequired: "Completa los campos obligatorios.",
  sending: "Enviando solicitud…",
  subjectPrefix: "Nuevo paciente web —",
  hiddenSubject: "Nuevo paciente web — Quiropráctica de Colombia",
};

export const FORM_UI_EN = {
  title: "Consultation request",
  desc: "Fill out this form. The information will go to the clinic email so Dr. Kevin can do an initial review.",
  name: "Full name",
  phone: "Phone / WhatsApp",
  emailOptional: "Email (optional)",
  symptom: "Main symptom",
  message: "Briefly tell us about your case",
  namePlaceholder: "Your name",
  emailPlaceholder: "email@example.com",
  messagePlaceholder: "When it started, what you have tried, etc.",
  selectPlaceholder: "Select an option",
  symptoms: [
    "Vertigo or dizziness",
    "Migraines or headaches",
    "Tinnitus (ringing)",
    "Trigeminal neuralgia",
    "Other / multiple symptoms",
  ],
  submit: "Send request to the doctor",
  noteBefore: "You can also message us directly on",
  errorRequired: "Please complete the required fields.",
  sending: "Sending request…",
  subjectPrefix: "New web patient —",
  hiddenSubject: "New web patient — Quiropráctica de Colombia",
};

export const WHATSAPP_UI_ES = { ariaLabel: "Escribir por WhatsApp" };
export const WHATSAPP_UI_EN = { ariaLabel: "Message us on WhatsApp" };

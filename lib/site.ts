export const SITE = {
  diagnosticoFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdi3ifasYId4NFLn8rGvRAeFel62G53Sz3GvNsG3onpUu1DUg/viewform",
  whatsapp: "573128493003",
  contactEmail: "quiropracticadecolombia@gmail.com",
  formEmail: "quiropracticadecolombia@gmail.com",
  instagram: {
    clinic: {
      username: "quiropracticadecolombia",
      followers: null as number | null,
      posts: null as number | null,
      following: null as number | null,
    },
    doctor: {
      username: "kevinfixme",
      followers: null as number | null,
      posts: null as number | null,
      following: null as number | null,
    },
  },
  waMessages: {
    diagnostico:
      "Hola, vengo desde la web de Quiropráctica de Colombia. Quiero agendar una consulta de diagnóstico.",
    sintomas:
      "Hola, me identifico con los síntomas que describen en la web y quisiera hablar con un especialista.",
    cita: "Hola, quiero agendar mi primera cita en Quiropráctica de Colombia.",
    general: "Hola, me gustaría obtener más información sobre Quiropráctica de Colombia.",
    misionPractica:
      "Hola, Dr. Kevin. Vi la sección de misiones quiroprácticas en la web de Quiropráctica de Colombia y me interesa participar o conocer más. ¿Podemos hablar?",
  },
} as const;

export type WaMessageKey = keyof typeof SITE.waMessages;

export function buildWaUrl(key: WaMessageKey) {
  const text = SITE.waMessages[key];
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

type MissionWaContext = {
  title: string;
  location?: string;
  eventDate?: string;
  categoryLabel?: string;
};

export function buildMissionWaUrl(mission: MissionWaContext) {
  const place = mission.location?.trim() || mission.title;
  const when = mission.eventDate?.trim() ? ` (${mission.eventDate.trim()})` : "";
  const kind = mission.categoryLabel ? ` — ${mission.categoryLabel}` : "";
  const text = `Hola, Dr. Kevin. Vi en la web la misión "${mission.title}"${kind}${when}, en ${place}, y me interesa participar o apoyar. ¿Podemos hablar?`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

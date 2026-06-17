import { SITE } from "@/lib/site";

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type ContactContent = {
  whatsapp: string;
  contactEmail: string;
  formEmail: string;
  address: string;
  mapsUrl: string;
  diagnosticoFormUrl: string;
};

export type GoogleReviewItem = {
  author: string;
  rating: number;
  text: string;
};

export type GoogleReviewsContent = {
  mapsUrl: string;
  items: GoogleReviewItem[];
};

export const DEFAULT_GOOGLE_REVIEWS: GoogleReviewsContent = {
  mapsUrl: "https://maps.app.goo.gl/7UGYRBFWCHzx1WNH7?g_st=aw",
  items: [
    {
      author: "Jesús Reza",
      rating: 5,
      text: "Hoy quiero expresar, desde lo más profundo de mi corazón, mi infinita gratitud a esta maravillosa oficina. Aquí no solo encontré alivio físico, mental y espiritual: encontré amor, enseñanza, escucha y un verdadero acompañamiento. Cada visita ha sido una experiencia de conciencia, de aprendizaje sobre mi cuerpo y de reconexión con mi salud. El cuidado, la vocación y la energía con la que trabajan se sienten, se honran y se agradecen. Gracias por el alivio, por el bienestar y por recordarme que el cuerpo tiene la capacidad de sanar cuando es guiado con respeto y conocimiento.",
    },
    {
      author: "Keydis Barranco",
      rating: 5,
      text: "Estoy muy agradecida de haber encontrado este lugar. Después de buscar alternativas que solo me daban alivio temporal, probé la quiropráctica por bruxismo, dolor en el cuello y espalda. Desde que comencé con el Dr. Kevin, he sentido un alivio increíble. En solo dos semanas noté una gran diferencia en mi calidad de vida. Su enfoque es realmente efectivo. Si buscas una alternativa natural para aliviar el dolor y mejorar tu salud, te lo recomiendo sin dudarlo.",
    },
    {
      author: "Roberto Tinoco",
      rating: 5,
      text: "Acudí al Dr. Kevin por bienestar y para resolver condiciones musculares crónicas que llevaban meses: hombros, tendinitis, espalda baja y contracturas. Desde el primer ajuste, con su enfoque profesional y científico, he sentido mejoría en mi salud e incluso en otros aspectos como el descanso. Quiropráctica de Colombia es un espacio de energía positiva, paz y tranquilidad. Me siento muy agradecido de haberlos encontrado.",
    },
    {
      author: "Emmanuel Indaburo Arrieta",
      rating: 5,
      text: "Cuatro terapias y mi columna totalmente alineada. Reduje muchísimo los dolores de cabeza y el dolor en la cadera. El descanso y la paz que se siente al tener todos tus huesos alineados es una experiencia que no te puedes perder. La atención que dan hacia todas las personas es la mejor. Muchas gracias por todo.",
    },
    {
      author: "Jeison Morales",
      rating: 5,
      text: "Al principio tenía miedo, pero los videos del doctor me dieron confianza. La experiencia es 10/10: te tratan demasiado bien. El doctor tiene una mano mágica; el miedo es mayor al ver los videos que lo que realmente se siente en el ajuste. Tenía mucho dolor en el cuello y en el pie, y desde que me atiendo ha mejorado mucho mi calidad de vida. Ya no siento esos dolores y me siento más consciente de mi columna.",
    },
    {
      author: "IG Telecomunicaciones",
      rating: 5,
      text: "Podría quedarme todo el día diciendo las razones por las que todos deberían ir a Quiropráctica de Colombia. Mil por ciento recomendados. No solo mi columna, sino también mi vida está en armonía y alineación. Ya no sentir dolor en mi espalda baja es lo mínimo que puedo agradecer. Son personas con una energía y conocimiento maravillosos, dispuestos a servir y con una vocación increíble.",
    },
    {
      author: "Camilo Llinas",
      rating: 5,
      text: "Llegué con un malestar en la columna que había sido tratado por mi EPS con alivios momentáneos. Aquí me ayudaron en mi recuperación y hoy me siento lleno de energía, puedo moverme y hacer actividades físicas sin malestar. Recuperé mi autoestima. Mil gracias al Dr. Kevin.",
    },
    {
      author: "Angela M",
      rating: 5,
      text: "Me alegra muchísimo haber encontrado al Dr. Kevin. Después de solo dos visitas me sentí mejor que tras diez sesiones de terapia convencional. Sufrí un dolor insoportable durante un año y ahora puedo hacer ejercicio otra vez sin miedo. Estoy casi completamente recuperada. Si sufres dolor de espalda, pide una consulta. No te arrepentirás.",
    },
    {
      author: "Juan David Rodríguez",
      rating: 5,
      text: "Estando al borde de la desesperación por no encontrar solución para mi padre — dolores de cabeza intensos durante ocho años, migraña, vértigo, mareo y más — encontramos al Dr. Kevin Ernesto. Viajamos desde Boyacá a Barranquilla buscando su sanación. Hoy los dolores le han disminuido demasiado, se moviliza mejor y volvió su sonrisa. La quiropráctica sanó la causa del dolor, no solo el síntoma. Mil gracias por poner al servicio de todos tu conocimiento, dedicación y amor.",
    },
  ],
};

export const DEFAULT_HERO: HeroContent = {
  eyebrow: "Cuidado cervical superior · Barranquilla",
  title: "¿Sufres de vértigo, migrañas o zumbidos en los oídos y los fármacos ya no funcionan?",
  subtitle:
    "Descubre la raíz neurológica de tu dolor. En Quiropráctica de Colombia no «traqueamos huesos»: liberamos tu sistema nervioso desde las vértebras cervicales para que tu cuerpo sane de forma 100% natural.",
};

export const DEFAULT_CONTACT: ContactContent = {
  whatsapp: SITE.whatsapp,
  contactEmail: SITE.contactEmail,
  formEmail: SITE.formEmail,
  address: "Centro Comercial Gabianelly, Cl. 84 #46 Local #7, 2.º piso, Barranquilla",
  mapsUrl: "https://maps.app.goo.gl/7UGYRBFWCHzx1WNH7",
  diagnosticoFormUrl: SITE.diagnosticoFormUrl,
};

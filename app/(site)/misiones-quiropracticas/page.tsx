import MisionesArchivePage from "@/components/MisionesArchivePage";
import { getSiteContent } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Misiones quiroprácticas | Quiropráctica de Colombia",
  description:
    "Misiones de práctica del Dr. Kevin Ernesto en colegios, comunidades, iglesias y centros penitenciarios — fechas, relatos y fotos.",
};

export default async function MisionesQuiropracticasPage() {
  const initialContent = await getSiteContent();
  return <MisionesArchivePage initialContent={initialContent} />;
}

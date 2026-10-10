import LandingPage from "@/components/LandingPage";
import { getSiteContent } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialContent = await getSiteContent();
  return <LandingPage initialContent={initialContent} />;
}

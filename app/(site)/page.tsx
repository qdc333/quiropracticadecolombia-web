import LandingPage from "@/components/LandingPage";
import { getMissions, getPublicContent } from "@/lib/api";

export default async function Home() {
  const { hero, contact } = await getPublicContent();
  const missions = await getMissions(6);

  return <LandingPage hero={hero} contact={contact} missions={missions} />;
}

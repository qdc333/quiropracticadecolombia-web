import LandingPage from "@/components/LandingPage";
import { DEFAULT_CONTACT, DEFAULT_HERO } from "@/lib/content";

export default function Home() {
  return <LandingPage hero={DEFAULT_HERO} contact={DEFAULT_CONTACT} />;
}

import HomeContent from "@/components/HomeContent";
import { buildMetadata } from "@/config/seo";

export const metadata = buildMetadata("sv");

export default function Page() {
  return <HomeContent initialLang="sv" />;
}

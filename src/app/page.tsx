import HomeContent from "@/components/HomeContent";
import { buildMetadata } from "@/config/seo";

export const metadata = buildMetadata("fi");

export default function Page() {
  return <HomeContent initialLang="fi" />;
}

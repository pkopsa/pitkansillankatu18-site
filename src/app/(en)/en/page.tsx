import HomeContent from "@/components/HomeContent";
import { buildMetadata } from "@/config/seo";

export const metadata = buildMetadata("en");

export default function Page() {
  return <HomeContent initialLang="en" />;
}

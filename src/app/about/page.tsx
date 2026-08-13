import SiteShell from "@/components/SiteShell";
import About from "@/components/About";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <SiteShell settings={content.settings} contact={content.contact}>
      <div className="pt-24">
        <About content={content.about} showOfferings showEducation />
      </div>
    </SiteShell>
  );
}

import SiteShell from "@/components/SiteShell";
import Contact from "@/components/Contact";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <SiteShell settings={content.settings} contact={content.contact}>
      <div className="pt-24">
        <Contact content={content.contact} />
      </div>
    </SiteShell>
  );
}

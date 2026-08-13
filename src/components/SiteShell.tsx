import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ContactContent, SiteSettings } from "@/lib/types";
import { DEFAULT_CONTACT, DEFAULT_SETTINGS } from "@/lib/data";

interface SiteShellProps {
  children: React.ReactNode;
  settings?: SiteSettings;
  contact?: ContactContent;
}

export default function SiteShell({
  children,
  settings = DEFAULT_SETTINGS,
  contact = DEFAULT_CONTACT,
}: SiteShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <div className="flex-1">{children}</div>
      <Footer settings={settings} contact={contact} />
    </div>
  );
}

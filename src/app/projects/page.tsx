import SiteShell from "@/components/SiteShell";
import Projects from "@/components/Projects";
import { getProjects, getSiteContent } from "@/lib/content";
import type { ProjectCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

const CATEGORIES: ProjectCategory[] = ["Frontend", "Full Stack", "AI Coding"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, content, projects] = await Promise.all([
    searchParams,
    getSiteContent(),
    getProjects(),
  ]);

  const initialCategory = CATEGORIES.includes(category as ProjectCategory)
    ? (category as ProjectCategory)
    : "Full Stack";

  return (
    <SiteShell settings={content.settings} contact={content.contact}>
      <div className="pt-24">
        <Projects projects={projects} initialCategory={initialCategory} />
      </div>
    </SiteShell>
  );
}

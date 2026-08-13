import SiteShell from "@/components/SiteShell";
import Projects from "@/components/Projects";
import { getProjects, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

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

  const categories = content.projectCategories;
  const initialCategory = categories.includes(category || "")
    ? (category as string)
    : categories.includes("Full Stack")
      ? "Full Stack"
      : categories[0];

  return (
    <SiteShell settings={content.settings} contact={content.contact}>
      <div className="pt-24">
        <Projects
          projects={projects}
          initialCategory={initialCategory}
          categories={categories}
        />
      </div>
    </SiteShell>
  );
}

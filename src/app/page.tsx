import HomeClient from "@/components/HomeClient";
import { getHomepageProjects, getProjects, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, projects, homepageProjects] = await Promise.all([
    getSiteContent(),
    getProjects(),
    getHomepageProjects(),
  ]);
  return (
    <HomeClient
      content={content}
      projects={projects}
      homepageProjects={homepageProjects}
    />
  );
}

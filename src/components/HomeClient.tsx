"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import WhatIOffer from "@/components/WhatIOffer";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProjectCTA from "@/components/ProjectCTA";
import Preloader from "@/components/Preloader";
import SiteShell from "@/components/SiteShell";
import type { HomeSectionKey, Project, SiteContent } from "@/lib/types";
import { DEFAULT_HOME_SECTIONS } from "@/lib/types";

interface HomeClientProps {
  content: SiteContent;
  projects: Project[];
  homepageProjects: Project[];
}

export default function HomeClient({
  content,
  projects,
  homepageProjects,
}: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  const sections =
    content.homeLayout?.sections?.length > 0
      ? content.homeLayout.sections
      : DEFAULT_HOME_SECTIONS;

  const renderSection = (key: HomeSectionKey) => {
    switch (key) {
      case "hero":
        return <Hero key="hero" content={content.hero} />;
      case "offerings":
        return (
          <WhatIOffer
            key="offerings"
            offerings={content.about.offerings}
            compact
          />
        );
      case "skills":
        return <Skills key="skills" skills={content.skills} />;
      case "projects":
        return (
          <Projects
            key="projects"
            projects={projects}
            homepageProjects={homepageProjects}
            preview
          />
        );
      case "cta":
        return <ProjectCTA key="cta" content={content.cta} />;
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <SiteShell settings={content.settings} contact={content.contact}>
          {sections
            .filter((section) => section.enabled)
            .map((section) => renderSection(section.key))}
        </SiteShell>
      )}
    </main>
  );
}

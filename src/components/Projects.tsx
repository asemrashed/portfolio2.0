"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project, ProjectCategory } from "@/lib/types";
import { DEFAULT_PROJECT_CATEGORIES } from "@/lib/types";
import { PROJECTS } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const HOME_LIMIT = 3;

interface ProjectsProps {
  projects?: Project[];
  homepageProjects?: Project[];
  preview?: boolean;
  initialCategory?: ProjectCategory;
  categories?: string[];
}

export default function Projects({
  projects = PROJECTS,
  homepageProjects,
  preview = false,
  initialCategory,
  categories = [...DEFAULT_PROJECT_CATEGORIES],
}: ProjectsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const tabs = categories.length ? categories : [...DEFAULT_PROJECT_CATEGORIES];
  const fallbackCategory = tabs.includes("Full Stack")
    ? "Full Stack"
    : tabs[0];
  const resolvedInitial =
    initialCategory && tabs.includes(initialCategory)
      ? initialCategory
      : fallbackCategory;

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>(resolvedInitial);

  useEffect(() => {
    setActiveCategory(resolvedInitial);
  }, [resolvedInitial]);

  const homePool =
    homepageProjects && homepageProjects.length > 0
      ? homepageProjects
      : projects
          .filter((p) => p.showInHomepage)
          .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

  const categorySource = preview ? homePool : projects;

  const filteredProjects = categorySource
    .filter((project) => project.category === activeCategory)
    .sort((a, b) =>
      preview
        ? (a.homeOrder ?? 0) - (b.homeOrder ?? 0)
        : (a.order ?? 0) - (b.order ?? 0)
    );

  const visibleProjects = preview
    ? filteredProjects.slice(0, HOME_LIMIT)
    : filteredProjects;

  useGSAP(
    () => {
      gsap.fromTo(
        ".project-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [activeCategory, visibleProjects.length, preview] }
  );

  return (
    <section id="projects" ref={containerRef} className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-saira text-center mb-4 text-primary">
          {preview ? "Featured Projects" : "All Projects"}
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          A selection of projects that showcase my skills in frontend, full-stack, and
          AI-assisted development.
        </p>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "min-w-[120px]",
                activeCategory === category && "bg-primary text-primary-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div key={`${project._id || project.name}-${index}`} className="project-item h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No projects in this category{preview ? " selected for homepage" : ""} yet.
          </p>
        )}

        {preview && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary text-primary hover:!bg-primary hover:!text-[#111827] dark:hover:!bg-primary dark:hover:!text-[#111827]"
              asChild
            >
              <Link href={`/projects?category=${encodeURIComponent(activeCategory)}`}>
                Show More Projects
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

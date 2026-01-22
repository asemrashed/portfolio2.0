"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, Project } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["Frontend", "Full Stack", "AI Coding"] as const;

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("Full Stack");
    const [displayedCount, setDisplayedCount] = useState(6);

    const filteredProjects = PROJECTS.filter(project => project.category === activeCategory);
    const visibleProjects = filteredProjects.slice(0, displayedCount);

    useGSAP(() => {
        // Simple animation when category changes needs to be handled carefully or just animate on scroll
        gsap.fromTo(".project-item", 
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
                }
            }
        );
    }, { scope: containerRef, dependencies: [activeCategory, displayedCount] });

    return (
        <section id="projects" ref={containerRef} className="py-20 px-6 bg-background">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-saira text-center mb-4 text-primary">
                    Featured Projects
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                    A selection of projects that showcase my skills in frontend, full-stack, and AI-assisted development.
                </p>

                {/* Categories Tabs */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            onClick={() => {
                                setActiveCategory(category);
                                setDisplayedCount(6); // Reset pagination on category change
                            }}
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
                        <div key={`${project.name}-${index}`} className="project-item h-full">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {filteredProjects.length > displayedCount && (
                    <div className="mt-12 text-center">
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={() => setDisplayedCount(prev => prev + 6)}
                        >
                            Show More Projects
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}

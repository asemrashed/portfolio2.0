"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".project-item", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section id="projects" ref={containerRef} className="py-20 px-6 bg-background">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-saira text-center mb-4 text-primary">
                    Featured Projects
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    A selection of projects that showcase my skills in frontend and full-stack development.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <div key={index} className="project-item h-full">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

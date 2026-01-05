"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".skill-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section id="skills" ref={containerRef} className="py-20 px-6 bg-secondary/10">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-saira text-center mb-12 text-primary">
                    Technical Expertise
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {SKILLS.map((category) => (
                        <Card key={category.category} className="skill-card hover:shadow-lg transition-shadow border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-xl text-center text-primary">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2 justify-center">
                                {category.items.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                                        {skill}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "@/lib/data";
import Image from "next/image";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Line animation
        gsap.from(".timeline-line", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            }
        });

        // Items animation
        gsap.from(".timeline-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
            }
        });
    }, { scope: containerRef });

    return (
        <section id="skills" ref={containerRef} className="py-20 px-4 md:py-16 w-full max-w-[375px] md:max-w-4xl lg:max-w-6xl mx-auto font-display">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-2xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4 font-saira text-primary">Expertise & Skills</h1>
                <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="relative">
                 {/* Central Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/80 via-primary/40 to-transparent -translate-x-1/2 timeline-line"></div>
                
                {SKILLS.map((category, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div key={category.category} className={cn(
                            "relative flex mb-0 md:mb-2 timeline-item",
                            isLeft ? "justify-start" : "justify-end -mt-4 md:-mt-8"
                        )}>
                             {/* Dot */}
                            <div className="timeline-dot top-5"></div>
                            
                            <div className={cn(
                                "w-[47%] md:w-[45%]",
                                isLeft ? "pr-3 md:pr-10" : "pl-3 md:pl-10"
                            )}>
                                <div className={cn(
                                    "glass-card rounded-xl p-3 md:p-6",
                                    isLeft ? "text-right" : "text-left"
                                )}>
                                    <h2 className="text-primary font-bold text-[10px] md:text-xs mb-2 md:mb-4 uppercase tracking-[0.2em]">
                                        {category.category}
                                    </h2>
                                    <div className={cn(
                                        "flex flex-wrap gap-1.5 md:gap-2",
                                        isLeft ? "justify-end" : "justify-start"
                                    )}>
                                        {category.items.map((skill) => (
                                            <div key={skill.name} className="tech-badge">
                                                 <div className="relative w-3 h-3 md:w-4 md:h-4">
                                                    <Image 
                                                        src={skill.icon} 
                                                        alt={skill.name} 
                                                        fill 
                                                        className="object-contain"
                                                        unoptimized
                                                    />
                                                </div>
                                                <span className="text-xs md:text-base font-semibold text-foreground relative z-10">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Optional text for 'Learning' category or others if needed */}
                                    {category.category === "Learning" && (
                                         <div className="mt-3 md:mt-4 pt-3 border-t border-white/5">
                                            <p className="text-[8px] md:text-[10px] text-slate-400 leading-tight">Actively expanding expertise in scalable architecture and type-safe development.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-10 md:mt-16 text-center">
                <p className="text-muted-foreground text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold">End-to-End Solutions</p>
            </div>
        </section>
    );
}

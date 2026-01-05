"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="about-item text-3xl md:text-4xl font-bold font-saira text-center mb-12 text-primary">
          About Me
        </h2>
        
        <Card className="about-item bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center text-muted-foreground">
               A bit about <span className="text-primary">{PROFILE.name.split(" ")[0]}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed text-foreground/90">
            {PROFILE.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { PROFILE } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Entrance animations
      const tl = gsap.timeline();

      tl.from(".hero-text", {
        x: -50, // From Left
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
      .from(".hero-image", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");

      // Typewriter effect
      gsap.to(textRef.current, {
        duration: 4,
        text: {
            value: PROFILE.name,
            delimiter: ""
        },
        ease: "none",
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="hero-text text-xl md:text-2xl font-medium text-muted-foreground">
            Hey there, I&apos;m
          </h2>
          <h1 className="hero-text text-4xl md:text-6xl font-bold font-saira text-primary">
             <span ref={textRef}></span>
             <span className="animate-pulse">|</span>
          </h1>
          <h3 className="hero-text text-2xl md:text-3xl font-medium text-foreground">
            {PROFILE.title}
          </h3>
          
          <div className="hero-text flex flex-wrap gap-4 justify-center md:justify-start pt-4">
             <Button size="lg" className="rounded-full px-8" asChild>
                <a href="/resume.pdf" target="_blank">View Resume</a>
             </Button>
             <div className="flex bg-card p-1 rounded-full border shadow-sm">
                <Button variant="ghost" size="icon" className="rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                    <a href={PROFILE.social.linkedin} target="_blank"><Linkedin className="h-5 w-5"/></a>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-800 hover:text-black hover:bg-gray-100" asChild>
                    <a href={PROFILE.social.github} target="_blank"><Github className="h-5 w-5"/></a>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-50" asChild>
                    <a href={PROFILE.social.facebook} target="_blank"><Facebook className="h-5 w-5"/></a>
                </Button>
                 <Button variant="ghost" size="icon" className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50" asChild>
                    <a href={`mailto:${PROFILE.social.email}`}><Mail className="h-5 w-5"/></a>
                </Button>
             </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image relative flex justify-center">
           {/* Decorative background blob */}
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/30 rounded-full blur-3xl transform scale-90 -z-10 animate-pulse-slow"></div>
           
           <div className="relative w-64 h-64 md:w-96 md:h-96">
              {/* Replace with actual image path if available, using placeholder for now if file not present */}
              {/* Assuming portfolio.png was in the root of old project, I should have copied it or have access to it via /portfolio.png */}
               <Image 
                src="/hero-illustration.svg" 
                alt={PROFILE.name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
               />
               {/* 
                 Note: I need to ensure the image exists. 
                 The old project used '/hero/Hand coding-amico.svg'.
                 I should copy that file to public/hero-illustration.svg or similar.
               */}
           </div>
        </div>
      </div>
    </section>
  );
}

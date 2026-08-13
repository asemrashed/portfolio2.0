"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Button } from "@/components/ui/button";
import ResumeDialog from "@/components/ResumeDialog";
import type { HeroContent } from "@/lib/types";
import { DEFAULT_HERO } from "@/lib/data";

gsap.registerPlugin(TextPlugin);

interface HeroProps {
  content?: HeroContent;
}

export default function Hero({ content = DEFAULT_HERO }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-greeting", {
        x: -50,
        opacity: 0,
        duration: 0.8,
      });

      const roles = content.titles.length
        ? content.titles
        : ["Front End Web Developer", "MERN Stack Web Developer", "Junior Web Developer"];

      const roleTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, paused: true });

      roles.forEach((role) => {
        roleTl.to(roleRef.current, {
          duration: 1,
          text: role,
          ease: "none",
        });
        roleTl.to({}, { duration: 1 });
        roleTl.to(roleRef.current, {
          duration: 0.5,
          text: "",
          ease: "none",
        });
      });

      tl.from(".hero-greeting", {
        duration: 0.1,
      }).to(nameRef.current, {
        duration: 0.5,
        text: {
          value: content.displayName,
          delimiter: "",
        },
        ease: "none",
        onStart: () => {
          roleTl.play();
        },
      }).from(
        ".hero-actions",
        {
          x: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        "+=0.2"
      );

      gsap.from(".hero-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    },
    { scope: containerRef, dependencies: [content.displayName, content.titles.join("|")] }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="hero-greeting text-xl md:text-2xl font-medium text-muted-foreground">
            {content.greeting}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold font-saira text-primary h-[1.2em]">
            <span ref={nameRef}></span>
            <span className="animate-pulse name-cursor">|</span>
          </h1>
          <h3 className="text-xl md:text-3xl font-medium text-foreground h-[1.5em] flex items-center justify-center md:justify-start">
            <span ref={roleRef} className="text-white/60"></span>
            <span className="animate-pulse ml-1 opacity-70">|</span>
          </h3>

          <div className="hero-actions flex flex-wrap gap-4 justify-center md:justify-start pt-6">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href={content.hireCtaHref}>{content.hireCtaLabel}</Link>
            </Button>
            <ResumeDialog variant="outline" className="rounded-full px-8" />
          </div>
        </div>

        <div className="hero-image relative flex justify-center items-center">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 z-0 scale-100 transform -translate-x-5 md:translate-x-0 translate-y-10">
              <Image
                src={content.heroBgImage}
                alt="Background Pattern"
                fill
                className="object-contain opacity-30 dark:opacity-20"
                priority
                unoptimized={content.heroBgImage.startsWith("http")}
              />
            </div>

            <Image
              src={content.heroImage}
              alt={content.displayName}
              fill
              className="object-contain drop-shadow-2xl -translate-x-5 md:translate-x-0 translate-y-20 z-10 scale-[1.3]"
              priority
              unoptimized={content.heroImage.startsWith("http")}
            />
            <div className="absolute inset-4 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

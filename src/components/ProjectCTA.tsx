"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import type { CtaContent } from "@/lib/types";
import { DEFAULT_CTA } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCTAProps {
  content?: CtaContent;
}

export default function ProjectCTA({ content = DEFAULT_CTA }: ProjectCTAProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/40 to-transparent px-8 py-12">
          <h2 className="cta-item text-3xl md:text-4xl font-bold font-saira text-primary mb-4">
            {content.title}
          </h2>
          <p className="cta-item text-muted-foreground mb-8 text-lg leading-relaxed">
            {content.body}
          </p>
          <div className="cta-item">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href={content.buttonHref}>{content.buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

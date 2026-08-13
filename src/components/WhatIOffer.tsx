"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Building2,
  Hospital,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Offering } from "@/lib/types";
import { DEFAULT_ABOUT } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Building2,
  Hospital,
  ShoppingBag,
};

interface WhatIOfferProps {
  offerings?: Offering[];
  compact?: boolean;
}

export default function WhatIOffer({
  offerings = DEFAULT_ABOUT.offerings,
  compact = false,
}: WhatIOfferProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".offer-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="offerings"
      ref={containerRef}
      className={compact ? "py-16 px-6 bg-secondary/5" : "py-20 px-6 bg-secondary/5"}
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="offer-item text-3xl md:text-4xl font-bold font-saira text-primary mb-3">
            What I Offer
          </h2>
          <p className="offer-item text-muted-foreground max-w-2xl mx-auto">
            {compact
              ? "End-to-end web systems for learning, business, healthcare, and online retail."
              : "I build practical, scalable web products tailored to real business workflows."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((item) => {
            const Icon = (item.icon && iconMap[item.icon]) || BookOpen;
            return (
              <div
                key={item.title}
                className="offer-item rounded-xl border border-primary/15 bg-card/40 p-5 hover:border-primary/40 transition-colors"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-saira font-semibold text-lg mb-2">{item.title}</h3>
                <p
                  className={
                    compact
                      ? "text-sm text-muted-foreground line-clamp-3"
                      : "text-sm text-muted-foreground"
                  }
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {compact && (
          <div className="offer-item mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href="/about">Learn more about me</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

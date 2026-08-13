"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WhatIOffer from "@/components/WhatIOffer";
import AboutSocialLinks from "@/components/AboutSocialLinks";
import type { AboutContent } from "@/lib/types";
import { DEFAULT_ABOUT } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  content?: AboutContent;
  showOfferings?: boolean;
  showEducation?: boolean;
}

export default function About({
  content = DEFAULT_ABOUT,
  showOfferings = true,
  showEducation = true,
}: AboutProps) {
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
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <section id="about" ref={containerRef} className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="about-item text-3xl md:text-4xl font-bold font-saira text-center mb-12 text-primary">
            About Me
          </h2>

          <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start mb-16">
            <div className="about-item flex flex-col items-center md:items-stretch gap-4 w-full max-w-[260px] mx-auto md:mx-0">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-primary/20 shrink-0">
                <Image
                  src={content.aboutImage}
                  alt="About"
                  fill
                  className="object-cover"
                  unoptimized={content.aboutImage.startsWith("http")}
                />
              </div>
              <AboutSocialLinks links={content.socialLinks || []} />
            </div>

            <Card className="about-item bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-muted-foreground">
                  A bit about <span className="text-primary">Myself</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed text-foreground/90">
                <div
                  className="about-richtext"
                  dangerouslySetInnerHTML={{ __html: content.body }}
                />
              </CardContent>
            </Card>
          </div>

          {showEducation && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="about-item">
                <h3 className="text-2xl font-saira font-bold text-primary mb-4">Education</h3>
                <div className="space-y-4">
                  {content.education.map((item) => (
                    <div
                      key={`${item.title}-${item.institution}`}
                      className="rounded-xl border border-primary/15 bg-card/40 p-5"
                    >
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-primary/90 text-sm mt-1">{item.institution}</p>
                      {item.period && (
                        <p className="text-xs text-muted-foreground mt-1">{item.period}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-item">
                <h3 className="text-2xl font-saira font-bold text-primary mb-4">Courses</h3>
                <div className="space-y-4">
                  {content.courses.map((item) => (
                    <div
                      key={`${item.title}-${item.provider}`}
                      className="rounded-xl border border-primary/15 bg-card/40 p-5"
                    >
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-primary/90 text-sm mt-1">{item.provider}</p>
                      {item.period && (
                        <p className="text-xs text-muted-foreground mt-1">{item.period}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {showOfferings && <WhatIOffer offerings={content.offerings} compact={false} />}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { PROFILE } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";
import ResumeDialog from "@/components/ResumeDialog";
import heroImage from "../../public/asem.png";
import bgForHero from "../../public/bgOfHero.png";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Greeting slide in from left
      tl.from(".hero-greeting", {
        x: -50,
        opacity: 0,
        duration: 0.8,
      });

      // 2. Name Typing (Once)
      tl.to(nameRef.current, {
        duration: 1.2,
        text: {
          value: "ASEM RASHED",
          delimiter: "",
        },
        ease: "none",
      });

      // 3. Roles Typing (Loop) - Starts after name
      const roles = ["Front End Web Developer", "MERN Stack Web Developer", "Junior Web Developer"];
      // Create paused timeline for roles
      const roleTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, paused: true });
      
      roles.forEach((role) => {
        roleTl.to(roleRef.current, {
          duration: 1, // Faster typing
          text: role,
          ease: "none",
        });
        roleTl.to({}, { duration: 1 }); // Wait
        roleTl.to(roleRef.current, {
            duration: 0.5,
            text: "",
            ease: "none"
        });
      });

      // Sequence everything in main timeline
      tl.from(".hero-greeting", {
        duration: 0.1,
      })
      .to(nameRef.current, {
        duration: 0.5, // Faster name typing
        text: {
          value: "ASEM RASHED",
          delimiter: "",
        },
        // I need the role to start before the name ends
        ease: "none",
        onStart: () => {
            roleTl.play(); // Start roles immediately after name
        },
      })
      // Show buttons slightly faster
      .from(".hero-actions", {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, "+=0.2");

      // Image animation
      gsap.from(".hero-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.2
      });
      
    },
    { scope: containerRef }
  );

  const handleScrollToContact = (e: React.MouseEvent) => {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if(contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
      }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >


      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="hero-greeting text-xl md:text-2xl font-medium text-muted-foreground">
            Hi there, It&apos;s
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
             <Button size="lg" className="rounded-full px-8" onClick={handleScrollToContact}>
                Hire Me
             </Button>
             
             <ResumeDialog variant="outline" className="rounded-full px-8" />
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image relative flex justify-center items-center">
           <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
               {/* Background Image specific to this area */}
               <div className="absolute inset-0 z-0 scale-100 transform -translate-x-5 md:translate-x-0 translate-y-10">
                   <Image 
                        src={bgForHero}
                        alt="Background Pattern"
                        fill
                        className="object-contain opacity-30 dark:opacity-20"
                        priority
                   />
               </div>

               <Image 
                src={heroImage} 
                alt={PROFILE.name}
                fill
                className="object-contain drop-shadow-2xl -translate-x-5 md:translate-x-0 translate-y-20 z-10 scale-[1.3]"
                priority
               />
               {/* Glowing effect behind the person */}
               <div className="absolute inset-4 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
           </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ResumeDialog from "./ResumeDialog";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = navLinks.map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break; 
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2 group"
          onClick={(e) => handleScrollTo(e, "#home")}
        >
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
             {/* Creating a fallback since we don't know if LOGO.png is transparent or suitable for circle, but assuming standard logo */}
             <img src="/LOGO.png" alt="Logo" className="object-cover w-full h-full" />
          </div>
          <span className="text-xl font-bold font-saira tracking-wider text-primary">
            ASEM RASHED
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.filter(link => link.name !== "Contact").map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors font-medium relative group",
                  isActive ? "text-primary" : "text-foreground hover:text-primary"
                )}
                onClick={(e) => handleScrollTo(e, link.href)}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
          
          <ResumeDialog variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />

          <Button variant="default" asChild>
            <Link href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
                Contact Me
            </Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left font-saira font-bold text-xl flex items-center gap-2">
                    <img src="/LOGO.png" alt="Logo" className="w-8 h-8 rounded-full" />
                    Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.filter(link => link.name !== "Contact").map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={(e) => handleScrollTo(e, link.href)}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                 
                <div className="flex flex-col gap-3 mt-4">
                    <ResumeDialog variant="outline" className="w-full justify-start" />
                    
                    <SheetClose asChild>
                        <Button className="w-full" asChild>
                            <Link href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
                                Contact Me
                            </Link>
                        </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

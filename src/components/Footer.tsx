"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { PROFILE } from "@/lib/data";
import { Github, Linkedin, Facebook, Twitter, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer ref={footerRef} className="bg-primary text-primary-foreground py-8">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Crafted with care by {PROFILE.name}. All rights reserved.
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <a href={PROFILE.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={PROFILE.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                        <Github className="h-5 w-5" />
                    </a>
                    <a href={PROFILE.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                        <Facebook className="h-5 w-5" />
                    </a>
                    
                    <Button variant="outline" size="icon" onClick={scrollToTop} className="ml-4 rounded-full bg-background/10 border-white/20 hover:bg-background/20 text-white">
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}

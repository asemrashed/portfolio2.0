"use client";

import { useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Facebook, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactContent, SiteSettings } from "@/lib/types";
import { DEFAULT_CONTACT, DEFAULT_SETTINGS } from "@/lib/data";

interface FooterProps {
  settings?: SiteSettings;
  contact?: ContactContent;
}

export default function Footer({
  settings = DEFAULT_SETTINGS,
  contact = DEFAULT_CONTACT,
}: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {settings.footerText}
          </p>
          <div className="flex gap-4 justify-center md:justify-start mt-3 text-sm opacity-90">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {settings.showSocialInFooter && (
            <>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </>
          )}

          <Button
            variant="secondary"
            size="icon"
            onClick={scrollToTop}
            className="ml-4 rounded-full"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

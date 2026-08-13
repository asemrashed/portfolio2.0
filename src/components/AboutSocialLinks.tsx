"use client";

import type { AboutSocialLink } from "@/lib/types";
import {
  getSocialPlatform,
  SocialPlatformIcon,
  type AboutSocialPlatform,
} from "@/lib/socialPlatforms";
import { cn } from "@/lib/utils";

interface AboutSocialLinksProps {
  links: AboutSocialLink[];
  className?: string;
}

export default function AboutSocialLinks({ links, className }: AboutSocialLinksProps) {
  const visible = links.filter((l) => l.url?.trim() && l.platform);

  if (!visible.length) return null;

  return (
    <div className={cn("flex flex-col gap-2.5 w-full", className)}>
      {visible.map((link, index) => {
        const meta = getSocialPlatform(link.platform);
        if (!meta) return null;
        const hover = meta.hoverColor || meta.color;

        return (
          <a
            key={`${link.platform}-${index}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={meta.label}
            className={cn(
              "social-platform-btn inline-flex w-full items-center justify-center gap-2 rounded-md border-2 px-3 py-2 text-sm font-medium",
              "bg-transparent transition-colors duration-200"
            )}
            style={
              {
                borderColor: meta.color,
                color: meta.color,
                ["--platform-color" as string]: hover,
              } as React.CSSProperties
            }
          >
            <SocialPlatformIcon
              platform={link.platform as AboutSocialPlatform}
              className="shrink-0"
            />
            <span>{meta.label}</span>
          </a>
        );
      })}
    </div>
  );
}

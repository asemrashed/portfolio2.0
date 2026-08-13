import type { SVGProps } from "react";

export type AboutSocialPlatform =
  | "github"
  | "linkedin"
  | "discord"
  | "freelancer"
  | "upwork"
  | "facebook";

export interface SocialPlatformMeta {
  id: AboutSocialPlatform;
  label: string;
  /** Outline / text color (visible on dark backgrounds) */
  color: string;
  /** Fill color on hover (defaults to `color`) */
  hoverColor?: string;
  placeholder: string;
}

export const SOCIAL_PLATFORMS: SocialPlatformMeta[] = [
  {
    id: "github",
    label: "GitHub",
    color: "#E6EDF3",
    hoverColor: "#181717",
    placeholder: "https://github.com/username",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "#0A66C2",
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    id: "discord",
    label: "Discord",
    color: "#5865F2",
    placeholder: "https://discord.com/users/… or invite link",
  },
  {
    id: "freelancer",
    label: "Freelancer",
    color: "#29B2FE",
    placeholder: "https://www.freelancer.com/u/username",
  },
  {
    id: "upwork",
    label: "Upwork",
    color: "#14A800",
    placeholder: "https://www.upwork.com/freelancers/~…",
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    placeholder: "https://www.facebook.com/username",
  },
];

export function getSocialPlatform(id: string): SocialPlatformMeta | undefined {
  return SOCIAL_PLATFORMS.find((p) => p.id === id);
}

type IconProps = SVGProps<SVGSVGElement>;

function iconBase(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
    ...props,
  };
}

export function SocialPlatformIcon({
  platform,
  className,
}: {
  platform: AboutSocialPlatform;
  className?: string;
}) {
  const props: IconProps = { className, width: 18, height: 18 };

  switch (platform) {
    case "github":
      return (
        <svg {...iconBase(props)}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.777-1.333-1.777-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...iconBase(props)}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "discord":
      return (
        <svg {...iconBase(props)}>
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case "freelancer":
      return (
        <svg {...iconBase(props)}>
          <path d="M14.096 3.076l1.634 2.292L24 3.076M5.503 20.924l4.474-4.374-2.692-2.89m6.133-10.584L11.027 5.23l4.022.15M4.124 3.077l.857 1.76 4.734.294m-3.058 7.072l3.497-6.522L0 5.13m7.064 7.485l3.303 3.548 3.643-3.57 1.13-6.652-4.439-.228Z" />
        </svg>
      );
    case "upwork":
      return (
        <svg {...iconBase(props)}>
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.487-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.37-1.215-1.826-2.14-4.019-2.687-5.855H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.284 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.842l1.204-5.66c1.071.85 2.298 1.377 3.647 1.377 3.022 0 5.477-2.466 5.477-5.488.001-3.02-2.454-5.487-5.477-5.487z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...iconBase(props)}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
}

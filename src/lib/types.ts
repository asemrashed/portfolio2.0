export type ProjectCategory = string;

export const DEFAULT_PROJECT_CATEGORIES = [
  "Frontend",
  "Full Stack",
  "AI Coding",
] as const;

export type HomeSectionKey =
  | "hero"
  | "offerings"
  | "skills"
  | "projects"
  | "cta";

export interface HomeSectionItem {
  key: HomeSectionKey;
  label: string;
  enabled: boolean;
}

export interface Project {
  _id?: string;
  name: string;
  images: {
    pc: string;
    mobile: string;
  };
  description: string;
  category: ProjectCategory;
  tags: string[];
  features?: string[];
  links: {
    demo: string;
    github: string;
  };
  featured?: boolean;
  showInHomepage?: boolean;
  homeOrder?: number;
  order?: number;
  status?: "draft" | "published";
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Offering {
  title: string;
  description: string;
  icon?: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  period?: string;
  description?: string;
}

export interface CourseItem {
  title: string;
  provider: string;
  period?: string;
  description?: string;
}

export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  footerText: string;
  showSocialInFooter: boolean;
}

export interface HeroContent {
  greeting: string;
  displayName: string;
  titles: string[];
  heroImage: string;
  heroBgImage: string;
  hireCtaLabel: string;
  hireCtaHref: string;
}

export interface AboutSocialLink {
  platform: string;
  url: string;
}

export interface AboutContent {
  /** Rich HTML from the Tiptap editor */
  body: string;
  aboutImage: string;
  socialLinks: AboutSocialLink[];
  education: EducationItem[];
  courses: CourseItem[];
  offerings: Offering[];
}

export interface ContactContent {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  facebook: string;
  intro: string;
  formTitle: string;
}

export interface CtaContent {
  title: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface HomeLayoutContent {
  sections: HomeSectionItem[];
}

export interface SiteContent {
  settings: SiteSettings;
  hero: HeroContent;
  about: AboutContent;
  skills: SkillCategory[];
  contact: ContactContent;
  cta: CtaContent;
  homeLayout: HomeLayoutContent;
  projectCategories: string[];
}

export const HOME_SECTION_LABELS: Record<HomeSectionKey, string> = {
  hero: "Hero",
  offerings: "What I Offer",
  skills: "Skills",
  projects: "Projects",
  cta: "Want to start a project",
};

export const DEFAULT_HOME_SECTIONS: HomeSectionItem[] = [
  { key: "hero", label: "Hero", enabled: true },
  { key: "offerings", label: "What I Offer", enabled: true },
  { key: "skills", label: "Skills", enabled: true },
  { key: "projects", label: "Projects", enabled: true },
  { key: "cta", label: "Want to start a project", enabled: true },
];

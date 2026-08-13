import type {
  AboutContent,
  ContactContent,
  CtaContent,
  HeroContent,
  HomeLayoutContent,
  Project,
  SiteContent,
  SiteSettings,
  SkillCategory,
} from "./types";
import { DEFAULT_HOME_SECTIONS, DEFAULT_PROJECT_CATEGORIES } from "./types";

export type { Project } from "./types";
export { DEFAULT_HOME_SECTIONS } from "./types";

export const PROFILE = {
  name: "Mohammad Asem Rashed",
  title: "Frontend / Full Stack Developer",
  titles: ["Junior Web Developer", "Frontend Web Developer", "MERN Stack Developer"],
  about: [
    "A junior developer with strong UI development skills and practical backend experience.I like building smooth, responsive websites from layout to functionality.",
    "In 2023, I discovered the magic of turning imagination into visual reality through the art of coding, sparking my journey into programming.",
    "I am a diploma graduate, currently pursuing a BSc in Automobile at World University in Uttara through a flexible program.",
    "Originally from Chittagong, I currently reside in Dhaka, Bangladesh.",
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/asem-rashed/",
    github: "https://github.com/asemrashed",
    facebook: "https://web.facebook.com/MohammadAsem.Rashed",
    email: "asemrashed002@gmail.com",
    phone: "+8801629998611",
  },
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "ASEM RASHED",
  logoUrl: "/LOGO.png",
  footerText: "Crafted with care by Mohammad Asem Rashed. All rights reserved.",
  showSocialInFooter: true,
};

export const DEFAULT_HERO: HeroContent = {
  greeting: "Hi there, It's",
  displayName: "ASEM RASHED",
  titles: [
    "Front End Web Developer",
    "MERN Stack Web Developer",
    "Junior Web Developer",
  ],
  heroImage: "/asem.png",
  heroBgImage: "/bgOfHero.png",
  hireCtaLabel: "Hire Me",
  hireCtaHref: "/contact",
};

export const DEFAULT_ABOUT: AboutContent = {
  body: PROFILE.about.map((p) => `<p>${p}</p>`).join(""),
  aboutImage: "/asem.png",
  socialLinks: [
    { platform: "upwork", url: "https://www.upwork.com/freelancers/~01af870ab1a4e7d71a" },
    { platform: "freelancer", url: "https://www.freelancer.com/u/AsemRashed" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/asem-rashed/" },
    { platform: "github", url: "https://github.com/asemrashed" },
    { platform: "facebook", url: "https://web.facebook.com/MohammadAsem.Rashed" },
  ],
  education: [
    {
      title: "BSc in Automobile",
      institution: "World University of Bangladesh, Uttara",
      period: "Ongoing",
      description: "Flexible program alongside development work.",
    },
    {
      title: "Diploma Graduate",
      institution: "Technical Education",
      period: "Completed",
      description: "Foundation in technical and practical skills.",
    },
  ],
  courses: [
    {
      title: "Complete Web Development",
      provider: "Programming Hero",
      period: "2023–2024",
      description: "Frontend and MERN stack fundamentals through real projects.",
    },
    {
      title: "Next.js & Modern Frontend",
      provider: "Self-paced / Online",
      period: "2024–2025",
      description: "App Router, TypeScript, and production UI patterns.",
    },
  ],
  offerings: [
    {
      title: "LMS",
      description:
        "Learning management systems with courses, enrollments, progress tracking, and role-based dashboards.",
      icon: "BookOpen",
    },
    {
      title: "ERP",
      description:
        "Custom ERP modules for inventory, billing, employees, and day-to-day business operations.",
      icon: "Building2",
    },
    {
      title: "Hospital Management",
      description:
        "Patient records, appointments, staff workflows, and admin panels tailored for clinics and hospitals.",
      icon: "Hospital",
    },
    {
      title: "E-commerce",
      description:
        "Storefronts, carts, payments, and admin tools for selling products online with a polished UX.",
      icon: "ShoppingBag",
    },
  ],
};

export const DEFAULT_CONTACT: ContactContent = {
  email: PROFILE.social.email,
  phone: PROFILE.social.phone,
  linkedin: PROFILE.social.linkedin,
  github: PROFILE.social.github,
  facebook: PROFILE.social.facebook,
  intro:
    "I am currently open to new opportunities and collaborations. Let's build something amazing together!",
  formTitle: "Send a Message",
};

export const DEFAULT_CTA: CtaContent = {
  title: "Want to start a project?",
  body: "Tell me about your idea — LMS, ERP, hospital systems, e-commerce, or a custom web app. Let's turn it into a polished product.",
  buttonLabel: "Contact Me",
  buttonHref: "/contact",
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: "https://cdn.simpleicons.org/html5" },
      { name: "CSS", icon: "https://cdn.simpleicons.org/css" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
      { name: "React", icon: "https://cdn.simpleicons.org/react" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
      { name: "Material UI", icon: "https://cdn.simpleicons.org/mui" },
      { name: "DaisyUI", icon: "https://cdn.simpleicons.org/daisyui" },
      { name: "Framer Motion", icon: "./skills/framer-motion.png" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git" },
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
      { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel" },
      { name: "Vite", icon: "https://cdn.simpleicons.org/vite" },
      { name: "VS Code", icon: "/skills/vscode.png" },
    ],
  },
  {
    category: "Learning",
    items: [
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Portfolio 2.0",
    category: "AI Coding",
    images: {
      pc: "/sites/portfolio2.png",
      mobile: "/sites/portfolio2Mbl.png",
    },
    description:
      "My personal portfolio website built with Next.js and AI assistance. It features a modern, responsive design with smooth animations, dynamic project showcasing, and a contact form.",
    features: [
      "AI-assisted development",
      "Responsive design for all devices",
      "Dynamic project filtering",
      "Smooth GSAP animations",
      "Interactive customized dialogs",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "GSAP", "Radix UI"],
    links: {
      demo: "https://asem-rashed.vercel.app",
      github: "https://github.com/asemrashed/portfolio2.0",
    },
    featured: true,
    showInHomepage: true,
    order: 0,
  },
  {
    name: "CarWorld",
    category: "AI Coding",
    images: {
      pc: "/sites/car-world.png",
      mobile: "/sites/car-worldM.png",
    },
    description:
      "CarWorld is a modern car listing and browsing web application built with Next.js. It allows users to explore cars with detailed information, clean UI, and a fully responsive experience optimized for performance.",
    features: [
      "Modern and responsive UI",
      "Car listing and details view",
      "Optimized performance with Next.js",
      "Reusable component-based architecture",
      "Deployed on Vercel",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Vercel"],
    links: {
      demo: "https://car-world-eta.vercel.app/",
      github: "https://github.com/asemrashed/CarWorld",
    },
    featured: false,
    showInHomepage: false,
    order: 1,
  },
  {
    name: "E-TuitionsBD",
    category: "Full Stack",
    images: {
      pc: "/sites/e-tuition.png",
      mobile: "/sites/e-tuitionMbl.png",
    },
    description:
      "A full-stack tuition-matching website featuring dashboards, payments, dark mode, and role-based authentication. Students, tutors, and admins each have dedicated functionalities for managing tuition posts, requests, and approvals.",
    features: [
      "Role-based dashboards (Admin, Tutor, Student)",
      "Secure payment integration with Stripe",
      "Real-time notifications",
      "Advanced search and filtering",
      "Dark mode support",
    ],
    tags: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "FirebaseAuth",
      "DaisyUI",
      "SwiperJS",
      "Vercel",
    ],
    links: {
      demo: "https://e-tuitionsbd.web.app/",
      github: "https://github.com/asemrashed/E-TuitionsBD-client",
    },
    featured: true,
    showInHomepage: true,
    order: 2,
  },
  {
    name: "PawMart",
    category: "Full Stack",
    images: {
      pc: "/sites/pawmart.png",
      mobile: "/sites/pawmartMbl.png",
    },
    description:
      "A full-stack pet adoption and pet supplies marketplace. Users can post pets for adoption or purchase supplies, while admins control all system actions. A personal dashboard allows users to track posts and orders.",
    features: [
      "Pet adoption listings",
      "E-commerce for pet supplies",
      "User and Admin dashboards",
      "Order tracking system",
      "Secure authentication",
    ],
    tags: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "FirebaseAuth",
      "DaisyUI",
      "SwiperJS",
      "ImageBB",
      "Vercel",
    ],
    links: {
      demo: "https://paw-mart-47a12.web.app/",
      github: "https://github.com/asemrashed/PawMart-client",
    },
    featured: true,
    showInHomepage: true,
    order: 3,
  },
  {
    name: "Green Nest",
    category: "Frontend",
    images: {
      pc: "/sites/green-nest.png",
      mobile: "/sites/green-nest-mobile.png",
    },
    description:
      "An online e-commerce platform for selling indoor plants and booking expert consultations.",
    features: [
      "Product catalog with filtering",
      "Expert consultation booking",
      "Cart and checkout UI",
      "Responsive layout",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "DaisyUI", "FirebaseAuth", "SwiperJS"],
    links: {
      demo: "https://green-nest-by-asem.netlify.app/",
      github: "https://github.com/asemrashed",
    },
    featured: true,
    showInHomepage: true,
    order: 4,
  },
  {
    name: "E-Auction",
    category: "Full Stack",
    images: {
      pc: "/sites/eAuction.png",
      mobile: "/sites/eAuctionMobile.png",
    },
    description:
      "A platform for online bidding and auctions, showcasing real-time bidding features.",
    features: [
      "Real-time bidding updates",
      "Auction creation and management",
      "User profile and bid history",
      "Timer countdowns",
    ],
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
    links: {
      demo: "https://e-auction-six.vercel.app/",
      github: "https://github.com/asemrashed",
    },
    featured: true,
    showInHomepage: true,
    order: 5,
  },
  {
    name: "Restaurant",
    category: "Frontend",
    images: {
      pc: "/sites/restaurantPc.png",
      mobile: "/sites/restaurantMbl.png",
    },
    description:
      "A responsive restaurant landing page showcasing the menu and ambiance, with review and reservation features.",
    features: [
      "Interactive menu display",
      "Reservation form",
      "Customer reviews slider",
      "Responsive design",
    ],
    tags: ["React", "Vite", "Material UI"],
    links: {
      demo: "https://asemrashed.github.io/restaurant/",
      github: "https://github.com/asemrashed/restaurant",
    },
    order: 6,
  },
  {
    name: "Travel BANGLADESH",
    category: "Full Stack",
    images: {
      pc: "/sites/travelBD.png",
      mobile: "/sites/travelBDmobile.png",
    },
    description:
      "A platform to explore, add, edit, and review Bangladesh's tourist spots with an interactive map.",
    features: [
      "Interactive maps",
      "User-generated content (reviews, spots)",
      "CRUD operations for spots",
      "User authentication",
    ],
    tags: ["EJS", "CSS", "Bootstrap", "VanillaJS", "Node.js", "Express", "MongoDB"],
    links: {
      demo: "https://travel-bangladesh-tb.vercel.app/",
      github: "https://github.com/asemrashed/latsTravelBD",
    },
    order: 7,
  },
  {
    name: "Hero IO",
    category: "Full Stack",
    images: {
      pc: "/sites/hero-io.png",
      mobile: "/sites/hero-io-mobile.png",
    },
    description: "A responsive landing page showcasing digital service features with smooth UI.",
    features: ["Modern UI design", "Responsive grid layout", "Service showcase"],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "DaisyUI"],
    links: {
      demo: "https://hero-io-by-asem-rashed.netlify.app/",
      github: "https://github.com/asemrashed/Hero-IO",
    },
    order: 8,
  },
  {
    name: "Portfolio",
    category: "Frontend",
    images: {
      pc: "/sites/portfolio.png",
      mobile: "/sites/portfolioMobile.png",
    },
    description:
      "A personal portfolio website showcasing my skills, projects, experience, and overall expertise as a frontend developer.",
    features: [
      "Modern and responsive UI",
      "Mobile-friendly layout",
      "Smooth navigation and clean design",
      "Integrated contact form using EmailJS",
      "Enhanced accessibility and improved user experience",
    ],
    tags: ["React", "Material UI", "CSS", "EmailJS"],
    links: {
      demo: "https://asemrashed.pages.dev",
      github: "https://github.com/asemrashed/day2day-English",
    },
    order: 9,
  },
  {
    name: "Green Earth",
    category: "Frontend",
    images: {
      pc: "/sites/green-earth.png",
      mobile: "/sites/green-earth-mobile.png",
    },
    description:
      "Green Earth is an eco-friendly website promoting sustainability and environmental awareness.",
    features: ["Eco-friendly design", "Information sections", "Newsletter subscription"],
    tags: ["HTML", "Bootstrap", "DaisyUI", "Vanilla JS"],
    links: {
      demo: "https://green-earth-by-asem.netlify.app/",
      github: "https://github.com/asemrashed/Green-Earth",
    },
    order: 10,
  },
  {
    name: "Day2Day English",
    category: "Frontend",
    images: {
      pc: "/sites/day2daypc.png",
      mobile: "/sites/day2dayM.png",
    },
    description:
      "A responsive, API-powered frontend for interactive English learning with vocabulary and FAQs.",
    features: [
      "API integration",
      "Dynamic content loading",
      "Interactive quizzes/FAQ",
      "Clean user interface",
    ],
    tags: ["HTML", "Tailwind CSS", "DaisyUI", "Vanilla JS"],
    links: {
      demo: "https://day2dayenglish.netlify.app/",
      github: "https://github.com/asemrashed/portfolio",
    },
    order: 11,
  },
];

export const DEFAULT_HOME_LAYOUT: HomeLayoutContent = {
  sections: DEFAULT_HOME_SECTIONS,
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  settings: DEFAULT_SETTINGS,
  hero: DEFAULT_HERO,
  about: DEFAULT_ABOUT,
  skills: SKILLS,
  contact: DEFAULT_CONTACT,
  cta: DEFAULT_CTA,
  homeLayout: DEFAULT_HOME_LAYOUT,
  projectCategories: [...DEFAULT_PROJECT_CATEGORIES],
};

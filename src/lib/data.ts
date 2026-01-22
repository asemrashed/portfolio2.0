
export const PROFILE = {
  name: "Mohammad Asem Rashed",
  title: "Frontend / Full Stack Developer",
  titles: ["Junior Web Developer", "Frontend Web Developer", "MERN Stack Developer"],
  about: [
    "A junior developer with strong UI development skills and practical backend experience.I like building smooth, responsive websites from layout to functionality.",
    "In 2023, I discovered the magic of turning imagination into visual reality through the art of coding, sparking my journey into programming.",
    "I am a diploma graduate, currently pursuing a BSc in Automobile at World University in Uttara through a flexible program.",
    "Originally from Chittagong, I currently reside in Dhaka, Bangladesh."
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/asem-rashed/",
    github: "https://github.com/asemrashed",
    facebook: "https://web.facebook.com/MohammadAsem.Rashed",
    email: "asemrashed002@gmail.com", // Placeholder, need to verify
    phone: "+8801629998611", // Placeholder or extract if found
  }
};



export const SKILLS = [
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
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git" },
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
      { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel" },
      { name: "Vite", icon: "https://cdn.simpleicons.org/vite" },
      { name: "VS Code", icon: "/skills/vscode.png" }
    ]
  },
  {
    category: "Learning",
    items: [
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock" }
    ]
  }
];

export interface Project {
  name: string;
  images: {
    pc: string;
    mobile: string;
  };
  description: string;
  category: "Frontend" | "Full Stack" | "AI Coding";
  tags: string[];
  features?: string[];
  links: {
    demo: string;
    github: string;
  };
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: "Portfolio 2.0",
    category: "AI Coding",
    images: {
      pc: "/sites/portfolio2.png", 
      mobile: "/sites/portfolio2Mbl.png" 
    },
    description: "My personal portfolio website built with Next.js and AI assistance. It features a modern, responsive design with smooth animations, dynamic project showcasing, and a contact form.",
    features: [
      "AI-assisted development",
      "Responsive design for all devices",
      "Dynamic project filtering",
      "Smooth GSAP animations",
      "Interactive customized dialogs"
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "GSAP", "Radix UI"],
    links: {
      demo: "https://asem-rashed.vercel.app", 
      github: "https://github.com/asemrashed/portfolio2.0",
    },
    featured: true,
  },
  {
    name: "E-TuitionsBD",
    category: "Full Stack",
    images: {
      pc: "/sites/e-tuition.png",
      mobile: "/sites/e-tuitionMbl.png" 
    },
    description:
      "A full-stack tuition-matching website featuring dashboards, payments, dark mode, and role-based authentication. Students, tutors, and admins each have dedicated functionalities for managing tuition posts, requests, and approvals.",
    features: [
      "Role-based dashboards (Admin, Tutor, Student)",
      "Secure payment integration with Stripe",
      "Real-time notifications",
      "Advanced search and filtering",
      "Dark mode support"
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
      "Vercel"
    ],
    links: {
      demo: "https://e-tuitionsbd.web.app/",
      github: "https://github.com/asemrashed/E-TuitionsBD-client",
    },
    featured: true,
  },
  {
    name: "PawMart",
    category: "Full Stack",
    images: {
      pc: "/sites/pawmart.png",
      mobile: "/sites/pawmartMbl.png"
    },
    description:
      "A full-stack pet adoption and pet supplies marketplace. Users can post pets for adoption or purchase supplies, while admins control all system actions. A personal dashboard allows users to track posts and orders.",
    features: [
      "Pet adoption listings",
      "E-commerce for pet supplies",
      "User and Admin dashboards",
      "Order tracking system",
      "Secure authentication"
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
      "Vercel"
    ],
    links: {
      demo: "https://paw-mart-47a12.web.app/",
      github: "https://github.com/asemrashed/PawMart-client",
    },
    featured: true,
  },
  {
    name: "Green Nest",
     category: "Frontend",
    images: {
      pc: "/sites/green-nest.png",
       mobile: "/sites/green-nest-mobile.png"
    },
    description: "An online e-commerce platform for selling indoor plants and booking expert consultations.",
    features: [
        "Product catalog with filtering",
        "Expert consultation booking",
        "Cart and checkout UI",
        "Responsive layout"
    ],
    tags: ["React", "Vite", "Tailwind CSS", "DaisyUI", "FirebaseAuth", "SwiperJS"],
    links: {
      demo: "https://green-nest-by-asem.netlify.app/",
      github: "https://github.com/asemrashed",
    },
    featured: true,
  },
  {
    name: "E-Auction",
    category: "Full Stack",
    images: {
      pc: "/sites/eAuction.png",
      mobile: "/sites/eAuctionMobile.png"
    },
    description: "A platform for online bidding and auctions, showcasing real-time bidding features.",
    features: [
        "Real-time bidding updates",
        "Auction creation and management",
        "User profile and bid history",
        "Timer countdowns"
    ],
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
    links: {
      demo: "https://e-auction-six.vercel.app/",
      github: "https://github.com/asemrashed",
    },
    featured: true,
  },
  {
    name: "Restaurant",
    category: "Frontend",
    images: {
      pc: "/sites/restaurantPc.png",
       mobile: "/sites/restaurantMbl.png"
    },
    description: "A responsive restaurant landing page showcasing the menu and ambiance, with review and reservation features.",
    features: [
        "Interactive menu display",
        "Reservation form",
        "Customer reviews slider",
        "Responsive design"
    ],
    tags: ["React", "Vite", "Material UI"],
    links: {
      demo: "https://asemrashed.github.io/restaurant/",
      github: "https://github.com/asemrashed/restaurant",
    },
  },
  {
    name: "Travel BANGLADESH",
     category: "Full Stack",
    images: {
      pc: "/sites/travelBD.png",
       mobile: "/sites/travelBDmobile.png"
    },
    description: "A platform to explore, add, edit, and review Bangladesh's tourist spots with an interactive map.",
    features: [
        "Interactive maps",
        "User-generated content (reviews, spots)",
        "CRUD operations for spots",
        "User authentication"
    ],
    tags: ["EJS", "CSS", "Bootstrap", "VanillaJS", "Node.js", "Express", "MongoDB"],
    links: {
      demo: "https://travel-bangladesh-tb.vercel.app/",
      github: "https://github.com/asemrashed/latsTravelBD",
    },
  },
  {
    name: "Hero IO",
    category: "Full Stack",
    images: {
      pc: "/sites/hero-io.png",
       mobile: "/sites/hero-io-mobile.png"
    },
    description: "A responsive landing page showcasing digital service features with smooth UI.",
    features: ["Modern UI design", "Responsive grid layout", "Service showcase"],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "DaisyUI"],
    links: {
      demo: "https://hero-io-by-asem-rashed.netlify.app/",
      github: "https://github.com/asemrashed/Hero-IO",
    },
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
  },
  {
    name: "Green Earth",
     category: "Frontend",
    images: {
      pc: "/sites/green-earth.png",
       mobile: "/sites/green-earth-mobile.png"
    },
    description: "Green Earth is an eco-friendly website promoting sustainability and environmental awareness.",
    features: ["Eco-friendly design", "Information sections", "Newsletter subscription"],
    tags: ["HTML", "Bootstrap", "DaisyUI", "Vanilla JS"],
    links: {
      demo: "https://green-earth-by-asem.netlify.app/",
      github: "https://github.com/asemrashed/Green-Earth",
    },
  },
  {
    name: "Day2Day English",
     category: "Frontend",
    images: {
      pc: "/sites/day2daypc.png",
       mobile: "/sites/day2dayM.png"
    },
    description: "A responsive, API-powered frontend for interactive English learning with vocabulary and FAQs.",
    features: [
        "API integration",
        "Dynamic content loading",
        "Interactive quizzes/FAQ",
        "Clean user interface"
    ],
    tags: ["HTML", "Tailwind CSS", "DaisyUI", "Vanilla JS"],
    links: {
      demo: "https://day2dayenglish.netlify.app/",
      github: "https://github.com/asemrashed/portfolio",
    },
  },
];

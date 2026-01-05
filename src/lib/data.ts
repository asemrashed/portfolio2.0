
export const PROFILE = {
  name: "Mohammad Asem Rashed",
  title: "Frontend / Full Stack Developer",
  titles: ["Junior Web Developer", "Frontend Web Developer", "MERN Stack Developer"],
  about: [
    "A passionate front-end developer with expertise in creating responsive, interactive websites. I also have experience with backend technologies to build complete web solutions.",
    "In 2022, I discovered the magic of turning imagination into visual reality through the art of coding, sparking my journey into programming.",
    "I am a diploma graduate, currently pursuing a BSc in Automobile at World University in Uttara through a flexible program.",
    "Originally from Chittagong, I currently reside in Dhaka, Bangladesh."
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/asem-rashed-2420a3317/",
    github: "https://github.com/asemrashed",
    facebook: "https://web.facebook.com/MohammadAsem.Rashed",
    email: "asemrashed@gmail.com", // Placeholder, need to verify
    phone: "+8801822262277", // Placeholder or extract if found
  }
};

export const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "Material UI", "DaisyUI", "HTML/CSS", "JavaScript/TypeScript"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Firebase"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Figma", "EmailJS"] },
];

export interface Project {
  name: string;
  image: string;
  description: string;
  tags: string[];
  links: {
    demo: string;
    github: string;
  };
  featured?: boolean;
}

export const PROJECTS: Project[] = [

  {
    name: "Green Nest",
    image: "/sites/green-nest.png",
    description: "An online e-commerce platform for selling indoor plants and booking expert consultations.",
    tags: ["React", "Vite", "Tailwind CSS", "DaisyUI", "FirebaseAuth", "SwiperJS"],
    links: {
      demo: "https://green-nest-by-asem.netlify.app/",
      github: "https://github.com/asemrashed",
    },
    featured: true,
  },
  {
    name: "E-Auction",
    image: "/sites/eAuction.png",
    description: "A platform for online bidding and auctions, showcasing real-time bidding features.",
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
    links: {
      demo: "https://e-auction-six.vercel.app/",
      github: "https://github.com/asemrashed",
    },
    featured: true,
  },
  {
    name: "Restaurant",
    image: "/sites/restaurantPc.png",
    description: "A responsive restaurant landing page showcasing the menu and ambiance, with review and reservation features.",
    tags: ["React", "Vite", "Material UI"],
    links: {
      demo: "https://asemrashed.github.io/restaurant/",
      github: "https://github.com/asemrashed/restaurant",
    },
  },
  {
    name: "Travel BANGLADESH",
    image: "/sites/travelBD.png",
    description: "A platform to explore, add, edit, and review Bangladesh's tourist spots with an interactive map.",
    tags: ["EJS", "CSS", "Bootstrap", "VanillaJS", "Node.js", "Express", "MongoDB"],
    links: {
      demo: "https://travel-bangladesh-tb.vercel.app/",
      github: "https://github.com/asemrashed/latsTravelBD",
    },
  },
  {
    name: "Hero IO",
    image: "/sites/hero-io.png",
    description: "A responsive landing page showcasing digital service features with smooth UI.",
    tags: ["React", "Vite", "Tailwind CSS", "DaisyUI"],
    links: {
      demo: "https://hero-io-by-asem-rashed.netlify.app/",
      github: "https://github.com/asemrashed/Hero-IO",
    },
  },
  {
    name: "Green Earth",
    image: "/sites/green-earth.png",
    description: "Green Earth is an eco-friendly website promoting sustainability and environmental awareness.",
    tags: ["HTML", "Bootstrap", "DaisyUI", "Vanilla JS"],
    links: {
      demo: "https://green-earth-by-asem.netlify.app/",
      github: "https://github.com/asemrashed/Green-Earth",
    },
  },
  {
    name: "Day2Day English",
    image: "/sites/day2daypc.png",
    description: "A responsive, API-powered frontend for interactive English learning with vocabulary and FAQs.",
    tags: ["HTML", "Tailwind CSS", "DaisyUI", "Vanilla JS"],
    links: {
      demo: "https://day2dayenglish.netlify.app/",
      github: "https://github.com/asemrashed/portfolio",
    },
  },
];

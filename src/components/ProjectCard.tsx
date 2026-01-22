"use client";

import Image from "next/image";
import { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, ExternalLink, Monitor, Smartphone, CheckCircle } from "lucide-react";

interface ProjectCardProps {
  project: Project; 
}

const getIconForTag = (tag: string) => {
  const normalizedTag = tag.toLowerCase().replace(/\./g, '').replace(/\s+/g, '');
  const iconMap: { [key: string]: string } = {
    "react": "react",
    "nextjs": "nextdotjs",
    "tailwindcss": "tailwindcss",
    "nodejs": "nodedotjs",
    "express": "express",
    "expressjs": "express",
    "mongodb": "mongodb",
    "firebase": "firebase",
    "firebaseauth": "firebase",
    "stripe": "stripe",
    "gsap": "greensock",
    "radixui": "radixui",
    "daisyui": "daisyui",
    "swiperjs": "swiper",
    "vite": "vite",
    "materialui": "mui",
    "bootstrap": "bootstrap",
    "html": "html5",
    "css": "css3",
    "javascript": "javascript",
    "typescript": "typescript",
    "vanillajs": "javascript",
    "ejs": "ejs",
    "imagebb": "imgbb", // Approximate
  };
  
  const slug = iconMap[normalizedTag] || normalizedTag;
  return `https://cdn.simpleicons.org/${slug}`;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <Card className="project-card overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20 bg-card/40 backdrop-blur-sm group cursor-pointer h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
            <Image
                src={project.images.pc}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <DialogTrigger asChild>
                    <Button variant="secondary" className="font-semibold hover:bg-primary hover:text-primary-foreground">View Details</Button>
                </DialogTrigger>
            </div>
        </div>
        
        <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xl text-primary font-saira line-clamp-1 flex justify-between items-center">
                {project.name}
                <Badge variant="outline" className="text-xs font-normal">{project.category}</Badge>
            </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-background/50">{tag}</Badge>
                ))}
                {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-background/50">+{project.tags.length - 3}</Badge>
                )}
            </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between gap-2 mt-auto">
             <Button variant="outline" size="sm" className="w-full gap-2 hover:border-primary hover:text-primary hover:bg-transparent transition-colors group/btn" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 group-hover/btn:text-primary lg:group-hover/btn:text-primary transition-colors" /> Live
                </a>
            </Button>
            <Button variant="ghost" size="sm" className="w-full gap-2" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> Code
                </a>
            </Button>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] max-h-[90vh] overflow-y-auto flex flex-col p-6 sm:max-w-none">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-3xl font-bold font-saira text-primary">{project.name}</DialogTitle>
           <div className="flex gap-2 mt-2">
                 <Badge variant="secondary">{project.category}</Badge>
                 {project.featured && <Badge variant="default">Featured</Badge>}
            </div>
        </DialogHeader>
        
        <div className="flex-grow space-y-8 py-6">
             {/* Screenshots Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                 {/* Desktop View - Takes 4 columns */}
                 <div className="md:col-span-4 space-y-2">
                    <h4 className="font-semibold flex items-center gap-2"><Monitor className="h-4 w-4"/> Desktop View</h4>
                    <div className="relative aspect-[21/10] rounded-lg overflow-hidden border shadow-lg w-full">
                        <Image
                            src={project.images.pc}
                            alt={`${project.name} Desktop`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                {/* Mobile View - Takes 1 column */}
                <div className="md:col-span-1 space-y-2">
                    <h4 className="font-semibold flex items-center gap-2"><Smartphone className="h-4 w-4"/> Mobile View</h4>
                     <div className="relative aspect-[9/19] rounded-lg overflow-hidden border shadow-lg w-full mx-auto max-w-[200px] md:max-w-full">
                        <Image
                            src={project.images.mobile}
                            alt={`${project.name} Mobile`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-6">
                    {/* Details */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-primary">About Project</h4>
                        <DialogDescription className="text-base leading-relaxed">
                            {project.description}
                        </DialogDescription>
                    </div>
                    
                    {/* Features */}
                    {project.features && (
                        <div>
                            <h4 className="font-semibold text-lg mb-3 text-primary">Key Features</h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Technology */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3 text-primary">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 flex items-center gap-2">
                                     <div className="relative w-4 h-4">
                                        <Image 
                                            src={getIconForTag(tag)}
                                            alt={tag}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-3 pt-4 border-t">
                        <Button className="w-full gap-2 h-12 text-lg" asChild>
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5" /> Visit Live Site
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full gap-2 h-12 text-lg" asChild>
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" /> View Source Code
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

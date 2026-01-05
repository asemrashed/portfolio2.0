"use client";

import Image from "next/image";
import { useState } from "react";
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
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: any; // Using explicit type locally or from data.ts if exported
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <Card className="project-card overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20 bg-card/40 backdrop-blur-sm group cursor-pointer h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
             {/* Using a placeholder for now if image logic is tricky, but assuming project.image is correct relative path */}
            <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <DialogTrigger asChild>
                    <Button variant="secondary" className="font-semibold">View Details</Button>
                </DialogTrigger>
            </div>
        </div>
        
        <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xl text-primary font-saira line-clamp-1">{project.name}</CardTitle>
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
            <Button variant="ghost" size="sm" className="w-full gap-2" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> Code
                </a>
            </Button>
             <Button variant="default" size="sm" className="w-full gap-2" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live
                </a>
            </Button>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-saira text-primary">{project.name}</DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 my-4">
            <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                />
            </div>
            
            <div className="space-y-2">
                <h4 className="font-semibold text-lg">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button className="flex-1 gap-2" asChild>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Visit Live Site
                    </a>
                </Button>
                 <Button variant="outline" className="flex-1 gap-2" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" /> View Source
                    </a>
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

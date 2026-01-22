"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface ResumeDialogProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  children?: React.ReactNode;
}

export default function ResumeDialog({ variant = "outline", className, children }: ResumeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={`${className} hover:text-red cursor-pointer`}>
          {children || (
            <>
              Resume <FileText className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-saira text-primary">My Resume</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full bg-muted/20 rounded-md overflow-hidden border relative">
           <iframe
                src="/resume.pdf"
                className="w-full h-full"
                title="Resume PDF"
            />
        </div>
        <div className="flex justify-end pt-4">
             <Button asChild>
                <a href="/resume.pdf" download="Mohammad Asem Rashed Resume.pdf">
                    Download PDF
                </a>
             </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { PROFILE } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, Loader2, CheckCircle, XCircle, Github, Linkedin, Facebook } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(
    () => {
      gsap.from(".contact-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // Replace these with your actual Service ID, Template ID, and Public Key from EmailJS
      // Ideally stored in env vars: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, etc.
      // Using placeholders or generic names based on old code context if available, otherwise just standard env vars.
      
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id_placeholder"; 
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id_placeholder";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_placeholder";

      // If env vars are not set, warn the user (in console or UI)
      if (serviceId === "service_id_placeholder") {
          console.warn("EmailJS environment variables not set.");
          // Simulation for development
          await new Promise(resolve => setTimeout(resolve, 1500));
          setStatus("success");
          return; 
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus("success");
      formRef.current.reset();
      
      // Reset status after a delay so user can send again or sees the form is clear
      setTimeout(() => {
          setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-20 px-6 bg-secondary/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="contact-item text-3xl md:text-4xl font-bold font-saira text-center mb-12 text-primary">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="contact-item space-y-6">
             <Card className="bg-primary/5 border-none">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
                    <CardDescription>Feel free to reach out via email or phone.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 text-lg">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href={`mailto:${PROFILE.social.email}`} className="hover:underline">{PROFILE.social.email}</a>
                    </div>
                    {PROFILE.social.phone && (
                        <div className="flex items-center gap-3 text-lg">
                            <Phone className="h-5 w-5 text-primary" />
                            <a href={`tel:${PROFILE.social.phone}`} className="hover:underline">{PROFILE.social.phone}</a>
                        </div>
                    )}
                </CardContent>
             </Card>
             <div className="p-4 rounded-lg bg-card border shadow-sm">
                <p className="text-muted-foreground italic mb-4">
                    "I am currently open to new opportunities and collaborations. Let's build something amazing together!"
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <Button variant="outline" size="icon" className="rounded-full hover:text-blue-600 hover:bg-blue-50/10" asChild>
                        <a href={PROFILE.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5"/></a>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:bg-gray-100/10" asChild>
                        <a href={PROFILE.social.github} target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5"/></a>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:text-blue-500 hover:bg-blue-50/10" asChild>
                        <a href={PROFILE.social.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5"/></a>
                    </Button>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="contact-item">
             <Card className="shadow-lg border-primary/20">
                <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input name="user_name" placeholder="Your Name" required className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <Input name="user_email" type="email" placeholder="Your Email" required className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <Textarea name="message" placeholder="Your Message" required className="min-h-[120px] bg-background/50" />
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={status === "loading" || status === "success"}>
                            {status === "loading" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                </>
                            ) : status === "success" ? (
                                <>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Sent!
                                </>
                            ) : status === "error" ? (
                                <>
                                    <XCircle className="mr-2 h-4 w-4" /> Failed
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </Button>
                        {status === "error" && (
                            <p className="text-sm text-destructive text-center">{errorMessage}</p>
                        )}
                         {status === "success" && (
                            <p className="text-sm text-green-600 text-center">Message sent successfully!</p>
                        )}
                    </form>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

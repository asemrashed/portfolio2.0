"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const [email, setEmail] = useState("");
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setEmail(d.email || ""))
      .catch(() => undefined);
  }, []);

  const seed = async () => {
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    setSeedMsg(res.ok ? JSON.stringify(data) : data.error || "Seed failed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-saira font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Signed in as {email || "admin"}. Edit any section from the sidebar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          ["Home layout", "/admin/dashboard/home-layout", "Section order & visibility"],
          ["Branding", "/admin/dashboard/branding", "Logo & site name"],
          ["Hero", "/admin/dashboard/hero", "Hero text & images"],
          ["About", "/admin/dashboard/about", "Bio, education, offerings"],
          ["Projects", "/admin/dashboard/projects", "Add / edit / delete / homepage"],
          ["Contact", "/admin/dashboard/contact", "Email & socials"],
          ["CTA", "/admin/dashboard/cta", "Home call-to-action"],
        ].map(([title, href, desc]) => (
          <Card key={href} className="border-primary/15">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{desc}</p>
              <Button asChild size="sm">
                <Link href={href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Database seed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Push default portfolio content into MongoDB if collections are empty.
          </p>
          <Button variant="outline" onClick={seed}>
            Seed database
          </Button>
          {seedMsg && <p className="text-xs text-muted-foreground">{seedMsg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

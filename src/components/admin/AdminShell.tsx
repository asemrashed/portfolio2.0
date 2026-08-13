"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Image as ImageIcon,
  User,
  FolderKanban,
  Mail,
  PanelBottom,
  Megaphone,
  LogOut,
  Settings,
  Home,
  ListOrdered,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/home-layout", label: "Home layout", icon: ListOrdered },
  { href: "/admin/dashboard/branding", label: "Branding", icon: Settings },
  { href: "/admin/dashboard/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/dashboard/about", label: "About", icon: User },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/dashboard/contact", label: "Contact", icon: Mail },
  { href: "/admin/dashboard/footer", label: "Footer", icon: PanelBottom },
  { href: "/admin/dashboard/cta", label: "CTA", icon: Megaphone },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      <aside className="w-64 border-r border-border p-4 hidden md:flex flex-col gap-2 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="mb-4">
          <Link href="/" className="group block">
            <p className="font-saira font-bold text-primary text-lg group-hover:underline flex items-center gap-2">
              <Home className="h-4 w-4" />
              Asem Rashed
            </p>
            <p className="text-xs text-muted-foreground">Content dashboard</p>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
          <Button variant="ghost" className="w-full mt-2" asChild>
            <Link href="/">View site</Link>
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="md:hidden border-b border-border p-3 flex gap-2 overflow-x-auto shrink-0">
          <Link href="/" className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs border border-primary text-primary">
            Asem Rashed
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-xs border",
                pathname === link.href
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border"
              )}
            >
              {link.label}
            </Link>
          ))}
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

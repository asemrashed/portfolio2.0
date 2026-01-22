import type { Metadata } from "next";
import { Inter, Saira, Plus_Jakarta_Sans } from "next/font/google"; // Import Saira and Inter
import "./globals.css";
import { cn } from "@/lib/utils"; // Import cn utility if needed or just use classNames
import { PROFILE } from "@/lib/data";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const saira = Saira({ subsets: ["latin"], variable: "--font-saira",  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: PROFILE.name,
  description: PROFILE.title,
  icons: {
    icon: "/LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          saira.variable,
          jakarta.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

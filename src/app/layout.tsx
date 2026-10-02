import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import "./foundation.css";
import "./globals.css";
import "./roles.css";

export const metadata: Metadata = { title: "Travel Buddy · Find your next story", description: "Discover unforgettable things to do around the world." };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><AppShell>{children}</AppShell></body></html>; }

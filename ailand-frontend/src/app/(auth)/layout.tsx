"use client";

import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/mode-toogle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="absolute right-2 top-2">
                <ModeToggle />
            </div>
            {children}
        </ThemeProvider>
    );
}

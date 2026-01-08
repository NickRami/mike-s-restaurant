"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/#countries", label: "Cuisines" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
                {/* 1. Logo Section (Left) */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 transition-transform group-hover:scale-110">
                            <UtensilsCrossed className="h-5 w-5 text-primary" />
                        </div>
                        <span className={cn(
                            "font-serif text-xl font-bold tracking-tight transition-colors duration-300",
                            isScrolled ? "text-foreground" : "text-white"
                        )}>
                            Mike&apos;s
                        </span>
                    </Link>
                </div>

                {/* 2. Navigation Section (Center) */}
                <nav className="hidden md:flex items-center justify-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium tracking-wide transition-all hover:-translate-y-0.5 relative group py-2",
                                isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                            )}
                        >
                            {link.label}
                            <span className={cn(
                                "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* 3. Actions Section (Right) */}
                <div className="flex-1 flex justify-end items-center gap-4">
                    <Button
                        variant={isScrolled ? "default" : "secondary"}
                        size="sm"
                        className={cn(
                            "hidden md:inline-flex rounded-full px-6 font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95",
                            !isScrolled && "bg-white text-black hover:bg-white/90"
                        )}
                    >
                        Book Table
                    </Button>

                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen
                            ? <X className={isScrolled ? "text-foreground" : "text-white"} />
                            : <Menu className={isScrolled ? "text-foreground" : "text-white"} />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button className="w-full rounded-full">Book a Table</Button>
                </div>
            )}
        </header>
    );
}

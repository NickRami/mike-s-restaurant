"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Force strict scroll to top on route change
        // We use a small timeout to ensure layout has stabilized
        const handleScroll = () => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        };

        handleScroll();
        // Fallback for heavy pages
        requestAnimationFrame(handleScroll);
    }, [pathname]);

    return null;
}

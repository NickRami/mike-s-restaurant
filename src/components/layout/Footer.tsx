
export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row md:px-6">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Mike&apos;s Restaurant. All rights reserved.
                </p>
                <div className="flex gap-4 text-sm font-medium text-muted-foreground">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRandomMeal } from "@/services/api";

export async function Hero() {
    const meal = await getRandomMeal();

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none mix-blend-overlay"></div>
            {/* Static High-Quality Unsplash Image */}
            <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
                alt="Fine Dining Experience"
                fill
                priority
                className="object-cover absolute inset-0 scale-105 animate-in zoom-in-110 duration-[20s] ease-out brightness-[0.7]"
            />
            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" />

            <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center px-4 md:px-6 pt-20">
                <div className="space-y-8 max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">


                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight drop-shadow-2xl leading-[0.9]">
                        <span className="block text-white">Culinary</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic pr-2 animate-gradient-x bg-[length:200%_auto]">
                            Masterpiece
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg md:text-2xl text-white/90 font-light leading-relaxed tracking-wide animate-in fade-in duration-1000 delay-500 drop-shadow-lg">
                        Discover a world where engineering meets gastronomy.
                        Every dish tells a story of precision and passion.
                    </p>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-700">
                    {/* Primary CTA - High Visibility */}
                    <Button asChild className="h-14 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105">
                        <Link href="#countries">
                            Explore Menu
                        </Link>
                    </Button>

                    {/* Secondary CTA - High Visibility Contrast */}
                    {meal && (
                        <Button asChild className="h-14 px-10 text-lg font-bold rounded-full bg-white text-black hover:bg-gray-200 shadow-xl transition-all transform hover:scale-105">
                            <Link href={`/meal/${meal.idMeal}`}>
                                Todays Special
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce delay-1000 duration-2000">
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2 backdrop-blur-sm">
                    <div className="w-[4px] h-[10px] bg-white rounded-full animate-scroll-down" />
                </div>
            </div>
        </section>
    );
}

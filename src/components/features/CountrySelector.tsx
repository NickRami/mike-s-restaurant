import Link from "next/link";
import { getAreas } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function CountrySelector() {
    const areas = await getAreas();

    return (
        <section id="countries" className="py-20 space-y-12">
            <div className="text-center space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
                <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-2 block">
                    Global Flavors
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Explore by <span className="text-primary italic font-serif">Cuisine</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                    Select a region to uncover its culinary secrets.
                </p>
            </div>

            <Card className="bg-transparent border-none shadow-none">
                <CardContent className="p-0">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {areas.map((area, index) => (
                            <Link
                                key={area.strArea}
                                href={`/country/${area.strArea}`}
                                className="group relative"
                            >
                                <div className="
                                    px-6 py-3 
                                    rounded-full 
                                    border border-muted-foreground/20 
                                    bg-card/30 backdrop-blur-sm 
                                    text-sm font-medium tracking-wide
                                    transition-all duration-300 
                                    hover:bg-primary hover:border-primary hover:text-primary-foreground
                                    hover:shadow-[0_0_15px_-3px_var(--color-primary)]
                                    hover:-translate-y-1
                                    active:scale-95
                                ">
                                    {area.strArea}
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

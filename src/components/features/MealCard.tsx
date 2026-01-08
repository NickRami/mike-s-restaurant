import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { MealSummary } from "@/types";

interface MealCardProps {
    meal: MealSummary;
}

export function MealCard({ meal }: MealCardProps) {
    return (
        <Card className="group overflow-hidden border-none bg-card/40 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2">
            <Link href={`/meal/${meal.idMeal}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-12 h-1 bg-primary mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <h3 className="font-serif font-bold text-2xl text-white leading-tight mb-2 drop-shadow-md">
                            {meal.strMeal}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-foreground/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span>View Recipe</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
}

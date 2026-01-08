import { getMealById } from "@/services/api";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Youtube, Clock, ChefHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MealPageProps {
    params: Promise<{ id: string }>;
}

export default async function MealPage({ params }: MealPageProps) {
    const { id } = await params;
    const meal = await getMealById(id);

    if (!meal) {
        return (
            <div className="container py-32 text-center">
                <h1 className="text-4xl font-bold mb-4">Meal Not Found</h1>
                <p className="text-muted-foreground mb-8">The dish you are looking for has vanished.</p>
                <Button asChild>
                    <Link href="/">Return to Safety</Link>
                </Button>
            </div>
        );
    }

    // Helper to extract ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof typeof meal];
        const measure = meal[`strMeasure${i}` as keyof typeof meal];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                ingredient,
                measure: measure || ""
            });
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    className="object-cover brightness-[0.6]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 text-white max-w-5xl mx-auto">
                    <div className="container mx-auto px-4 md:px-6 space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
                        <Button variant="outline" size="sm" asChild className="mb-4 bg-black/20 border-white/20 text-white backdrop-blur-md hover:bg-white/20 border-none">
                            <Link href={`/country/${meal.strArea}`} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to {meal.strArea}
                            </Link>
                        </Button>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none px-3 py-1 text-sm tracking-wide">
                                {meal.strCategory}
                            </Badge>
                            <Badge variant="outline" className="text-white border-white/30 backdrop-blur-sm px-3 py-1 text-sm tracking-wide">
                                {meal.strArea}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif leading-tight drop-shadow-lg">
                            {meal.strMeal}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16 -mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Ingredients */}
                    <div className="lg:col-span-1 space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-200">
                        <Card className="bg-card border-none shadow-xl overflow-hidden sticky top-24">
                            <div className="bg-primary/5 p-6 border-b border-primary/10">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <ChefHat className="w-6 h-6 text-primary" />
                                    Ingredients
                                </h2>
                            </div>
                            <CardContent className="p-0">
                                <ul className="divide-y divide-border/40">
                                    {ingredients.map((item, idx) => (
                                        <li key={idx} className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors">
                                            <span className="font-medium text-foreground">{item.ingredient}</span>
                                            <span className="text-sm text-muted-foreground font-mono">{item.measure}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {meal.strYoutube && (
                            <Button asChild variant="destructive" className="w-full h-12 gap-2 shadow-lg hover:shadow-red-500/20 transition-all text-base font-semibold">
                                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                                    <Youtube className="w-5 h-5" />
                                    Watch Video Tutorial
                                </a>
                            </Button>
                        )}
                    </div>

                    {/* Right Column: Instructions */}
                    <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-400">
                        <div className="bg-card rounded-xl p-6 md:p-10 shadow-sm border border-border/40">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Clock className="w-7 h-7 text-primary" />
                                Instructions
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-loose">
                                {meal.strInstructions.split('\r\n').map((paragraph, idx) => (
                                    paragraph.trim() && (
                                        <p key={idx} className="mb-6 first-letter:text-3xl first-letter:font-serif first-letter:text-primary first-letter:mr-1">
                                            {paragraph}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>

                        {meal.strTags && (
                            <div className="flex flex-wrap gap-2 pt-4">
                                {meal.strTags.split(",").map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 px-4 py-2 text-sm rounded-full cursor-default">
                                        #{tag.trim()}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

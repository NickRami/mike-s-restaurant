import { getMealsByArea } from "@/services/api";
import { MealCard } from "@/components/features/MealCard";

interface CountryPageProps {
    params: Promise<{ country: string }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
    const { country } = await params;
    // Decode the country parameter as it might be URL encoded
    const decodedCountry = decodeURIComponent(country);

    // API expects "American", not "american" sometimes? 
    // The API seems case-insensitive or usually capitalized.
    // Let's rely on what the API returns in getAreas (which we used for links).

    const meals = await getMealsByArea(decodedCountry);

    return (
        <div className="container mx-auto py-10 px-4 md:px-6 pt-28 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 capitalize">{decodedCountry} Cuisine</h1>

            {meals.length === 0 ? (
                <p className="text-muted-foreground">No meals found for this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {meals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            )}
        </div>
    );
}

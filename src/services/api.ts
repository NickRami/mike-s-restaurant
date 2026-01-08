import { Area, MealDetail, MealSummary, AreaResponse, ApiResponse } from "@/types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function getAreas(): Promise<Area[]> {
    const res = await fetch(`${BASE_URL}/list.php?a=list`, {
        next: { revalidate: 86400 }, // Cache for 24 hours
    });
    if (!res.ok) throw new Error("Failed to fetch areas");
    const data: AreaResponse = await res.json();
    return data.meals || [];
}

export async function getMealsByArea(area: string): Promise<MealSummary[]> {
    const res = await fetch(`${BASE_URL}/filter.php?a=${area}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error(`Failed to fetch meals for area ${area}`);
    const data: ApiResponse<MealSummary> = await res.json();
    return data.meals || [];
}

export async function getMealById(id: string): Promise<MealDetail | null> {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch meal details");
    const data: ApiResponse<MealDetail> = await res.json();
    return data.meals ? data.meals[0] : null;
}

export async function getRandomMeal(): Promise<MealDetail | null> {
    const res = await fetch(`${BASE_URL}/random.php`, {
        next: { revalidate: 0 }, // Always fresh for random? Or maybe cache briefly. 0 is dynamic.
    });
    if (!res.ok) throw new Error("Failed to fetch random meal");
    const data: ApiResponse<MealDetail> = await res.json();
    return data.meals ? data.meals[0] : null;
}

import { Hero } from "@/components/features/Hero";
import { CountrySelector } from "@/components/features/CountrySelector";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Hero />
      <div className="container mx-auto px-4 md:px-6">
        <CountrySelector />
      </div>
    </div>
  );
}

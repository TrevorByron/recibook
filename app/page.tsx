"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PopularRecipe = {
  title: string;
  source: string;
  url: string;
  imageSrc?: string;
};

export default function LandingPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [selectedPopular, setSelectedPopular] = useState<PopularRecipe | null>(null);
  const [selectedPopularUrl, setSelectedPopularUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("recibook_pasted_url", trimmed);
    }
    router.push("/fetching");
  };

  const features = [
    {
      title: "Organize recipes into collections",
      subtitle: (
        <>
          Once your recipes are saved, you can organize them into collections like{" "}
          <span className="font-bold text-[oklch(0.568_0.1_186)]">Breakfast, Lunch, Dinner, Desserts</span>
          …
        </>
      ),
    },
    {
      title: "Find your recipes in seconds",
      subtitle:
        "The time where it took 20 minutes to find a recipe you saved somewhere is over. Just type the recipe or ingredient on the search bar. Voilà.",
    },
    {
      title: "Edit recipes and make them yours",
      subtitle:
        "Want to tweak something? Change the title, edit ingredients, add steps, update nutrition, upload your own photo. Make them yours.",
    },
    {
      title: "Find your recipes in seconds",
      subtitle: "No more hunting for a saved recipe. Search by recipe or ingredient. Voilà.",
    },
  ];

  // Verified Unsplash food images (load via native img to avoid Next.js optimizer issues)
  const popularRecipes: PopularRecipe[] = [
    {
      title: "One-Pan Baked Feta Pasta",
      source: "TikTok classic",
      url: "https://www.example.com/recipes/one-pan-baked-feta-pasta",
      imageSrc: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80&fit=crop",
    },
    {
      title: "Crispy Parmesan Roast Potatoes",
      source: "Sunday dinner favorite",
      url: "https://www.example.com/recipes/crispy-parmesan-roast-potatoes",
      imageSrc: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&q=80&fit=crop",
    },
    {
      title: "Garlic Butter Salmon Bites",
      source: "Quick weeknight dinner",
      url: "https://www.example.com/recipes/garlic-butter-salmon-bites",
      imageSrc: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80&fit=crop",
    },
    {
      title: "15-Minute Peanut Noodles",
      source: "Fast & flavorful",
      url: "https://www.example.com/recipes/15-minute-peanut-noodles",
      imageSrc: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&q=80&fit=crop",
    },
    {
      title: "Overnight Baked French Toast",
      source: "Brunch crowd-pleaser",
      url: "https://www.example.com/recipes/overnight-baked-french-toast",
      imageSrc: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80&fit=crop",
    },
    {
      title: "Creamy Tuscan Chicken",
      source: "Comfort food",
      url: "https://www.example.com/recipes/creamy-tuscan-chicken",
      imageSrc: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80&fit=crop",
    },
    {
      title: "Sheet-Pan Veggie Tacos",
      source: "Meatless Monday",
      url: "https://www.example.com/recipes/sheet-pan-veggie-tacos",
      imageSrc: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&fit=crop",
    },
    {
      title: "No-Bake Chocolate Peanut Butter Bars",
      source: "Easy dessert",
      url: "https://www.example.com/recipes/no-bake-chocolate-peanut-butter-bars",
      imageSrc: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80&fit=crop",
    },
    {
      title: "Lemon Garlic Roast Chicken",
      source: "Weekend staple",
      url: "https://www.example.com/recipes/lemon-garlic-roast-chicken",
      imageSrc: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero — full-bleed background; header sits on top so gradient blends underneath */}
      <section className="relative min-h-screen flex flex-col bg-gradient-to-b from-[oklch(0.9815_0.009_193.3)] to-[oklch(0.956_0.057_195)]">
        <header className="w-full shrink-0">
          <div className="px-6 sm:px-8 md:px-10 flex items-center justify-between pt-6 sm:pt-8">
            <a href="/" className="block w-[100px]" aria-label="Recibook home">
              <Image
                src="/recibook-logo-text.png"
                alt="Recibook"
                width={100}
                height={32}
                className="h-auto w-[100px]"
              />
            </a>
            <a
              href="/recipes"
              className="inline-flex items-center justify-center rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-white/90 hover:text-primary shrink-0"
            >
              Login
            </a>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-10 w-full py-20 sm:py-28">
          <div className="max-w-2xl mx-auto w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold tracking-tight text-[oklch(0.314_0.055_186)] mb-4 sm:mb-5">
              Save recipes from anywhere.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 sm:mb-12">
              Copy recipes from TikTok, Instagram, Facebook, and Pinterest. Snap photos of handwritten family recipes—we&apos;ll organize everything for you.
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-2 w-full rounded-xl bg-white border border-input focus-within:border-[oklch(0.568_0.1_186)] p-2 sm:pl-4 sm:pr-2 sm:py-2 min-h-[56px] sm:min-h-[52px] transition-colors shadow-2xl">
                <div className="flex items-center flex-1">
                  <Input
                    type="url"
                    inputMode="url"
                    placeholder="Paste recipe URL here..."
                    value={url}
                    onChange={(e) => {
                      const next = e.target.value;
                      setUrl(next);
                      if (selectedPopular && next.trim() !== selectedPopular.url) {
                        setSelectedPopular(null);
                        setSelectedPopularUrl(next);
                      }
                    }}
                    className="flex-1 min-h-[44px] sm:min-h-0 border-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 px-2 sm:px-0"
                    aria-label="Recipe URL"
                  />
                  <label
                    htmlFor="hero-image-upload"
                    className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-input bg-transparent text-muted-foreground hover:bg-muted/40 cursor-pointer transition-colors [&_svg]:h-4 [&_svg]:w-4"
                    aria-label="Attach recipe image"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="3" ry="3" />
                      <circle cx="9" cy="10" r="2" />
                      <path d="M21 16l-4.5-4.5a1 1 0 0 0-1.4 0L10 17" />
                    </svg>
                  </label>
                  <input
                    id="hero-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 min-h-[44px] sm:min-h-[36px] w-full sm:w-auto"
                >
                  Save Recipe
                </Button>
              </div>
            </form>

            <div className="mt-10 text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-[oklch(0.314_0.055_186)] mb-2">
                Don&apos;t have a recipe link handy?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Have a look through these popular recipes and save one for later.
              </p>
              <div className="-mx-4 sm:mx-0 overflow-x-auto pb-3">
              <div className="flex gap-4 sm:gap-6 px-4 sm:px-0 py-2 min-w-max">
                  {popularRecipes.map((recipe) => {
                    const isSelected = selectedPopular?.url === recipe.url;
                    const isDimmed = selectedPopular && !isSelected;

                    return (
                      <button
                        key={recipe.url}
                        type="button"
                        onClick={() => {
                          setSelectedPopular(recipe);
                          setSelectedPopularUrl(recipe.url);
                          setUrl(recipe.url);
                          if (typeof sessionStorage !== "undefined") {
                            sessionStorage.setItem("recibook_pasted_url", recipe.url);
                          }
                          router.push("/recipe");
                        }}
                        aria-pressed={isSelected}
                        className={`group/card relative flex-shrink-0 w-36 sm:w-40 h-28 sm:h-36 rounded-2xl text-left font-semibold transition-opacity hover:opacity-90 active:shadow-none bg-card text-card-foreground ${
                          isSelected
                            ? "ring-4 ring-[oklch(0.568_0.1_186)] shadow-none"
                            : "shadow-md"
                        }`}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-2xl">
                          {recipe.imageSrc && (
                            <img
                              src={recipe.imageSrc}
                              alt={recipe.title}
                              className={`absolute inset-0 h-full w-full object-cover transition duration-200 ${
                                isDimmed ? "grayscale opacity-60" : ""
                              }`}
                            />
                          )}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5 transition duration-200 ${
                              isDimmed ? "opacity-80" : ""
                            }`}
                          />
                          <div className="absolute inset-x-0 bottom-0 p-3">
                            <div className="text-[11px] text-white/80 mb-0.5">
                              {recipe.source}
                            </div>
                            <div className="text-sm font-semibold text-white leading-snug">
                              {recipe.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below the fold — Lovable-style: section header + vertical blocks with screenshot placeholders */}
      <section className="bg-background px-6 sm:px-8 md:px-10 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              All your recipes, in one place
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Find a recipe online and share it to Recibook on{" "}
              <span className="font-bold text-[oklch(0.568_0.1_186)]">WhatsApp</span>
              . Recibook extracts ingredients, steps, and nutrition, then saves it in your personal Recibook.
            </p>
          </div>

          <div className="space-y-14 sm:space-y-20">
            {features.map((feature, i) => (
              <article key={i} className="flex flex-col">
                {i === 0 ? (
                  <div className="w-full aspect-[4/3] sm:aspect-video relative rounded-xl overflow-hidden mb-6 sm:mb-8">
                    <img
                      src="/recibook-whatsapp-flow.png"
                      alt="Recibook app with recipe collections and WhatsApp conversation showing share-to-Recibook flow"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : i === 1 ? (
                  <div className="w-full aspect-[4/3] sm:aspect-video relative rounded-xl overflow-hidden mb-6 sm:mb-8">
                    <img
                      src="/recibook-collections-screenshot.png"
                      alt="Recibook app showing Dinner, Lunch, and Breakfast recipe collections"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : i === 2 ? (
                  <div className="w-full aspect-[4/3] sm:aspect-video relative rounded-xl overflow-hidden mb-6 sm:mb-8">
                    <img
                      src="/recibook-recipe-detail.png"
                      alt="Recibook recipe detail view with ingredients, steps, and nutrition"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : i === 3 ? (
                  <div className="w-full aspect-[4/3] sm:aspect-video relative rounded-xl overflow-hidden mb-6 sm:mb-8">
                    <img
                      src="/recibook-edit-recipe.png"
                      alt="Recibook edit recipe view: ingredients and steps editing"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                {i === 0 ? (
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h2>
                ) : (
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                )}
                <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
                  {feature.subtitle}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-[oklch(0.9815_0.009_193.3)] to-[oklch(0.956_0.057_195)] border-t border-border py-12 sm:py-16">
        <div className="px-6 sm:px-8 md:px-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-foreground">
            Never lose a recipe again. Send us a message with a link to the recipe and we will save it for you.
            <br />
            It&apos;s that simple.
          </h3>
          <div className="w-full max-w-xl">
            <div className="flex flex-col sm:flex-row gap-2 w-full rounded-xl bg-white border border-input p-2 sm:pl-4 sm:pr-2 sm:py-2 min-h-[56px] sm:min-h-[52px] transition-colors shadow-2xl">
              <div className="flex items-center flex-1">
                <Input
                  type="url"
                  inputMode="url"
                  placeholder="Paste recipe URL here..."
                  value={selectedPopularUrl}
                  onChange={(e) => setSelectedPopularUrl(e.target.value)}
                  className="flex-1 h-[44px] border-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 px-2 sm:px-0 truncate"
                  aria-label="Recipe URL"
                />
              </div>
              <a
                href={`https://wa.me/18583199605?text=${encodeURIComponent(
                  selectedPopularUrl.trim()
                    ? `I’d like to save this recipe in Recibook: ${selectedPopularUrl.trim()}`
                    : "I’d like to save a recipe in Recibook."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 min-h-[44px] sm:min-h-[36px] w-full sm:w-auto [&_svg]:size-5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-[oklch(0.25_0.044_186)] text-white py-6 sm:py-8">
        <div className="px-6 sm:px-8 md:px-10 max-w-3xl mx-auto flex flex-col items-center gap-4 text-center text-sm">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of service
            </a>
          </nav>
          <p className="text-white/90">
            © 2025 Recibook. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
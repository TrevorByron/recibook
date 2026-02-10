"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { MOCK_RECIPE } from "@/lib/mock-recipe";
import { generateRandomRecipe } from "@/lib/random-recipe";
import type { MockRecipe } from "@/lib/mock-recipe";

const STORAGE_KEY = "recibook_recipes";

function loadRecipesFromStorage(): MockRecipe[] {
  if (typeof localStorage === "undefined") return [MOCK_RECIPE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [MOCK_RECIPE];
    const parsed = JSON.parse(raw) as MockRecipe[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [MOCK_RECIPE];
  } catch {
    return [MOCK_RECIPE];
  }
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const COLLECTIONS = [
  { id: "all", name: "All" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
  { id: "desserts", name: "Desserts" },
] as const;

function matchesSearch(recipe: MockRecipe, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (recipe.title.toLowerCase().includes(q)) return true;
  const ingredientText = recipe.ingredients
    .map((i) => i.name)
    .join(" ")
    .toLowerCase();
  return ingredientText.includes(q);
}

function matchesCollection(recipe: MockRecipe, collectionId: string): boolean {
  if (collectionId === "all") return true;
  return recipe.collectionIds?.includes(collectionId) ?? false;
}

export default function YourRecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<MockRecipe[]>(() => [MOCK_RECIPE]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [createUrl, setCreateUrl] = useState("");

  useEffect(() => {
    setRecipes(loadRecipesFromStorage());
  }, []);

  const showWhatsAppEmptyState = recipes.length <= 1;

  const filteredRecipes = useMemo(() => {
    return recipes.filter(
      (r) =>
        matchesCollection(r, selectedCollectionId) && matchesSearch(r, searchQuery)
    );
  }, [recipes, searchQuery, selectedCollectionId]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = createUrl.trim();
    if (!trimmed) return;
    const newRecipe = generateRandomRecipe();
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("recibook_pasted_url", trimmed);
      sessionStorage.setItem("recibook_skip_phone_modal", "true");
      sessionStorage.setItem("recibook_current_recipe", JSON.stringify(newRecipe));
    }
    setModalOpen(false);
    setCreateUrl("");
    router.push("/fetching");
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-to-b from-[oklch(0.9815_0.009_193.3)] to-[oklch(0.956_0.057_195)]">
      <div className="max-w-lg mx-auto">
        <header className="w-full shrink-0 mb-6">
          <a href="/" className="block w-[100px]" aria-label="Recibook home">
            <Image
              src="/recibook-logo-text.png"
              alt="Recibook"
              width={100}
              height={32}
              className="h-auto w-[100px]"
            />
          </a>
        </header>

        <div className="flex items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[oklch(0.314_0.055_186)]">
            Your recipes
          </h1>
          <Button
            onClick={() => setModalOpen(true)}
            size="icon"
            className="bg-primary text-primary-foreground hover:opacity-90 shrink-0"
            aria-label="Create recipe"
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>

        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search recipes or ingredients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white"
            aria-label="Search recipes or ingredients"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {COLLECTIONS.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedCollectionId(id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedCollectionId === id
                  ? "bg-[oklch(0.568_0.1_186)] text-white border-[oklch(0.568_0.1_186)]"
                  : "bg-white/80 border-border text-foreground hover:bg-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          {filteredRecipes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              No recipes match your search or filter.
            </p>
          ) : (
            filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe?id=${encodeURIComponent(recipe.id)}&from=recipes`}
                className="block"
              >
                <Card
                  size="sm"
                  className="flex-row items-center gap-3 py-2 px-3 transition-opacity hover:opacity-90 active:shadow-none rounded-xl shadow-md"
                >
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={recipe.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {recipe.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Serves {recipe.baseServings} · Tap to view and edit
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>

        {showWhatsAppEmptyState && (
          <div className="mt-6 rounded-xl px-0 py-5 text-center text-sm text-muted-foreground">
            <p className="font-semibold mb-2 text-[oklch(0.314_0.055_186)]">
              Nice! you&apos;ve added your first recipe!
            </p>
            <p style={{ textAlign: "center" }}>
              To add more recipes from anywhere else, just share the link to
              Recibook on WhatsApp, exactly like you would sent it to a friend.
              We&apos;ll organize it from there.
            </p>
            <div className="mt-4 mx-auto w-64 max-w-full">
              <div className="overflow-hidden rounded-2xl shadow-2xl opacity-90">
                <img
                  src="/share_image-whatsapp.jpg"
                  alt="Example of sharing a recipe link to Recibook on WhatsApp"
                  width={512}
                  height={512}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent
          size="default"
          onBackdropClick={() => setModalOpen(false)}
          className="gap-6 p-6 sm:p-8 sm:w-full sm:min-w-[min(100vw-2rem,28rem)] sm:max-w-md sm:max-w-lg sm:mx-8 md:mx-10"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Create recipe</AlertDialogTitle>
            <AlertDialogDescription>
              Paste a recipe URL and we&apos;ll extract the ingredients and
              steps for you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleCreateSubmit} className="grid gap-4">
            <Input
              type="url"
              inputMode="url"
              placeholder="Paste recipe URL here..."
              value={createUrl}
              onChange={(e) => setCreateUrl(e.target.value)}
              className="min-h-[44px] text-base"
              aria-label="Recipe URL"
            />
            <AlertDialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto min-h-[48px] text-base bg-primary text-primary-foreground hover:opacity-90"
              >
                Create Recipe
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

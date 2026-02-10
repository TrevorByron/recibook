"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { MOCK_RECIPE } from "@/lib/mock-recipe";
import type { MockRecipe, StructuredIngredient } from "@/lib/mock-recipe";

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

function resolveRecipe(id: string | null, currentRecipeJson: string | null): MockRecipe {
  if (currentRecipeJson) {
    try {
      const parsed = JSON.parse(currentRecipeJson) as MockRecipe;
      if (parsed.id && parsed.title && parsed.ingredients && parsed.steps) return parsed;
    } catch {
      // ignore
    }
  }
  if (id) {
    const list = loadRecipesFromStorage();
    const found = list.find((r) => r.id === id);
    if (found) return found;
  }
  return MOCK_RECIPE;
}
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { ArrowLeft, Share2, Link, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const saveRecipeFormSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => value && isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
});

type SaveRecipeFormData = z.infer<typeof saveRecipeFormSchema>;

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 24;

function formatAmount(amount: number): string {
  if (amount % 1 === 0) return String(amount);
  return amount.toFixed(1);
}

function scaleIngredient(
  ing: StructuredIngredient,
  servings: number,
  baseServings: number
): string {
  const scaled = (ing.amount * servings) / baseServings;
  return `${formatAmount(scaled)} ${ing.unit} ${ing.name}`;
}

export default function RecipePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromRecipesList = searchParams.get("from") === "recipes";
  const recipeId = searchParams.get("id");
  const [recipe, setRecipe] = useState<MockRecipe>(MOCK_RECIPE);
  const [servings, setServings] = useState(recipe.baseServings);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    () => new Set()
  );

  useEffect(() => {
    const currentJson =
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem("recibook_current_recipe")
        : null;
    const resolved = resolveRecipe(recipeId, currentJson);
    setRecipe(resolved);
    setServings(resolved.baseServings);
  }, [recipeId]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SaveRecipeFormData>({
    resolver: zodResolver(saveRecipeFormSchema),
    defaultValues: { phone: "" },
  });

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const onSaveSubmit = () => {
    setModalOpen(false);
    router.push("/recipes");
  };

  const handleSaveWithoutPhone = () => {
    const list = loadRecipesFromStorage();
    if (!list.some((r) => r.id === recipe.id)) {
      list.push(recipe);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch {
        // ignore
      }
    }
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("recibook_skip_phone_modal");
      sessionStorage.removeItem("recibook_current_recipe");
    }
    router.push("/recipes");
  };

  const handleDelete = () => {
    const list = loadRecipesFromStorage();
    const filtered = list.filter((r) => r.id !== recipe.id);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filtered.length > 0 ? filtered : [MOCK_RECIPE])
      );
    } catch {
      // ignore
    }
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("recibook_current_recipe");
    }
    setDeleteModalOpen(false);
    router.push("/recipes");
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Hero image — ~1/3 of viewport height */}
      <div className="relative w-full h-[33vh] min-h-[200px] bg-muted">
        <Image
          src={recipe.imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {fromRecipesList && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute left-4 top-[max(0.75rem,env(safe-area-inset-top))] z-10 min-w-[44px] min-h-[44px] rounded-full bg-background/90 shadow-md border-0"
            onClick={() => router.back()}
            aria-label="Back to your recipes"
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}
      </div>

      <div className="px-4 max-w-lg mx-auto -mt-20 relative z-10">
        {fromRecipesList && (
          <div className="flex items-center gap-2 mb-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full bg-white shadow-md text-[oklch(0.568_0.1_186)] hover:bg-white hover:opacity-90 min-w-[44px] min-h-[44px]"
              aria-label="Share"
            >
              <Share2 className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full bg-white shadow-md text-[oklch(0.568_0.1_186)] hover:bg-white hover:opacity-90 min-w-[44px] min-h-[44px]"
              aria-label="Copy link"
            >
              <Link className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full bg-white shadow-md text-[oklch(0.568_0.1_186)] hover:bg-white hover:opacity-90 min-w-[44px] min-h-[44px]"
              aria-label="Edit recipe"
            >
              <Pencil className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full bg-white shadow-md text-[oklch(0.568_0.1_186)] hover:bg-white hover:opacity-90 min-w-[44px] min-h-[44px]"
              aria-label="Delete recipe"
              onClick={() => setDeleteModalOpen(true)}
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        )}
        <div className="bg-background rounded-t-2xl shadow-lg pt-6 pb-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[oklch(0.314_0.055_186)] mb-6">
            {recipe.title}
          </h1>

          {/* Serving adjuster */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground">Serves</span>
            <div className="flex items-center gap-1 border border-border rounded-4xl overflow-hidden">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-none min-w-[44px] min-h-[44px]"
                onClick={() =>
                  setServings((s) => (s > MIN_SERVINGS ? s - 1 : s))
                }
                aria-label="Decrease servings"
              >
                −
              </Button>
              <span
                className="min-w-[2.5rem] text-center font-medium tabular-nums"
                aria-live="polite"
              >
                {servings}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-none min-w-[44px] min-h-[44px]"
                onClick={() =>
                  setServings((s) => (s < MAX_SERVINGS ? s + 1 : s))
                }
                aria-label="Increase servings"
              >
                +
              </Button>
            </div>
          </div>

          {/* Ingredients — check off while cooking */}
          <section className="mb-8">
            <h2 className="text-base font-medium mb-3">Ingredients</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {recipe.ingredients.map((ing, i) => {
                const checked = checkedIngredients.has(i);
                return (
                  <li key={i}>
                    <label className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleIngredient(i)}
                        className="size-5 shrink-0 rounded border-input cursor-pointer accent-[var(--primary)]"
                        aria-label={`Mark "${scaleIngredient(ing, servings, recipe.baseServings)}" as done`}
                      />
                      <span
                        className={
                          checked
                            ? "text-muted-foreground/70 line-through"
                            : ""
                        }
                      >
                        {scaleIngredient(
                          ing,
                          servings,
                          recipe.baseServings
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Instructions */}
          <section className="mb-8">
            <h2 className="text-base font-medium mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {/* Sticky footer: Save Recipe CTA (only when not from Your recipes) */}
      {!fromRecipesList && (
        <footer className="fixed bottom-0 left-0 right-0 z-20 bg-background border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="max-w-lg mx-auto">
            <Button
              size="lg"
              className="w-full min-h-[48px] text-base"
              onClick={() => {
                if (
                  typeof sessionStorage !== "undefined" &&
                  sessionStorage.getItem("recibook_skip_phone_modal") === "true"
                ) {
                  handleSaveWithoutPhone();
                  return;
                }
                setModalOpen(true);
              }}
            >
              Save Recipe
            </Button>
          </div>
        </footer>
      )}

      {/* Phone number modal */}
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent
          size="default"
          className="gap-6 max-w-md sm:max-w-lg p-6 sm:p-8"
          onBackdropClick={() => setModalOpen(false)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Save to your Recibook</AlertDialogTitle>
            <AlertDialogDescription>
              Your phone number lets you quickly save future recipes and
              simplifies future logins.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSaveSubmit)} className="grid gap-4">
            <div className="flex flex-col gap-1">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    id="phone"
                    placeholder="Enter a phone number"
                    className="min-h-[44px] w-full"
                    aria-label="Phone number"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <AlertDialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto min-h-[48px] text-base"
              >
                Save Recipe and Create an Account
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirmation modal */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent
          size="default"
          className="gap-6 max-w-md sm:max-w-lg p-6 sm:p-8"
          onBackdropClick={() => setDeleteModalOpen(false)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete recipe?</AlertDialogTitle>
            <AlertDialogDescription>
              This recipe will be removed from your collection. This can&apos;t be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 w-full">
            <AlertDialogCancel className="flex-1 min-h-[48px]">Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              size="lg"
              className="flex-1 min-h-[48px]"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

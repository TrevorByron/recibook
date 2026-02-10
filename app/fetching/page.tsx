"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function FetchingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/recipe");
    }, 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[oklch(0.9815_0.009_193.3)] to-[oklch(0.956_0.057_195)]">
      <header className="w-full shrink-0">
        <div className="px-6 sm:px-8 md:px-10 flex items-center pt-6 sm:pt-8">
          <a href="/" className="block w-[100px]" aria-label="Recibook home">
            <Image
              src="/recibook-logo-text.png"
              alt="Recibook"
              width={100}
              height={32}
              className="h-auto w-[100px]"
            />
          </a>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-sm">
          {/* Subtle spinner: thin ring, slow rotation */}
          <div
            className="w-10 h-10 mx-auto rounded-full border-2 border-muted-foreground/20 border-t-[oklch(0.568_0.1_186)] animate-spin"
            aria-hidden
          />
          <div className="space-y-2">
            <p className="text-lg font-medium text-[oklch(0.314_0.055_186)]">
              Fetching recipe…
            </p>
            <p className="text-sm text-muted-foreground">
              We&apos;re extracting ingredients and steps.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

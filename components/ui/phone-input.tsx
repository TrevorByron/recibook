"use client";

import * as React from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<typeof PhoneInputWithCountry>,
  "onChange"
> & {
  onChange?: (value: string | undefined) => void;
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
  // PhoneInputWithCountry is a class component and doesn't accept HTMLInputElement ref;
  // ref is accepted for API compatibility but not forwarded to the library.
  return (
    <PhoneInputWithCountry
      className={cn(
        "flex gap-2 rounded-lg border bg-input/30 px-3 py-2 text-base transition-colors",
        "border-input focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
        "placeholder:text-muted-foreground outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "min-h-9 [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none",
        className
      )}
      defaultCountry="US"
      international
      onChange={onChange ?? (() => {})}
      {...props}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };

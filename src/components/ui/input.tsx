import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>): React.JSX.Element {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-[#2f6a4b]/26 bg-white px-3 text-sm text-[#234835] outline-none transition focus:border-[#2f6a4b] focus:ring-2 focus:ring-[#2f6a4b]/20",
        className,
      )}
      {...props}
    />
  );
}

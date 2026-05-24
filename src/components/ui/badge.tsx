import * as React from "react";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.09em]",
        variant === "secondary" ? "bg-[#f4eee2] text-[#335e47]" : "bg-[#2f6a4b] text-white",
        className,
      )}
      {...props}
    />
  );
}

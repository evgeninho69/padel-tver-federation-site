"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type PopoverContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rootRef: React.RefObject<HTMLDivElement | null>;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function Popover({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, rootRef }}>
      <div ref={rootRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: (event: React.MouseEvent) => void }>;
}): React.JSX.Element {
  const context = React.useContext(PopoverContext);
  if (!context) {
    return children;
  }

  const triggerProps = {
    onClick: (event: React.MouseEvent) => {
      children.props.onClick?.(event);
      context.setOpen((value) => !value);
    },
  };

  if (!asChild) {
    return <button {...triggerProps}>{children}</button>;
  }

  return React.cloneElement(children, triggerProps);
}

export function PopoverContent({ className, children }: { className?: string; children: React.ReactNode }): React.JSX.Element | null {
  const context = React.useContext(PopoverContext);
  if (!context?.open) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-20 mt-2 rounded-lg border border-[#2f6a4b]/18 bg-[#fffdf8] p-3 shadow-xl",
        className,
      )}
      role="dialog"
      aria-modal="false"
    >
      {children}
    </div>
  );
}

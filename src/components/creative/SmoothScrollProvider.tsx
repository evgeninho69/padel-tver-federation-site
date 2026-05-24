"use client";

import * as React from "react";

import gsap from "gsap";
import { ReactLenis, type LenisRef } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps): React.JSX.Element {
  const lenisRef = React.useRef<LenisRef>(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const update = (time: number): void => {
      lenisRef.current?.lenis?.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

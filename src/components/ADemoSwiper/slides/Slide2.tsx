// SlideTwo.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type Props = {
  isActive: boolean;
};

export default function SlideTwo({ isActive }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {}, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] md:h-screen flex items-center justify-center px-4 text-black"
    >
      <div className="relative w-full h-[65vh] md:h-[70vh] lg:w-[70%] perspective-[1000px]">
        
      </div>
    </div>
  );
}

// SlideThree.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type Props = {
  isActive: boolean;
};

export default function SlideThree({ isActive }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current || !isActive) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".text",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
      );
    }, ref);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="relative h-screen flex items-center justify-center"
    >
      <div
        className="
      relative 
      w-full 
      h-[40vh] 
      sm:h-[50vh] 
      md:h-[60vh] 
      lg:w-[70%] 
      lg:h-[70vh]
    "
      >
        <Image
          src="/images/ha-noi.jpg"
          alt="slide-3"
          fill
          className="object-cover rounded-xl"
          loading="eager"
        />
      </div>

      <div
        className="
      text 
      absolute 
      text-white 
      font-bold 
      text-2xl 
      sm:text-3xl 
      md:text-4xl 
      lg:text-5xl
    "
      >
        Slide 3
      </div>
    </div>
  );
}

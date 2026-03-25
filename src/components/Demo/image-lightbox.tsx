"use client";

import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface LightboxData {
  image: string;
  imageAlt: string;
  title: string;
  text: string;
  date: string;
  accent: string;
}

interface ImageLightboxProps {
  data: LightboxData | null;
  sourceRect: DOMRect | null;
  onClose: () => void;
}

export default function ImageLightbox({
  data,
  sourceRect,
  onClose,
}: ImageLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const animateIn = useCallback(() => {
    if (!overlayRef.current || !imageRef.current || !textRef.current || !sourceRect)
      return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimatingRef.current = false; },
    });
    tlRef.current = tl;

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const imgTarget = imageRef.current;

    const startX = sourceRect.left + sourceRect.width / 2 - vw / 2;
    const startY = sourceRect.top + sourceRect.height / 2 - vh / 2;
    const startScale = Math.min(
      sourceRect.width / (imgTarget.offsetWidth || 400),
      sourceRect.height / (imgTarget.offsetHeight || 300),
    ) || 0.3;

    tl.fromTo(
      imgTarget,
      {
        x: startX,
        y: startY,
        scale: startScale,
        rotation: (Math.random() - 0.5) * 20,
        opacity: 0.5,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      "-=0.15",
    );

    tl.fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.3",
    );
  }, [sourceRect]);

  const animateOut = useCallback(() => {
    if (!overlayRef.current || !imageRef.current) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    // Kill any running timeline
    tlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        onClose();
      },
    });

    tl.to(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    tl.to(
      imageRef.current,
      { scale: 0.8, opacity: 0, y: 30, duration: 0.35, ease: "power2.in" },
      "-=0.15",
    );

    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.25, ease: "power2.in" },
      "-=0.2",
    );
  }, [onClose]);

  // Animate in when data arrives — use requestAnimationFrame to avoid sync setState in effect
  useEffect(() => {
    if (data && sourceRect) {
      requestAnimationFrame(() => animateIn());
    }
  }, [data, sourceRect, animateIn]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && data) animateOut();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [data, animateOut]);

  if (!data) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{ opacity: 0 }}
      onClick={animateOut}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 flex flex-col items-center max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={imageRef}
          className="relative w-full aspect-[16/10] max-h-[60vh] rounded-md overflow-hidden border-4 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>

        <div ref={textRef} className="mt-6 text-center max-w-2xl">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-3"
            style={{ backgroundColor: data.accent }}
          >
            {data.date}
          </span>
          <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            {data.title}
          </h3>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            {data.text}
          </p>
        </div>

        <p className="text-white/40 text-xs mt-6">
          Click bất kỳ đâu hoặc nhấn ESC để đóng
        </p>
      </div>
    </div>
  );
}
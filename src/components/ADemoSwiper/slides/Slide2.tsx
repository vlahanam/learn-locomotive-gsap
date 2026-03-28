"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText);

type Props = {
  isActive: boolean;
};

export default function SlideTwo({ isActive }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });

      // ── 1. Heading — SplitText revert after animation ──
      const headingSplit = new SplitText(".s2-heading", {
        type: "words,chars",
      });
      gsap.set(".s2-heading", { visibility: "visible" });

      tl.fromTo(
        headingSplit.chars,
        { y: 60, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => headingSplit.revert(),
        },
      );

      // ── 2. Item 1: image slides from right + spins, then scales ──
      tl.fromTo(
        ".s2-img1",
        { x: 300, opacity: 0, rotate: 360 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.85,
          ease: "power3.out",
        },
        "+=0.1",
      ).to(".s2-img1", {
        scale: 1.08,
        duration: 0.25,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });

      // Label 1 — SplitText revert after animation
      const label1Split = new SplitText(".s2-label1", { type: "words" });
      tl.fromTo(
        label1Split.words,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => label1Split.revert(),
        },
        "-=0.3",
      );

      // ── 3. Item 2: image slides from right + spins, then scales ──
      tl.fromTo(
        ".s2-img2",
        { x: 300, opacity: 0, rotate: 360 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.85,
          ease: "power3.out",
        },
        "+=0.1",
      ).to(".s2-img2", {
        scale: 1.08,
        duration: 0.25,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });

      // Label 2 — SplitText revert after animation
      const label2Split = new SplitText(".s2-label2", { type: "words" });
      tl.fromTo(
        label2Split.words,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => label2Split.revert(),
        },
        "-=0.3",
      );

      // ── 4. Item 3: image slides from right + spins, then scales ──
      tl.fromTo(
        ".s2-img3",
        { x: 300, opacity: 0, rotate: 360 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.85,
          ease: "power3.out",
        },
        "+=0.1",
      ).to(".s2-img3", {
        scale: 1.08,
        duration: 0.25,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });

      // Label 3 — SplitText revert after animation
      const label3Split = new SplitText(".s2-label3", { type: "words" });
      tl.fromTo(
        label3Split.words,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => label3Split.revert(),
        },
        "-=0.3",
      );

      // ── 5. Conclusion — mũi tên slide từ trái + SplitText cho text ──
      const conclusionSplit = new SplitText(".s2-conclusion-text", {
        type: "words,chars",
      });

      // Mũi tên slide từ trái vào trước
      tl.fromTo(
        ".s2-arrow",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.15",
      );

      // Text conclusion xuất hiện ngay sau mũi tên
      tl.fromTo(
        conclusionSplit.chars,
        { x: -40, opacity: 0, skewX: -15 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          stagger: 0.03,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => conclusionSplit.revert(),
        },
        "-=0.3",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] md:h-screen flex items-center justify-center text-black"
    >
      <div className="relative w-full h-[65vh] md:h-[70vh] lg:w-[70%] perspective-[1000px] flex flex-col gap-24 md:gap-10 lg:gap-16 p-4 md:p-10 rounded-lg">
        {/* ── Heading ── */}
        <div className="md:left-10 uppercase">
          <p className="s2-heading invisible text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
            Thế lực thù địch đã dùng
          </p>
        </div>

        <div className="w-full flex justify-between">
          {/* ── Item 1 ── */}
          <div className="w-[40%] md:w-[30%]">
            <div className="s2-img1 aspect-[16/9] mt-5">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/dola.png"
                  alt="dola"
                  fill
                  className="object-cover object-center scale-105 hover:scale-110 transition duration-700"
                />
              </div>
            </div>
            <div className="s2-label1 text-lg md:text-2xl font-semibold text-[#8B4513] uppercase mt-2 flex justify-center">
              <p className="w-fit">14 tấn tiền giả</p>
            </div>
          </div>

          {/* ── Item 2 ── */}
          <div className="w-[40%] md:w-[30%]">
            <div className="s2-img2 aspect-[16/9] mt-5">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/mat-ma-dien-dai.png"
                  alt="mat-ma-dien-dai"
                  fill
                  className="object-cover object-center scale-105 hover:scale-110 transition duration-700"
                />
              </div>
            </div>
            <div className="s2-label1 text-lg md:text-2xl font-semibold text-[#8B4513] uppercase mt-2 flex justify-center">
              <p className="w-fit">Mật mã điện đài</p>
            </div>
          </div>

          {/* ── Item 3 ── */}
          <div className="w-[40%] md:w-[30%]">
            <div className="s2-img3 aspect-[16/9] mt-5">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/con-dau.png"
                  alt="con-dau"
                  fill
                  className="object-cover object-center scale-105 hover:scale-110 transition duration-700"
                />
              </div>
            </div>
            <div className="s2-label1 text-lg md:text-2xl font-semibold text-[#8B4513] uppercase mt-2 flex justify-center">
              <p className="w-fit">Hệ thống con dấu</p>
            </div>
          </div>
        </div>

        {/* ── Conclusion ── */}
        <div className="s2-conclusion relative flex items-center gap-4 uppercase">
          <p className="s2-conclusion-text relative z-10 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-red-500 tracking-wide">
            Một Kế Hoạch Tinh Vi
          </p>

          <div className="s2-arrow absolute -left-32 md:-left-40 top-[29%] -translate-y-1/2 w-32 md:w-40 aspect-[16/9]">
            <Image
              src="/images/mui-ten.png"
              alt="mui-ten"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

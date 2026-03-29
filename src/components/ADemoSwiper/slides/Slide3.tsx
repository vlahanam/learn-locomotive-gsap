// SlideThree.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText);

type Props = {
  isActive: boolean;
};

export default function SlideThree({ isActive }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });

      // ── 1. Heading — SplitText Animate Text ──
      const headingSplit = new SplitText(".s3-heading", { type: "words,chars" });
      gsap.set(".s3-heading", { visibility: "visible" });

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
        }
      );

      // ── 2. Phase 1: title + Image 1 — slide từ trái vào ──
      tl.fromTo(
        ".s3-p1-arrow",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "+=0.2"
      );

      const p1TitleSplit = new SplitText(".s3-p1-title", { type: "words,chars" });
      tl.fromTo(
        p1TitleSplit.chars,
        { x: -40, opacity: 0, skewX: -15 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => p1TitleSplit.revert(),
        },
        "-=0.35"
      );

      // ── 3. Image 2 — slide từ trái vào ──
      tl.fromTo(
        ".s3-img2",
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "+=0.1"
      );

      // ── 4. Image 3 — slide từ dưới lên ──
      tl.fromTo(
        ".s3-img3",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      // ── 5. Image 4 — slide từ phải vào ──
      tl.fromTo(
        ".s3-img4",
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      // ── 6. Ẩn body phase 1, hiện phase 2 ──
      tl.to(
        ".s3-p1-body",
        { opacity: 0, duration: 0.4, ease: "power2.inOut" },
        "+=0.6"
      );
      tl.set(".s3-p1-body", { display: "none" });
      tl.set(".s3-p2-title-wrapper", { display: "flex" });
      tl.set(".s3-p2-body", { display: "flex" });

      // ── 7. Phase 2: title + Image 5 — slide từ trái vào ──
      tl.fromTo(
        ".s3-p2-arrow",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "+=0.1"
      );

      const p2TitleSplit = new SplitText(".s3-p2-title", { type: "words,chars" });
      tl.fromTo(
        p2TitleSplit.chars,
        { x: -40, opacity: 0, skewX: -15 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => p2TitleSplit.revert(),
        },
        "-=0.35"
      );

      // ── 8. Image 6 — slide từ trái vào ──
      tl.fromTo(
        ".s3-img6",
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "+=0.1"
      );

      // ── 9. Content 1 — slide từ phải vào ──
      const content1Split = new SplitText(".s3-content1", { type: "words" });
      tl.fromTo(
        ".s3-content1-wrapper",
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
      tl.fromTo(
        content1Split.words,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => content1Split.revert(),
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] md:h-screen flex items-center justify-center text-black"
    >
      <div className="relative w-full h-[65vh] md:h-[70vh] lg:w-[70%] perspective-[1000px] flex flex-col gap-24 md:gap-5 lg:gap-5">

        {/* ── Heading ── */}
        <div className="md:left-10 uppercase">
          <p className="s3-heading invisible text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Quyết định táo bạo của công an Việt Nam
          </p>
        </div>

        {/* ── Phase 1 ── */}
        <div>
          {/* title phase 1 */}
          <div className="relative flex items-center gap-4 uppercase">
            <p className="s3-p1-title relative z-10 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-red-500 tracking-wide">
              Thâm nhập
            </p>
            <div className="s3-p1-arrow absolute -left-32 md:-left-40 top-[29%] -translate-y-1/2 w-32 md:w-40 aspect-[16/9]">
              <Image src="/images/mui-ten.png" alt="mui-ten" fill className="object-contain" />
            </div>
          </div>

          {/* body phase 1 */}
          <div className="s3-p1-body flex items-center justify-between">
            <div className="s3-img2 relative w-[500px] h-[500px]">
              <Image src="/images/linh-viet-nam.png" alt="linh-viet-nam" fill className="object-contain" />
            </div>
            <div className="s3-img3 relative w-[200px] h-[200px]">
              <Image src="/images/mui-ten-v2.png" alt="mui-ten-v2" fill className="object-contain" />
            </div>
            <div className="s3-img4 relative w-[500px] h-[500px]">
              <Image src="/images/linh-my.png" alt="linh-my" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* ── Phase 2 ── */}
        <div>
          {/* title phase 2 — ẩn mặc định */}
          <div className="s3-p2-title-wrapper hidden relative flex items-center gap-4 uppercase">
            <p className="s3-p2-title relative z-10 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-red-500 tracking-wide">
              Lấy địch đánh địch
            </p>
            <div className="s3-p2-arrow absolute -left-32 md:-left-40 top-[29%] -translate-y-1/2 w-32 md:w-40 aspect-[16/9]">
              <Image src="/images/mui-ten.png" alt="mui-ten" fill className="object-contain" />
            </div>
          </div>

          {/* body phase 2 — ẩn mặc định */}
          <div className="s3-p2-body hidden items-center justify-center gap-10">
            <div className="s3-img6 relative w-[500px] h-[500px]">
              <Image src="/images/dong-chi-tran-phuong-the.png" alt="dong-chi-tran-phuong-the" fill className="object-contain" />
            </div>
            <div className="s3-content1-wrapper w-[500px]">
              <p className="s3-content1 text-3xl">
                Đồng chí Trần Phương Thế (NK01)- được cho đã thâm nhập vào tổ chức tội
                phạm xuyên quốc gia, thu thập thông tin và hỗ trợ phá án thành công.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
// SlideFour.tsx
"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Image from "next/image";

gsap.registerPlugin(Flip);

type Props = {
  isActive: boolean;
};

export default function SlideFour({ isActive }: Props) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);

  // ✅ Chỉ render portal sau khi client mount xong — tránh hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mainRef.current || !isActive) return;

    let ctx: gsap.Context;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        const container = containerRef.current!;
        const ballEl = ballRef.current!;

        const BALL_W = 260;
        const BALL_H = 160;

        // ── 1. Block 1 ──
        tl.fromTo(
          ".sf-block1",
          { y: -120, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        );

        // ── 2. Block 2 ──
        tl.fromTo(
          ".sf-block2",
          { y: -120, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.35",
        );

        // ── 3. Block 3 ──
        tl.fromTo(
          ".sf-block3",
          { y: -120, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.35",
        );

        // ── 4. Ball sequence ──
        tl.add(() => {
          gsap.set(ballEl, {
            display: "block",
            opacity: 1,
            x: 0,
            y: -BALL_H - 20,
          });

          const getTextCenter = (selector: string) => {
            const el = container.querySelector(selector) as HTMLElement;
            const r = el.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - BALL_W / 2,
              textTop: r.top,
            };
          };

          const p1 = getTextCenter(".sf-text1");

          gsap.set(ballEl, {
            x: p1.x,
            y: -BALL_H - 20,
          });

          const ballTl = gsap.timeline();

          // ── Drop onto text1 ──
          ballTl.to(ballEl, {
            y: p1.textTop - BALL_H,
            duration: 0.55,
            ease: "bounce.out",
            onComplete: () => {
              const img1 = container.querySelector(".sf-img1") as HTMLElement;
              gsap.set(img1, { display: "block" });
              gsap.fromTo(
                img1,
                { clipPath: "inset(0% 0% 100% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.45,
                  ease: "power2.out",
                },
              );
            },
          });

          // ── Bounce to text2 ──
          ballTl.add(() => {
            const p2Live = getTextCenter(".sf-text2");
            const currentY = gsap.getProperty(ballEl, "y") as number;
            const arcY = Math.min(currentY, p2Live.textTop - BALL_H) - 100;

            gsap
              .timeline()
              .to(ballEl, {
                y: arcY,
                x: ((gsap.getProperty(ballEl, "x") as number) + p2Live.x) / 2,
                duration: 0.3,
                ease: "power2.out",
              })
              .to(ballEl, {
                y: p2Live.textTop - BALL_H,
                x: p2Live.x,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                  const img2 = container.querySelector(
                    ".sf-img2",
                  ) as HTMLElement;
                  gsap.set(img2, { display: "block" });
                  gsap.fromTo(
                    img2,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    {
                      clipPath: "inset(0% 0% 0% 0%)",
                      duration: 0.45,
                      ease: "power2.out",
                    },
                  );
                },
              });
          });

          ballTl.to({}, { duration: 0.65 });

          // ── Bounce to text3 ──
          ballTl.add(() => {
            const p3Live = getTextCenter(".sf-text3");
            const currentY = gsap.getProperty(ballEl, "y") as number;
            const arcY = Math.min(currentY, p3Live.textTop - BALL_H) - 100;

            gsap
              .timeline()
              .to(ballEl, {
                y: arcY,
                x: ((gsap.getProperty(ballEl, "x") as number) + p3Live.x) / 2,
                duration: 0.3,
                ease: "power2.out",
              })
              .to(ballEl, {
                y: p3Live.textTop - BALL_H,
                x: p3Live.x,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                  const img3 = container.querySelector(
                    ".sf-img3",
                  ) as HTMLElement;
                  gsap.set(img3, { display: "block" });
                  gsap.fromTo(
                    img3,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    {
                      clipPath: "inset(0% 0% 0% 0%)",
                      duration: 0.45,
                      ease: "power2.out",
                    },
                  );
                },
              });
          });

          ballTl.to({}, { duration: 0.65 });

          // ── Final — bounce up then fall below viewport ──
          ballTl.add(() => {
            const currentY = gsap.getProperty(ballEl, "y") as number;

            gsap
              .timeline()
              .to(ballEl, {
                y: currentY - 80,
                duration: 0.25,
                ease: "power2.out",
              })
              .to(ballEl, {
                y: window.innerHeight + BALL_H,
                duration: 0.45,
                ease: "power2.in",
                onComplete: () => {
                  gsap.set(ballEl, { display: "none" });
                },
              });
          });
        }, "+=0.2");
      }, mainRef);
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [isActive]);

  return (
    <>
      {/* ✅ Chỉ createPortal sau khi mounted — server và client render giống nhau */}
      {mounted &&
        createPortal(
          <div
            ref={ballRef}
            className="fixed top-0 left-0 hidden z-[9999] w-[260px] h-[160px] pointer-events-none"
          >
            <Image
              src="/images/qua-bong-da.png"
              alt="qua-bong-da"
              fill
              className="object-cover"
            />
          </div>,
          document.body,
        )}

      <div ref={mainRef}>
        <div
          ref={containerRef}
          className="relative h-[100svh] md:h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-[70vh] lg:w-[70%] overflow-visible">
            {/* ── Block 1 ── */}
            <div className="sf-block1 flex flex-col items-start">
              <div className="sf-text1 mb-2 text-lg md:text-2xl font-semibold text-[#8B4513] uppercase">
                Liên lạc giả qua điện đàm
              </div>
              <div className="sf-img1 relative w-[320px] h-[200px] ml-3 hidden border-4 border-white rounded-xl shadow-xl transition hover:scale-105">
                <Image
                  src="/images/cm-12-1.png"
                  alt="vinh-ha-long"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

            {/* ── Block 2 ── */}
            <div className="sf-block2 flex flex-col items-center">
              <div className="sf-text2 mb-2 text-lg md:text-2xl font-semibold text-[#8B4513] uppercase text-center">
                Gặp trực tiếp chỉ huy địch
              </div>
              <div className="sf-img2 relative w-[320px] h-[200px] ml-3 hidden border-4 border-white rounded-xl shadow-xl transition hover:scale-105">
                <Image
                  src="/images/cm-12-2.jpg"
                  alt="vinh-ha-long"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

            {/* ── Block 3 ── */}
            <div className="sf-block3 flex flex-col items-end">
              <div className="sf-text3 mb-2 text-lg md:text-2xl font-semibold text-[#8B4513] uppercase text-center">
                Lấy hoàn toàn lòng tin địch
              </div>
              <div className="sf-img3 relative w-[320px] h-[200px] mr-10 hidden border-4 border-white rounded-xl shadow-xl transition hover:scale-105">
                <Image
                  src="/images/cm-12-3.jpg"
                  alt="vinh-ha-long"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

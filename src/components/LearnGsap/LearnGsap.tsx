"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./styles.module.css";

export default function LearnLocomotiveGsap() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const textSlideIntroRef = useRef<HTMLDivElement>(null);
  const slideIntroRef = useRef<HTMLDivElement>(null);

  const slideContent1Ref = useRef<HTMLDivElement>(null);
  const textContent1Ref = useRef<HTMLDivElement>(null);
  const textContent2Ref = useRef<HTMLDivElement>(null);
  const textContent3Ref = useRef<HTMLDivElement>(null);
  const textContent4Ref = useRef<HTMLDivElement>(null);
  const textContent5Ref = useRef<HTMLDivElement>(null);
  const imageContent2Ref = useRef<HTMLDivElement>(null);
  const imageContent3Ref = useRef<HTMLDivElement>(null);
  const imageContent4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Context 1: Slide Intro ---
    const ctxIntro = gsap.context(() => {
    gsap.fromTo(
      textSlideIntroRef.current,
      { x: -150, y: 50, scale: 0.5, rotation: -10, opacity: 0 },
      {
        x: 0, y: 0, scale: 1, rotation: 0, opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(textSlideIntroRef.current, {
            x: 150, y: -50, scale: 0.8, rotation: 10, opacity: 0,
            ease: "power2.in",
            scrollTrigger: {
              trigger: slideIntroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      }
    );
  });

    // --- Context 2: Slide Content 1 ---
    const ctxContent1 = gsap.context(() => {
      gsap.set(
        [
          imageContent2Ref.current,
          imageContent3Ref.current,
          imageContent4Ref.current,
        ],
        { scale: 0, rotation: 0, opacity: 0 },
      );
      gsap.set(
        [
          textContent1Ref.current,
          textContent2Ref.current,
          textContent3Ref.current,
          textContent4Ref.current,
          textContent5Ref.current,
        ],
        { x: -200, opacity: 0 },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideContent1Ref.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(textContent1Ref.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      tl.to(
        textContent2Ref.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.1",
      );
      tl.to(
        imageContent2Ref.current,
        {
          scale: 1,
          rotation: 60,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        },
        "<",
      );

      tl.to(
        textContent3Ref.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.1",
      );
      tl.to(
        imageContent3Ref.current,
        {
          scale: 1,
          rotation: 60,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        },
        "<",
      );

      tl.to(
        textContent4Ref.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.1",
      );
      tl.to(
        imageContent4Ref.current,
        {
          scale: 1,
          rotation: 60,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        },
        "<",
      );

      tl.to(
        textContent5Ref.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.1",
      );
    });

    return () => {
      ctxIntro.revert();
      ctxContent1.revert();
    };
  }, []);

  return (
    // data-scroll-container là bắt buộc cho LocomotiveScroll
    <div ref={wrapperRef} data-scroll-container>
      {/* Slide Intro */}
      <div
        data-scroll-section
        className="h-screen w-full bg-blue-500 flex items-center justify-center"
      >
        <div
          ref={slideIntroRef}
          className="w-[70vw] h-[40vw] bg-amber-500 relative"
        >
          <Image
            src="/images/cat-ba.jpg"
            alt="Cát Bà"
            fill
            className="object-cover"
            loading="eager"
          />
          <div
            ref={textSlideIntroRef}
            className="absolute bottom-0 text-white p-4"
          >
            <div className="bg-amber-500 w-fit mb-10">
              <p
                className={`text-6xl font-bold ${styles.textSlideIntroRefShadow}`}
              >
                Dùng địch đánh địch
              </p>
            </div>
            <div className="bg-amber-500 w-fit mb-10">
              <p
                className={`text-6xl font-bold ${styles.textSlideIntroRefShadow}`}
              >
                Đỉnh cao của chiến lược thâm nhập
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide content 1 */}
      <div
        data-scroll-section
        ref={slideContent1Ref}
        className="h-screen w-full bg-green-500 flex items-center justify-center"
      >
        <div className="w-[70vw] h-[40vw] bg-amber-500 relative">
          <Image
            src="/images/thanh-pho-ho-chi-minh.jpg"
            alt="TP HCM"
            fill
            className="object-cover"
            loading="eager"
          />
          <div className="absolute flex flex-col gap-10 left-10 top-30 text-white">
            <div
              ref={textContent1Ref}
              className="text-6xl font-bold [-webkit-text-stroke:1px_black]"
            >
              Thế lực thù địch đã dùng
            </div>
            <div className="space-y-4 text-5xl md:text-6xl font-bold">
              <div
                ref={textContent2Ref}
                className="relative w-fit [-webkit-text-stroke:1px_black]"
              >
                <span className="relative z-10">14 Tấn tiền giả</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-red-400/60 -z-0"></span>
              </div>
              <div
                ref={textContent3Ref}
                className="relative w-fit [-webkit-text-stroke:1px_black]"
              >
                <span className="relative z-10">Mật mã điện đài</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-yellow-400/60 -z-0"></span>
              </div>
              <div
                ref={textContent4Ref}
                className="relative w-fit [-webkit-text-stroke:1px_black]"
              >
                <span className="relative z-10">Hệ thống con dấu</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-blue-400/60 -z-0"></span>
              </div>
              <div
                ref={textContent5Ref}
                className="relative w-fit [-webkit-text-stroke:1px_black]"
              >
                <span className="relative z-10">Một kế hoạch tinh vi</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-black/30 -z-0"></span>
              </div>
            </div>
          </div>
          <div>
            <div
              ref={imageContent2Ref}
              className="absolute w-[300px] h-[300px] right-[100px] top-[10px] border-4 border-white shadow-xl"
            >
              <Image
                src="/images/nhat-ban.jpg"
                alt="Nhật Bản"
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
            <div
              ref={imageContent3Ref}
              className="absolute w-[300px] h-[300px] right-[250px] top-[200px] border-4 border-white shadow-xl"
            >
              <Image
                src="/images/nui-tuyet.jpg"
                alt="Núi Tuyết"
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
            <div
              ref={imageContent4Ref}
              className="absolute w-[300px] h-[300px] right-[80px] top-[400px] border-4 border-white shadow-xl"
            >
              <Image
                src="/images/cau-vang.jpg"
                alt="Cầu Vàng"
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div
        data-scroll-section
        className="h-screen w-full bg-red-500 flex items-center justify-center"
      >
        <div className="w-[70vw] h-[40vw] bg-amber-500 relative">
          <Image
            src="/images/vinh-ha-long.jpg"
            alt="Vinh Hạ Long"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

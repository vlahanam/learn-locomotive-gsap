"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function ADemoSwiper() {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctxRefs = useRef<gsap.Context[]>([]);

  // 🎯 Tạo animation cho từng slide
  const createAnimation = (index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;

    // 🔥 tạo context riêng cho từng slide
    const ctx = gsap.context(() => {
      const text = el.querySelector(".text");

      switch (index) {
        case 0:
          gsap.fromTo(
            text,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          );
          break;

        case 1:
          gsap.fromTo(
            text,
            { x: -200, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          );
          break;

        case 2:
          gsap.fromTo(
            text,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
          );
          break;
      }
    }, el);

    ctxRefs.current[index] = ctx;
  };

  // 🎯 Khi slide change
  const handleSlideChange = (swiper: SwiperType) => {
    const current = swiper.activeIndex;
    const prev = swiper.previousIndex;

    // ❌ kill animation slide cũ
    if (ctxRefs.current[prev]) {
      ctxRefs.current[prev].revert();
    }

    // ✅ tạo lại animation slide mới
    createAnimation(current);
  };

  // 🎯 init slide đầu tiên
  useLayoutEffect(() => {
    createAnimation(0);

    return () => {
      // cleanup toàn bộ khi unmount
      ctxRefs.current.forEach((ctx) => ctx?.revert());
    };
  }, []);

  return (
    <Swiper
      modules={[Keyboard]}
      keyboard={{ enabled: true }}
      onSlideChange={handleSlideChange}
      slidesPerView={1}
      className="w-full h-screen"
    >
      {[1, 2, 3].map((item, index) => (
        <SwiperSlide key={index}>
          <div
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative h-screen flex items-center justify-center"
          >
            {/* IMAGE */}
            <div className="relative w-[70%] h-[70vh]">
              <Image
                src="/images/ha-noi.jpg"
                alt={`slide-${item}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* TEXT */}
            <div className="text absolute text-white text-5xl font-bold">
              Slide {item}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
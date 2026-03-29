// ADemoSwiper.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import SlideOne from "./slides/Slide1";
import SlideTwo from "./slides/Slide2";
import SlideThree from "./slides/Slide3";
import SlideFour from "./slides/Silde4";

export default function ADemoSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Swiper
      modules={[Keyboard]}
      keyboard={{
        enabled: typeof window !== "undefined" && window.innerWidth >= 1024,
      }}
      onSlideChange={handleSlideChange}
      slidesPerView={1}
      simulateTouch={true}
      grabCursor={true}
      className="
    w-full 
    h-[100svh] 
    md:h-screen
  "
    >
      <SwiperSlide>
        <SlideOne isActive={activeIndex === 0} />
      </SwiperSlide>

      <SwiperSlide>
        <SlideTwo isActive={activeIndex === 1} />
      </SwiperSlide>

      <SwiperSlide>
        <SlideThree isActive={activeIndex === 2} />
      </SwiperSlide>

      <SwiperSlide>
        <SlideFour isActive={activeIndex === 3} />
      </SwiperSlide>
    </Swiper>
  );
}

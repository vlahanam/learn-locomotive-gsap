"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type Props = {
  isActive: boolean;
};

// ================= PIN IMAGE =================
function PinImage({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  // 🎯 Mouse move (Tilt + Magnetic + Depth)
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -20;
    const rotateY = (x / rect.width - 0.5) * 20;

    // magnetic nhẹ
    const moveX = (x / rect.width - 0.5) * 20;
    const moveY = (y / rect.height - 0.5) * 20;

    gsap.to(el, {
      rotateX,
      rotateY,
      x: moveX,
      y: moveY,
      z: 80, // 🎯 depth
      transformPerspective: 800,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(ref.current, {
      scale: 1.05,
      z: 120,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative w-full h-full 
        border-4 border-white 
        shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        will-change-transform
      "
    >
      {/* pin */}
      <div className="absolute -top-4 left-4 w-8 h-12 z-10">
        <Image
          src="/images/ghim.png"
          alt="pin"
          fill
          className="object-contain"
        />
      </div>

      {/* image */}
      <Image src={src} alt="img" fill className="object-cover" />
    </div>
  );
}

// ================= SLIDE =================
export default function SlideOne({ isActive }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const textTitleOne = ["Dùng", "Địch", "Đánh", "Địch"];
  const textTitleTwo = ["Đỉnh Cao Của", "Chiến Lược Thâm Nhập"];

  useLayoutEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const titleOne = gsap.utils.toArray(".title-item-one");
      const titleTwo = gsap.utils.toArray(".title-item-two");
      const images = gsap.utils.toArray(".pin-image");

      // text anim
      gsap.fromTo(
        titleOne,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
      );

      gsap.fromTo(
        titleTwo,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
      );

      // image anim
      gsap.fromTo(
        images,
        { scale: 0.5, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] md:h-screen flex items-center justify-center px-4 text-black"
    >
      <div className="relative w-full h-[65vh] md:h-[70vh] lg:w-[70%] perspective-[1000px]">
        {/* TEXT 1 */}
        <div className="absolute left-4 md:left-10 top-10 z-10 uppercase flex flex-col gap-2">
          {textTitleOne.map((t, i) => (
            <p
              key={i}
              className="title-item-one text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold"
            >
              {t}
            </p>
          ))}
        </div>

        {/* TEXT 2 */}
        <div className="absolute bottom-10 left-4 md:left-10 z-10 uppercase">
          {textTitleTwo.map((t, i) => (
            <p
              key={i}
              className="title-item-two text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold"
            >
              {t}
            </p>
          ))}
        </div>

        {/* IMAGES */}
        <div className="relative w-full h-full">
          <div className="pin-image absolute top-[5%] right-[1%] w-[70%] md:w-[40%] h-[180px] md:h-[240px]">
            <PinImage src="/images/cm-12-2.jpg" />
          </div>

          <div className="pin-image absolute top-[25%] right-[25%] w-[70%] md:w-[40%] h-[180px] md:h-[240px]">
            <PinImage src="/images/cm-12-1.png" />
          </div>

          <div className="pin-image absolute bottom-[10%] right-[8%] w-[70%] md:w-[40%] h-[180px] md:h-[240px]">
            <PinImage src="/images/cm-12-3.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

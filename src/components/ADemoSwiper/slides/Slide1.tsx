"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type Props = {
  isActive: boolean;
};

export default function SlideOne({ isActive }: Props) {
  const textTitleOne = ["Dùng", "Địch", "Đánh", "Địch"];
  const textTitleTwo = ["Đỉnh Cao Của", "Chiến Lược Thâm Nhập"];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const titleOneItems = containerRef.current?.querySelectorAll(".title-item-one");
      if (titleOneItems?.length) {
        gsap.fromTo(
          titleOneItems,
          { x: (i) => (i % 2 !== 0 ? -100 : 100), opacity: 0 },
          {
            x: (i) => (i % 2 !== 0 ? 100 : -100),
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
          },
        );
      }

      const titleTwoItems = containerRef.current?.querySelectorAll(".title-item-two");
      if (titleTwoItems?.length) {
        gsap.fromTo(
          titleTwoItems,
          { x: -150, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
        );
      }

      const images = [img1Ref.current, img2Ref.current, img3Ref.current].filter(
        Boolean,
      ) as HTMLDivElement[];

      gsap.set(images, { scale: 0, opacity: 0 });

      const pinBounce = (target: HTMLDivElement, finalRotation: number) => {
        gsap.to(target, {
          rotation: finalRotation + 8,
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(target, {
              rotation: finalRotation,
              duration: 0.4,
              ease: "elastic.out(1, 0.4)",
            });
          },
        });
      };

      images.forEach((el, i) => {
        const configs = [
          { rotation: -2, delay: 0 },
          { rotation: 1.5, delay: 0.15 },
          { rotation: -1, delay: 0.3 },
        ];

        const { rotation, delay } = configs[i];

        gsap.to(el, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay,
          onComplete: () => pinBounce(el, rotation),
        });

        const enter = () =>
          gsap.to(el, {
            scale: 1.08,
            rotation: 0,
            zIndex: 50,
            duration: 0.3,
            ease: "power2.out",
          });

        const leave = () =>
          gsap.to(el, {
            scale: 1,
            rotation,
            zIndex: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);

        return () => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex items-center justify-center text-black"
    >
      {/* <div
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
        Slide 1
      </div> */}
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
        <div className="absolute z-1 left-24 flex flex-col gap-3.5">
          {textTitleOne.map((text, i) => (
            <p key={i} className="title-item-one uppercase text-7xl font-bold">
              {text}
            </p>
          ))}
        </div>
        <div className="absolute z-2 bottom-40 flex flex-col gap-3.5">
          {textTitleTwo.map((text, i) => (
            <p key={i} className="title-item-two uppercase text-5xl font-bold">
              {text}
            </p>
          ))}
        </div>
        <div className="absolute w-full h-full bg-amber-400">
          <div
            ref={img1Ref}
            className="absolute top-[50px] left-[35%] w-full max-w-[380px] h-[240px] cursor-pointer overflow-visible"
          >
            <div className="absolute -top-[18px] left-[20px] w-[40px] h-[60px] z-10">
              <Image
                src="/images/ghim.png"
                alt="ghim"
                fill
                sizes="40px"
                className="object-contain"
                loading="eager"
              />
            </div>
            <div className="w-full h-full border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/cm-12-1.png"
                alt="cm-12-1"
                fill
                sizes="380px"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
          <div
            ref={img2Ref}
            className="absolute top-[10%] left-[70%] w-full max-w-[380px] h-[240px] cursor-pointer overflow-visible"
          >
            <div className="absolute -top-[18px] left-[20px] w-[40px] h-[60px] z-10">
              <Image
                src="/images/ghim.png"
                alt="ghim"
                fill
                sizes="40px"
                className="object-contain"
                loading="eager"
              />
            </div>
            <div className="w-full h-full border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/cm-12-2.jpg"
                alt="cm-12-1"
                fill
                sizes="380px"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
          <div
            ref={img3Ref}
            className="absolute top-[35%] left-[55%] w-full max-w-[380px] h-[240px] cursor-pointer overflow-visible"
          >
            <div className="absolute -top-[18px] left-[20px] w-[40px] h-[60px] z-10">
              <Image
                src="/images/ghim.png"
                alt="ghim"
                fill
                sizes="40px"
                className="object-contain"
                loading="eager"
              />
            </div>
            <div className="w-full h-full border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/cm-12-3.jpg"
                alt="cm-12-1"
                fill
                sizes="380px"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

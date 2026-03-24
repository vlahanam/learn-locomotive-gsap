import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./styles.module.css";

export default function LearnLocomotiveGsap() {
  const textSectionOne = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textSectionOne.current,
        {
          x: -150,
          y: 50,
          scale: 0.5,
          rotation: -10,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.3,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section>
      <div
        className="h-screen w-full bg-blue-500 flex items-center justify-center"
        data-scroll
        data-scroll-offset="10%,10%"
        data-scroll-position="end,start"
        data-scroll-call="scrollEvent"
      >
        <div className="w-[70vw] h-[40vw] bg-amber-500 relative">
          <Image
            src="/images/cat-ba.jpg"
            alt="Cát Bà"
            fill
            className="object-cover"
            loading="eager"
          />
          <div
            ref={textSectionOne}
            className="absolute bottom-0 text-white p-4"
          >
            <div className="bg-amber-500 w-fit mb-10">
              <p
                className={`text-5xl font-bold ${styles.textSectionOneShadow}`}
              >
                Dùng địch đánh địch
              </p>
            </div>
            <div className="bg-amber-500 w-fit mb-10">
              <p
                className={`text-5xl font-bold ${styles.textSectionOneShadow}`}
              >
                Đỉnh cao của chiến lược thâm nhập
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-green-500 flex items-center justify-center">
        <div className="w-[70vw] h-[40vw] bg-amber-500 relative">
          <Image
            src="/images/cau-vang.jpg"
            alt="Cầu Vàng"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
      </div>
      <div className="h-screen w-full bg-red-500 flex items-center justify-center">
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
    </section>
  );
}

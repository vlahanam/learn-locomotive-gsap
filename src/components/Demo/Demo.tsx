"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

export default function Demo() {
  const textTitle = ["Dùng", "Địch", "Đánh", "Địch"];
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".title-item");
      if (!items?.length) return;

      gsap.from(items, {
        x: (i) => (i % 2 === 0 ? 200 : -200),
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="bg-[#EFE9E7] min-h-screen text-black overflow-x-hidden">
      <section className="mx-auto w-full px-4 sm:px-6 sm:max-w-150 md:px-8 md:max-w-180 lg:max-w-240 xl:max-w-310 min-h-screen flex flex-col">
        <div className="min-h-[200px]"></div>
        <div className="flex flex-col md:flex-row">
          <div ref={containerRef} className="flex flex-col gap-3.5">
            {textTitle.map((text, i) => (
              <p
                key={i}
                className="title-item uppercase text-7xl font-bold block"
              >
                {text}
              </p>
            ))}
          </div>
          <div className="relative">
            <Image
              src="/images/nui-tuyet.jpg"
              alt="Núi Tuyết"
              fill
              sizes="300px"
              className="object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

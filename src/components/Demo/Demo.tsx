"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

export default function Demo() {
  const textTitleOne = ["Dùng", "Địch", "Đánh", "Địch"];
  const textTitleTwo = ["Đỉnh Cao Của", "Chiến Lược Thâm Nhập"];

  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Text animation ---
      const titleOneItems =
        containerRef.current?.querySelectorAll(".title-item-one");
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

      const titleTwoItems =
        containerRef.current?.querySelectorAll(".title-item-two");
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

      // --- Trạng thái ban đầu: ẩn tất cả ảnh ---
      gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], {
        scale: 0,
        opacity: 0,
      });

      // --- Ghim: bounce nhỏ sau khi ảnh vào ---
      const pinBounce = (
        target: HTMLDivElement | null,
        finalRotation: number,
      ) => {
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

      gsap.to(img1Ref.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0,
        onComplete: () => pinBounce(img1Ref.current, -2),
      });

      gsap.to(img2Ref.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.15,
        onComplete: () => pinBounce(img2Ref.current, 1.5),
      });

      gsap.to(img3Ref.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.3,
        onComplete: () => pinBounce(img3Ref.current, -1),
      });

      // --- Hover animation ---
      const setupHover = (
        ref: React.RefObject<HTMLDivElement | null>,
        baseRotation: number,
      ) => {
        const el = ref.current;
        if (!el) return;

        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            scale: 1.08,
            rotation: 0,
            zIndex: 50,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            scale: 1,
            rotation: baseRotation,
            zIndex: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
        });
      };

      setupHover(img1Ref, -2);
      setupHover(img2Ref, 1.5);
      setupHover(img3Ref, -1);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Section 1 */}
      <div className="bg-[#EFE9E7] min-h-screen text-black overflow-x-hidden">
        <section className="mx-auto w-full px-4 sm:px-6 sm:max-w-150 md:px-8 md:max-w-180 lg:max-w-240 xl:max-w-310 min-h-screen flex flex-col">
          <div className="min-h-[200px]"></div>

          {/* ── MOBILE: text rồi ảnh xếp dọc ── */}
          <div className="flex flex-col gap-12 md:hidden">
            {/* Text block */}
            <div ref={containerRef} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {textTitleOne.map((text, i) => (
                  <p
                    key={i}
                    className="title-item-one uppercase text-6xl font-bold leading-tight"
                  >
                    {text}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {textTitleTwo.map((text, i) => (
                  <p
                    key={i}
                    className="title-item-two uppercase text-3xl font-bold"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Ảnh xếp dọc */}
            <div className="flex flex-col gap-16 items-center pb-12">
              {/* Ảnh 1 */}
              <div
                ref={img1Ref}
                className="relative w-full max-w-[380px] h-[240px] cursor-pointer"
                style={{ transformOrigin: "top center" }}
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

              {/* Ảnh 2 */}
              <div
                ref={img2Ref}
                className="relative w-full max-w-[380px] h-[240px] cursor-pointer"
                style={{ transformOrigin: "top center" }}
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
                    alt="cm-12-2"
                    fill
                    sizes="380px"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Ảnh 3 */}
              <div
                ref={img3Ref}
                className="relative w-full max-w-[380px] h-[240px] cursor-pointer"
                style={{ transformOrigin: "top center" }}
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
                    alt="cm-12-3"
                    fill
                    sizes="380px"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── DESKTOP: layout chồng lấp như cũ ── */}
          <div className="relative hidden md:flex flex-row h-[500px]">
            {/* Text */}
            <div ref={containerRef}>
              <div className="absolute z-1 left-[100px] flex flex-col gap-3.5">
                {textTitleOne.map((text, i) => (
                  <p
                    key={i}
                    className="title-item-one uppercase text-7xl font-bold"
                  >
                    {text}
                  </p>
                ))}
              </div>
              <div className="absolute z-2 bottom-0 flex flex-col gap-3.5">
                {textTitleTwo.map((text, i) => (
                  <p
                    key={i}
                    className="title-item-two uppercase text-5xl font-bold"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Ảnh chồng lấp */}
            <div className="relative w-full h-full">
              {/* Ảnh 1 */}
              <div className="absolute top-[-50px] left-[35%] overflow-visible">
                <div
                  ref={img1Ref}
                  className="relative w-[450px] h-[300px] cursor-pointer overflow-visible"
                  style={{ transformOrigin: "top center" }}
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
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Ảnh 2 */}
              <div className="absolute top-[-20px] left-[70%] overflow-visible">
                <div
                  ref={img2Ref}
                  className="relative w-[450px] h-[300px] cursor-pointer overflow-visible"
                  style={{ transformOrigin: "top center" }}
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
                      alt="cm-12-2"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Ảnh 3 */}
              <div className="absolute top-[200px] left-[55%] overflow-visible">
                <div
                  ref={img3Ref}
                  className="relative w-[450px] h-[300px] cursor-pointer overflow-visible"
                  style={{ transformOrigin: "top center" }}
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
                      alt="cm-12-3"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section 2 */}
      <div className="bg-[#EFE9E7] min-h-screen text-black overflow-x-hidden">
        <section className="mx-auto w-full px-4 sm:px-6 sm:max-w-150 md:px-8 md:max-w-180 lg:max-w-240 xl:max-w-310 min-h-screen flex flex-col">
          <div className="mt-20"></div>
          <div className="relative w-full mx-auto">
            <div className="absolute top-0 left-10 w-[50%] h-[1px] bg-black">
              <div className="absolute -top-[20px] left-[455px] -translate-x-1/2 z-10">
                <img
                  src="/svg/ngoi-sao.svg"
                  alt="ngoi-sao"
                  className="w-10 h-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-5">
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight">
                    Darrell <br /> Steward
                  </h3>
                  <p className="text-gray-700 text-sm">Chief Architect</p>
                </div>
              </div>

              <div className="relative flex flex-col items-center mx-10">
                {/* Đường kẻ dọc */}
                <div className="w-[1px] h-[120px] bg-black"></div>
              </div>

              {/* RIGHT */}
              <div className="max-w-md text-gray-800 leading-relaxed">
                Spaces Institute for Architecture and Design was founded in
                2009...
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

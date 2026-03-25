"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionContentReveal() {
  const textTitleOne = ["Dùng", "Địch", "Đánh", "Địch"];
  const textTitleTwo = ["Đỉnh Cao Của", "Chiến Lược Thâm Nhập"];

  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  // Section 2 refs
  const lineRef2 = useRef<HTMLDivElement>(null);
  const starRef2 = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const leftImagesWrapRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Section 5 refs
  const lineRef5 = useRef<HTMLDivElement>(null);
  const starRef5 = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const bgContentSection5Ref = useRef<HTMLDivElement>(null);
  
  // Section 1: text entrance
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Section 1: image bounce + hover
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([img1Ref.current, img2Ref.current, img3Ref.current], {
        scale: 0,
        opacity: 0,
      });

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

      [
        { ref: img1Ref, rotation: -2, delay: 0 },
        { ref: img2Ref, rotation: 1.5, delay: 0.15 },
        { ref: img3Ref, rotation: -1, delay: 0.3 },
      ].forEach(({ ref, rotation, delay }) => {
        gsap.to(ref.current, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay,
          onComplete: () => pinBounce(ref.current, rotation),
        });

        const el = ref.current;
        if (!el) return;
        el.addEventListener("mouseenter", () =>
          gsap.to(el, {
            scale: 1.08,
            rotation: 0,
            zIndex: 50,
            duration: 0.3,
            ease: "power2.out",
          }),
        );
        el.addEventListener("mouseleave", () =>
          gsap.to(el, {
            scale: 1,
            rotation,
            zIndex: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          }),
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Section 2: line + star ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef2.current, { left: 40, width: "50%" });
      gsap.set(starRef2.current, { opacity: 0, scale: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
            end: "top 30%",
            scrub: false,
          },
        })
        .to(lineRef2.current, {
          left: 0,
          width: "100%",
          duration: 0.8,
          ease: "power3.inOut",
        })
        .to(
          starRef2.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            onComplete: () => {
              gsap.to(starRef2.current, {
                x: () => -(lineRef2.current?.offsetWidth ?? 0),
                duration: 2.5,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
              });
            },
          },
          "-=0.1",
        );
    }, section2Ref);

    return () => ctx.revert();
  }, []);

  // Section 5: line + star ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef5.current, { right: 40, width: "50%" });
      gsap.set(starRef5.current, { opacity: 0, scale: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section5Ref.current,
            start: "top 70%",
            end: "top 30%",
            scrub: false,
          },
        })
        .to(lineRef5.current, {
          right: 0,
          width: "100%",
          duration: 0.8,
          ease: "power3.inOut",
        })
        .to(
          starRef5.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            onComplete: () => {
              gsap.to(starRef5.current, {
                x: () => lineRef5.current?.offsetWidth ?? 0,
                duration: 2.5,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
              });
            },
          },
          "-=0.1",
        );
    }, section5Ref);

    return () => ctx.revert();
  }, []);

  // Section 2: left + right col entrance
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([leftColRef.current, rightColRef.current], {
        y: 80,
        opacity: 0,
      });

      gsap
        .timeline({
          scrollTrigger: { trigger: section2Ref.current, start: "top 60%" },
        })
        .to(leftColRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          rightColRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        );
    }, section2Ref);

    return () => ctx.revert();
  }, []);

  // Section 2: pin + scroll images in left col
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(leftImagesWrapRef.current, {
        y: "-160vh",
        ease: "none",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top top",
          end: "+=280vh",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, section2Ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Section 1 */}
      <div className="bg-[#EFE9E7] min-h-screen text-black overflow-x-hidden">
        <section className="mx-auto w-full px-4 sm:px-6 sm:max-w-150 md:px-8 md:max-w-180 lg:max-w-240 xl:max-w-310 min-h-screen flex flex-col justify-center">
          {/* ── MOBILE ── */}
          <div className="flex flex-col gap-12 md:hidden">
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

            <div className="flex flex-col gap-16 items-center pb-12">
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

          {/* ── DESKTOP ── */}
          <div className="relative hidden md:flex flex-row h-[500px]">
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

            <div className="relative w-full h-full">
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
      <div
        ref={section2Ref}
        className="bg-[#EFE9E7] min-h-screen text-black overflow-x-hidden"
      >
        <section className="mx-auto w-full px-4 sm:px-6 sm:max-w-150 md:px-8 md:max-w-180 lg:max-w-240 xl:max-w-310 min-h-screen flex flex-col justify-center">
          <div className="relative w-full mx-auto">
            {/* LINE NGANG + NGÔI SAO — dùng ref để GSAP điều khiển */}
            <div
              ref={lineRef2}
              className="absolute top-0 h-[1px] bg-black left-[40px] w-1/2"
            >
              <div
                ref={starRef2}
                className="absolute -top-[20px] right-0 translate-x-1/2 z-10 opacity-0 scale-0"
              >
                <img
                  src="/svg/ngoi-sao.svg"
                  alt="ngoi-sao"
                  className="w-10 h-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 gap-5">
              {/* LEFT */}
              <div ref={leftColRef} className="w-1/2 h-[80vh] overflow-hidden">
                <div ref={leftImagesWrapRef} className="flex flex-col">
                  <div className="relative h-[80vh] shrink-0">
                    <Image
                      src={"/images/deer-team-vietminh.png"}
                      alt="intro image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="relative h-[80vh] shrink-0">
                    <Image
                      src={"/images/viet-minh-poster.jpg"}
                      alt="intro image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="relative h-[80vh] shrink-0">
                    <Image
                      src={"/images/view-war-other-side.jpg"}
                      alt="intro image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div
                ref={rightColRef}
                className="leading-relaxed w-1/2 h-[80vh] text-xl"
              >
                Để nhập vai diễn một cách tốt nhất, đồng chí Trần Phương Thế trở
                thành một con người hoàn toàn khác với trước đây. Ông để râu,
                tóc dài, mặc quần ống loe, áo vạt bầu, cách nói chuyện cũng có
                phần ngông nghênh và bất cần đời. Một thời gian dài ông sống
                thoát ly gia đình, hầu như không trở về nhà để tránh bị lộ mặt.
                Lúc này, theo yêu cầu của phía Túy và Hạnh, ông cùng K64, K61,
                K59, K27 (bí danh của những biệt kích đã được ta cảm hóa) phải
                đi nhiều nơi để khảo sát chọn địa điểm vận chuyển, cất giấu hàng
                hóa, vũ khí, tiền giả. Sau đó, vẽ sơ đồ chi tiết và báo cáo về
                “Tổng hành dinh” để bọn Túy, Hạnh yên tâm tin tưởng. Do thời
                gian di chuyển dài, phải qua nhiều nơi nên người ông gầy xọp,
                đen đúa và bộ râu dài trông không giống ai. Đồng chí Trần Phương
                Thế nhớ lại: “Lúc đó có mấy lần về nhà, những người thân quen
                thấy dáng vẻ của tôi họ phản ứng dữ dội lắm. Thậm chí bạn bè
                cũng đòi cạch mặt. Anh em trong dòng họ cũng nghi ngờ tôi làm
                chuyện không tốt. Nhưng tôi cũng không dám hé răng nửa lời. Tôi
                chỉ nói bản thân mình trước sau như một, đã xác định đi theo
                cách mạng thì không bao giờ thay đổi”.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

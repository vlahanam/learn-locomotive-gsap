"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ImageLightbox from "./image-lightbox";

gsap.registerPlugin(ScrollTrigger);

const STORY_CHAPTERS = [
  {
    title: "Dùng Địch Đánh Địch",
    text: 'Công an Việt Nam đã đưa ra quyết định táo bạo: thâm nhập sâu vào hàng ngũ địch, dùng chính kẻ thù để đánh lại kẻ thù. Chiến lược "lấy địch đánh địch" trở thành đỉnh cao của nghệ thuật tình báo. Đây không chỉ là một chiến thuật quân sự, mà còn là minh chứng cho trí tuệ và lòng dũng cảm phi thường của những người chiến sĩ công an nhân dân.',
    image: "/images/vietnam-independence.png",
    imageAlt: "Đoàn quân Việt Nam độc lập",
    accent: "#8B4513",
    date: "",
  },
  {
    title: "Đồng Chí Trần Phương Thế",
    text: "Đồng chí Trần Phương Thế (NK01) được chọn thực hiện nhiệm vụ đặc biệt. Sau thời gian huấn luyện nghiêm ngặt, đồng chí sẵn sàng xâm nhập vào căn cứ địch. Mỗi ngày trôi qua là một thử thách mới, đòi hỏi sự tỉnh táo và bản lĩnh vượt trội.",
    image: "/images/deer-team-vietminh.png",
    imageAlt: "Huấn luyện Việt Minh",
    accent: "#6B3410",
    date: "",
  },
  {
    title: "Cải Trang & Xâm Nhập",
    text: "Đã thay đổi bản thân mình để xâm nhập căn cứ địch. Từ ngoại hình đến tính cách, mọi thứ đều được thay đổi hoàn toàn để không ai nhận ra đây là chiến sĩ công an. Một cuộc sống mới bắt đầu, nơi ranh giới giữa bạn và thù mỏng như sợi tóc.",
    image: "/images/ho-chi-minh-giap.png",
    imageAlt: "Hồ Chí Minh và Võ Nguyên Giáp",
    accent: "#4A2808",
    date: "",
  },
  {
    title: "Chiến Công Thầm Lặng",
    text: "Bằng sự dũng cảm và mưu trí, đồng chí đã thu thập hàng loạt thông tin tình báo quan trọng, góp phần đánh bại nhiều âm mưu của kẻ thù từ bên trong. Những chiến công không được ghi danh, những hy sinh không ai biết đến — nhưng Tổ quốc sẽ mãi ghi nhớ.",
    image: "/images/guerrilla-patrol.jpg",
    imageAlt: "Du kích tuần tra",
    accent: "#8B4513",
    date: "",
  },
  {
    title: "Liên Lạc Giả Qua Điện Đàm",
    text: "Để truyền tin tình báo về cơ sở, đồng chí phải sử dụng hệ thống điện đàm của chính kẻ thù. Mỗi lần nhấn nút phát sóng là một lần đánh cược tính mạng. Tín hiệu được mã hóa bằng những quy ước chỉ hai người hiểu, lẫn trong hàng trăm cuộc liên lạc quân sự mỗi ngày.",
    image: "/images/radio-operator.jpg",
    imageAlt: "Chiến sĩ sử dụng điện đàm",
    accent: "#2C5F2D",
    date: "",
  },
  {
    title: "Gặp Gỡ Trực Tiếp Chỉ Huy Địch",
    text: "Sau nhiều tháng xây dựng vỏ bọc, đồng chí được mời tham dự cuộc họp cấp cao của địch. Ngồi giữa những kẻ thù nguy hiểm nhất, lòng vẫn bình tĩnh như mặt nước hồ thu. Mỗi câu nói, mỗi cử chỉ đều phải tính toán kỹ lưỡng — một sai sót nhỏ cũng có thể trả giá bằng mạng sống.",
    image: "/images/field-radio-test.jpg",
    imageAlt: "Gặp gỡ chỉ huy tại căn cứ",
    accent: "#4A3728",
    date: "",
  },
  {
    title: "Lấy Hoàn Toàn Lòng Tin Địch",
    text: "Những tài liệu mật, những bản đồ quân sự, những kế hoạch tác chiến — tất cả nằm trong tầm tay. Địch tin tưởng đồng chí đến mức giao cho quản lý kho tài liệu quan trọng nhất. Từ đây, mọi bí mật của kẻ thù đều được chuyển về an toàn cho cách mạng.",
    image: "/images/nva-document.jpg",
    imageAlt: "Tài liệu mật quân đội",
    accent: "#6B3410",
    date: "",
  },
  {
    title: "Kiểm Soát Đường Dây Vận Tải",
    text: "Nhờ thông tin tình báo chính xác, quân ta đã kiểm soát hoàn toàn tuyến đường vận tải của địch. Tàu chở người, vũ khí, lương thực — tất cả đều nằm trong tầm ngắm. Mỗi chuyến hàng bị chặn đứng là một đòn giáng mạnh vào tinh thần và sức chiến đấu của kẻ thù.",
    image: "/images/military-transport.jpg",
    imageAlt: "Tàu vận tải quân sự",
    accent: "#1B4332",
    date: "",
  },
  {
    title: "Chiến Dịch CM12 Thành Công Rực Rỡ",
    text: "Như một ván cờ được tính toán hoàn hảo từ nước đi đầu tiên, chiến dịch CM12 đã kết thúc với chiến thắng vang dội. Mỗi quân cờ đều đặt đúng vị trí, mỗi nước đi đều chính xác tuyệt đối. Đây là lời khẳng định cho trí tuệ và bản lĩnh của lực lượng công an Việt Nam.",
    image: "/images/chess-strategy.jpg",
    imageAlt: "Chiến lược như ván cờ",
    accent: "#2C3E50",
    date: "",
  },
  {
    title: "Dùng Địch Đánh Địch — Đỉnh Cao Của Chiến Lược Thâm Nhập",
    text: "Chiến dịch thâm nhập đã thành công vang dội. Chiến lược dùng địch đánh địch trở thành bài học kinh điển trong lịch sử công an Việt Nam, được truyền lại cho nhiều thế hệ sau. Những trang sử vàng này mãi mãi khắc ghi tinh thần quả cảm của những chiến sĩ đã dấn thân vào hang ổ kẻ thù.",
    image: "/images/nva-medal-doc.jpg",
    imageAlt: "Tài liệu và huân chương",
    accent: "#8B4513",
    date: "",
  },
];

// Clickable image with hover effect
function StoryImage({
  src,
  alt,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={`story-img relative overflow-hidden cursor-pointer group ${className ?? ""}`}
      onClick={onClick}
    >
      <div className="story-img-inner absolute inset-[-40px] transition-transform duration-700 group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-12 h-12 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-500 drop-shadow-lg"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      </div>
    </div>
  );
}

export default function SectionStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  const [lightboxData, setLightboxData] = useState<
    (typeof STORY_CHAPTERS)[number] | null
  >(null);
  const [lightboxRect, setLightboxRect] = useState<DOMRect | null>(null);

  const openLightbox = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
      setLightboxRect(e.currentTarget.getBoundingClientRect());
      setLightboxData(STORY_CHAPTERS[idx]);
    },
    [],
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // ═══ 1. Hero char-by-char 3D flip ═══
      const chars = heroTitleRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotationX: -90 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 3.5,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: heroTitleRef.current, start: "top 85%" },
          },
        );
      }

      // ═══ 2. Hero subtitle slow fade ═══
      const heroSub = sectionRef.current?.querySelector(".hero-sub");
      if (heroSub) {
        gsap.fromTo(
          heroSub,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 4,
            delay: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: heroSub, start: "top 85%" },
          },
        );
      }

      // ═══ 3-4. Decorative lines grow from center ═══
      sectionRef.current?.querySelectorAll(".hero-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 3.5,
            ease: "power2.inOut",
            scrollTrigger: { trigger: line, start: "top 85%" },
          },
        );
      });

      // ═══ 5. Hero star spin in ═══
      const heroStar = sectionRef.current?.querySelector(".hero-star");
      if (heroStar) {
        gsap.fromTo(
          heroStar,
          { scale: 0, rotation: -360, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 3.5,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: heroStar, start: "top 85%" },
          },
        );
      }

      // ═══ CHAPTER 1 (6-10) ═══
      const ch1 = sectionRef.current?.querySelector(".ch-1");
      if (ch1) {
        const img1inner = ch1.querySelector(".story-img-inner");
        if (img1inner)
          gsap.fromTo(
            img1inner,
            { y: -60 },
            {
              y: 60,
              ease: "none",
              scrollTrigger: {
                trigger: ch1,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            },
          );
        const img1 = ch1.querySelector(".story-img");
        if (img1)
          gsap.fromTo(
            img1,
            { filter: "grayscale(1) sepia(0.6)" },
            {
              filter: "grayscale(0) sepia(0)",
              ease: "none",
              scrollTrigger: {
                trigger: ch1,
                start: "top 80%",
                end: "top 10%",
                scrub: 3,
              },
            },
          );
        if (img1)
          gsap.fromTo(
            img1,
            { scale: 1.1, opacity: 0.7 },
            {
              scale: 1,
              opacity: 1,
              duration: 4,
              ease: "power2.out",
              scrollTrigger: { trigger: ch1, start: "top 80%" },
            },
          );
        animTitleWords(ch1);
        animBody(ch1);
      }

      // ═══ CHAPTER 2 (11-16) ═══
      const ch2 = sectionRef.current?.querySelector(".ch-2");
      if (ch2) {
        const tb2 = ch2.querySelector(".ch-text-block");
        if (tb2)
          gsap.fromTo(
            tb2,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch2, start: "top 75%" },
            },
          );
        const img2 = ch2.querySelector(".story-img");
        if (img2)
          gsap.fromTo(
            img2,
            { x: 120, rotation: 5, opacity: 0, scale: 0.9 },
            {
              x: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 4,
              ease: "power3.out",
              scrollTrigger: { trigger: ch2, start: "top 72%" },
            },
          );
        const img2inner = ch2.querySelector(".story-img-inner");
        if (img2inner)
          gsap.fromTo(
            img2inner,
            { y: -30 },
            {
              y: 30,
              ease: "none",
              scrollTrigger: {
                trigger: ch2,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            },
          );
        animTitleWords(ch2);
        animBody(ch2);
        animDecLine(ch2);
      }

      // ═══ CHAPTER 3 (17-22) ═══
      const ch3 = sectionRef.current?.querySelector(".ch-3");
      if (ch3) {
        const img3 = ch3.querySelector(".story-img");
        if (img3)
          gsap.fromTo(
            img3,
            { clipPath: "inset(0 100% 0 0)", scale: 1.08, filter: "blur(8px)" },
            {
              clipPath: "inset(0 0% 0 0)",
              scale: 1,
              filter: "blur(0px)",
              duration: 4.5,
              ease: "power2.inOut",
              scrollTrigger: { trigger: ch3, start: "top 72%" },
            },
          );
        const tb3 = ch3.querySelector(".ch-text-block");
        if (tb3)
          gsap.fromTo(
            tb3,
            { x: 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch3, start: "top 70%" },
            },
          );
        const img3inner = ch3.querySelector(".story-img-inner");
        if (img3inner)
          gsap.fromTo(
            img3inner,
            { y: -30 },
            {
              y: 30,
              ease: "none",
              scrollTrigger: {
                trigger: ch3,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            },
          );
        animTitleWords(ch3);
        animBody(ch3);
        animDecLine(ch3);
      }

      // ═══ CHAPTER 4 (23-28) ═══
      const ch4 = sectionRef.current?.querySelector(".ch-4");
      if (ch4) {
        const img4 = ch4.querySelector(".story-img");
        if (img4)
          gsap.fromTo(
            img4,
            { filter: "grayscale(1) sepia(0.6)" },
            {
              filter: "grayscale(0) sepia(0)",
              ease: "none",
              scrollTrigger: {
                trigger: ch4,
                start: "top 60%",
                end: "bottom 40%",
                scrub: 3,
              },
            },
          );
        const ov4 = ch4.querySelector(".ch4-overlay");
        if (ov4)
          gsap.fromTo(
            ov4,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 4,
              ease: "power2.out",
              scrollTrigger: { trigger: ch4, start: "top 55%" },
            },
          );
        const img4inner = ch4.querySelector(".story-img-inner");
        if (img4inner)
          gsap.fromTo(
            img4inner,
            { y: -40 },
            {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: ch4,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            },
          );
        animTitleWords(ch4);
      }

      // ═══ CHAPTER 5 (29-34) ═══
      const ch5 = sectionRef.current?.querySelector(".ch-5");
      if (ch5) {
        const img5 = ch5.querySelector(".story-img");
        if (img5)
          gsap.fromTo(
            img5,
            { x: -120, rotation: -6, opacity: 0, scale: 0.9 },
            {
              x: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 4,
              ease: "power3.out",
              scrollTrigger: { trigger: ch5, start: "top 75%" },
            },
          );
        if (img5)
          gsap.fromTo(
            img5,
            { filter: "grayscale(1) sepia(0.4)" },
            {
              filter: "grayscale(0) sepia(0)",
              ease: "none",
              scrollTrigger: {
                trigger: ch5,
                start: "top 80%",
                end: "top 20%",
                scrub: 3,
              },
            },
          );
        const tb5 = ch5.querySelector(".ch-text-block");
        if (tb5)
          gsap.fromTo(
            tb5,
            { x: 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch5, start: "top 72%" },
            },
          );
        animTitleWords(ch5);
        animBody(ch5);
        animDecLine(ch5);
      }

      // ═══ CHAPTER 6 (35-40) ═══
      const ch6 = sectionRef.current?.querySelector(".ch-6");
      if (ch6) {
        const img6 = ch6.querySelector(".story-img");
        if (img6)
          gsap.fromTo(
            img6,
            { y: 100, rotation: 4, opacity: 0, scale: 0.85 },
            {
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 4.5,
              ease: "power3.out",
              scrollTrigger: { trigger: ch6, start: "top 75%" },
            },
          );
        if (img6)
          gsap.fromTo(
            img6,
            { filter: "blur(10px)" },
            {
              filter: "blur(0px)",
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch6, start: "top 72%" },
            },
          );
        const img6inner = ch6.querySelector(".story-img-inner");
        if (img6inner)
          gsap.fromTo(
            img6inner,
            { y: -30 },
            {
              y: 30,
              ease: "none",
              scrollTrigger: {
                trigger: ch6,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            },
          );
        const tb6 = ch6.querySelector(".ch-text-block");
        if (tb6)
          gsap.fromTo(
            tb6,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch6, start: "top 70%" },
            },
          );
        animTitleWords(ch6);
        animBody(ch6);
        animDecLine(ch6);
      }

      // ═══ CHAPTER 7 (41-46) ═══
      const ch7 = sectionRef.current?.querySelector(".ch-7");
      if (ch7) {
        const img7 = ch7.querySelector(".story-img");
        if (img7)
          gsap.fromTo(
            img7,
            { clipPath: "circle(0% at 50% 50%)", opacity: 0.5 },
            {
              clipPath: "circle(100% at 50% 50%)",
              opacity: 1,
              duration: 4.5,
              ease: "power2.inOut",
              scrollTrigger: { trigger: ch7, start: "top 72%" },
            },
          );
        if (img7)
          gsap.fromTo(
            img7,
            { filter: "grayscale(1) sepia(0.5)" },
            {
              filter: "grayscale(0) sepia(0)",
              ease: "none",
              scrollTrigger: {
                trigger: ch7,
                start: "top 75%",
                end: "top 15%",
                scrub: 3,
              },
            },
          );
        const img7inner = ch7.querySelector(".story-img-inner");
        if (img7inner)
          gsap.fromTo(
            img7inner,
            { y: -40 },
            {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: ch7,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            },
          );
        animTitleWords(ch7);
        animBody(ch7);
        animDecLine(ch7);
      }

      // ═══ CHAPTER 8: BOOK OPEN effect — image splits in half like opening a book ═══
      const ch8 = sectionRef.current?.querySelector(".ch-8");
      if (ch8) {
        // Book open: left half rotates out
        const bookLeft = ch8.querySelector(".book-left");
        if (bookLeft)
          gsap.fromTo(
            bookLeft,
            { rotationY: 0 },
            {
              rotationY: -70,
              duration: 4,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: ch8,
                start: "top 70%",
                end: "top 20%",
                scrub: 1.5,
              },
            },
          );
        // Book open: right half rotates out
        const bookRight = ch8.querySelector(".book-right");
        if (bookRight)
          gsap.fromTo(
            bookRight,
            { rotationY: 0 },
            {
              rotationY: 70,
              duration: 4,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: ch8,
                start: "top 70%",
                end: "top 20%",
                scrub: 1.5,
              },
            },
          );
        // Inner content reveals
        const bookInner = ch8.querySelector(".book-inner");
        if (bookInner)
          gsap.fromTo(
            bookInner,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 4,
              ease: "power2.out",
              scrollTrigger: { trigger: ch8, start: "top 55%" },
            },
          );
        animTitleWords(ch8);
        animBody(ch8);
      }

      // ═══ CHAPTER 9: SPIN ROTATE — image rotates 360° into view ═══
      const ch9 = sectionRef.current?.querySelector(".ch-9");
      if (ch9) {
        const img9 = ch9.querySelector(".story-img");
        if (img9)
          gsap.fromTo(
            img9,
            { rotation: -180, scale: 0.3, opacity: 0 },
            {
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 4.5,
              ease: "power3.out",
              scrollTrigger: { trigger: ch9, start: "top 75%" },
            },
          );
        // Sepia
        if (img9)
          gsap.fromTo(
            img9,
            { filter: "grayscale(1) sepia(0.5)" },
            {
              filter: "grayscale(0) sepia(0)",
              ease: "none",
              scrollTrigger: {
                trigger: ch9,
                start: "top 75%",
                end: "top 20%",
                scrub: 3,
              },
            },
          );
        const tb9 = ch9.querySelector(".ch-text-block");
        if (tb9)
          gsap.fromTo(
            tb9,
            { x: 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch9, start: "top 68%" },
            },
          );
        animTitleWords(ch9);
        animBody(ch9);
        animDecLine(ch9);
      }

      // ═══ CHAPTER 10: SPLIT IMAGE — image tears apart revealing text underneath ═══
      const ch10 = sectionRef.current?.querySelector(".ch-10");
      if (ch10) {
        // Left half slides left
        const splitL = ch10.querySelector(".split-left");
        if (splitL)
          gsap.fromTo(
            splitL,
            { x: "0%" },
            {
              x: "-110%",
              duration: 4,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: ch10,
                start: "top 65%",
                end: "top 15%",
                scrub: 1.5,
              },
            },
          );
        // Right half slides right
        const splitR = ch10.querySelector(".split-right");
        if (splitR)
          gsap.fromTo(
            splitR,
            { x: "0%" },
            {
              x: "110%",
              duration: 4,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: ch10,
                start: "top 65%",
                end: "top 15%",
                scrub: 1.5,
              },
            },
          );
        // Inner text reveals
        const splitInner = ch10.querySelector(".split-inner");
        if (splitInner)
          gsap.fromTo(
            splitInner,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 4,
              ease: "power2.out",
              scrollTrigger: { trigger: ch10, start: "top 45%" },
            },
          );
        animTitleWords(ch10);
        animBody(ch10);
      }

      // ═══ CHAPTER 11 / CLOSING ═══
      const ch11 = sectionRef.current?.querySelector(".ch-11");
      if (ch11) {
        const img11 = ch11.querySelector(".story-img");
        if (img11)
          gsap.fromTo(
            img11,
            { y: 80, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 3.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ch11, start: "top 75%" },
            },
          );
        animTitleWords(ch11);
        animBody(ch11);
        const star = ch11.querySelector(".end-star");
        if (star)
          gsap.fromTo(
            star,
            { scale: 0, rotation: -360 },
            {
              scale: 1,
              rotation: 0,
              duration: 3.5,
              ease: "back.out(1.2)",
              scrollTrigger: { trigger: star, start: "top 90%" },
            },
          );
      }

      // ═══ SHARED HELPERS ═══
      function animTitleWords(parent: Element) {
        const words = parent.querySelectorAll(".ch-title-word");
        if (words.length)
          gsap.fromTo(
            words,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 2.5,
              ease: "power2.out",
              stagger: 0.25,
              scrollTrigger: { trigger: parent, start: "top 80%" },
            },
          );
      }
      function animBody(parent: Element) {
        // Typewriter: animate each word one by one
        const words = parent.querySelectorAll(".ch-body-word");
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power1.out",
              stagger: 0.06,
              scrollTrigger: { trigger: parent, start: "top 78%" },
            },
          );
        }
      }
      function animDecLine(parent: Element) {
        const line = parent.querySelector(".ch-dec-line");
        if (line)
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 2.5,
              ease: "power2.inOut",
              scrollTrigger: { trigger: parent, start: "top 80%" },
            },
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ perspective: "600px" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  const renderTitle = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} className="ch-title-word inline-block mr-3 last:mr-0">
        {w}
      </span>
    ));

  // Typewriter: each word as a span
  const renderBodyWords = (text: string, dropCap?: boolean) => {
    const words = text.split(" ");
    return words.map((w, i) => (
      <span
        key={i}
        className={`ch-body-word inline ${i === 0 && dropCap ? "text-5xl font-bold float-left mr-2 leading-none text-[#8B4513]" : ""}`}
      >
        {w}{" "}
      </span>
    ));
  };

  const SEC =
    "mx-auto w-full px-4 sm:px-6 sm:max-w-150 md:px-8 md:max-w-180 lg:max-w-240 xl:max-w-310";
  const IMG_CARD =
    "rounded-sm border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)]";

  return (
    <>
      <div
        ref={sectionRef}
        className="bg-[#EFE9E7] text-black overflow-x-hidden"
      >
        {/* ════ HERO ════ */}
        <section className={`${SEC} pt-24 md:pt-36 pb-16 text-center`}>
          <h2
            ref={heroTitleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ perspective: "600px" }}
          >
            {splitChars("Quyết Định Táo Bạo")}
          </h2>
          <p className="hero-sub text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Câu chuyện về những chiến sĩ công an đã dấn thân vào hang ổ kẻ thù,
            dùng chính địch để đánh địch
          </p>
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="hero-line w-24 h-[1px] bg-[#8B4513]/50 origin-left" />
            <svg
              viewBox="0 0 24 24"
              className="hero-star w-6 h-6 text-[#8B4513]"
              fill="currentColor"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <div className="hero-line w-24 h-[1px] bg-[#8B4513]/50 origin-right" />
          </div>
        </section>

        {/* ════ CH1: Large image + 2-col text ════ */}
        <article className={`ch-1 ${SEC} mb-24 md:mb-36`}>
          <StoryImage
            src={STORY_CHAPTERS[0].image}
            alt={STORY_CHAPTERS[0].imageAlt}
            className={`w-full h-[40vh] md:h-[55vh] ${IMG_CARD}`}
            onClick={(e) => openLightbox(e, 0)}
          />
          <div className="mt-10 md:mt-14">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 overflow-hidden">
              {renderTitle(STORY_CHAPTERS[0].title)}
            </h3>
            <div className="md:columns-2 md:gap-10 text-gray-700 leading-relaxed text-base md:text-lg">
              <p>{renderBodyWords(STORY_CHAPTERS[0].text, true)}</p>
            </div>
          </div>
        </article>

        {/* ════ CH2: Text left + Image right ════ */}
        <article className={`ch-2 ${SEC} mb-24 md:mb-36`}>
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
            <div className="ch-text-block md:w-[58%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 overflow-hidden">
                {renderTitle(STORY_CHAPTERS[1].title)}
              </h3>
              <div className="ch-dec-line h-[2px] w-20 bg-[#6B3410] mb-5 origin-left" />
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {renderBodyWords(STORY_CHAPTERS[1].text)}
              </p>
            </div>
            <div className="md:w-[42%]">
              <StoryImage
                src={STORY_CHAPTERS[1].image}
                alt={STORY_CHAPTERS[1].imageAlt}
                className={`w-full h-[280px] md:h-[360px] ${IMG_CARD}`}
                onClick={(e) => openLightbox(e, 1)}
              />
            </div>
          </div>
        </article>

        {/* ════ CH3: Image left + Text right ════ */}
        <article className={`ch-3 ${SEC} mb-24 md:mb-36`}>
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-14">
            <div className="md:w-[42%]">
              <StoryImage
                src={STORY_CHAPTERS[2].image}
                alt={STORY_CHAPTERS[2].imageAlt}
                className={`w-full h-[280px] md:h-[360px] ${IMG_CARD}`}
                onClick={(e) => openLightbox(e, 2)}
              />
            </div>
            <div className="ch-text-block md:w-[58%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 overflow-hidden">
                {renderTitle(STORY_CHAPTERS[2].title)}
              </h3>
              <div className="ch-dec-line h-[2px] w-20 bg-[#4A2808] mb-5 origin-left" />
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {renderBodyWords(STORY_CHAPTERS[2].text)}
              </p>
            </div>
          </div>
        </article>

        {/* ════ CH4: Image + dark overlay text ════ */}
        <article className={`ch-4 ${SEC} relative mb-24 md:mb-36`}>
          <StoryImage
            src={STORY_CHAPTERS[3].image}
            alt={STORY_CHAPTERS[3].imageAlt}
            className="w-full h-[50vh] md:h-[60vh] rounded-sm"
            onClick={(e) => openLightbox(e, 3)}
          />
          <div className="ch4-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-14 rounded-sm">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white overflow-hidden">
                {renderTitle(STORY_CHAPTERS[3].title)}
              </h3>
              <p className="text-white/80 leading-relaxed text-base md:text-lg max-w-xl">
                {renderBodyWords(STORY_CHAPTERS[3].text)}
              </p>
            </div>
          </div>
        </article>

        {/* ════ CH5: NEW — Text left + Image right (radio) ════ */}
        <article className={`ch-5 ${SEC} mb-24 md:mb-36`}>
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-14">
            <div className="md:w-[42%]">
              <StoryImage
                src={STORY_CHAPTERS[4].image}
                alt={STORY_CHAPTERS[4].imageAlt}
                className={`w-full h-[300px] md:h-[400px] ${IMG_CARD}`}
                onClick={(e) => openLightbox(e, 4)}
              />
            </div>
            <div className="ch-text-block md:w-[58%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 overflow-hidden">
                {renderTitle(STORY_CHAPTERS[4].title)}
              </h3>
              <div className="ch-dec-line h-[2px] w-20 bg-[#2C5F2D] mb-5 origin-left" />
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {renderBodyWords(STORY_CHAPTERS[4].text)}
              </p>
            </div>
          </div>
        </article>

        {/* ════ CH6: NEW — Text right + Image left (meeting) ════ */}
        <article className={`ch-6 ${SEC} mb-24 md:mb-36`}>
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
            <div className="ch-text-block md:w-[58%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 overflow-hidden">
                {renderTitle(STORY_CHAPTERS[5].title)}
              </h3>
              <div className="ch-dec-line h-[2px] w-20 bg-[#4A3728] mb-5 origin-left" />
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {renderBodyWords(STORY_CHAPTERS[5].text)}
              </p>
            </div>
            <div className="md:w-[42%]">
              <StoryImage
                src={STORY_CHAPTERS[5].image}
                alt={STORY_CHAPTERS[5].imageAlt}
                className={`w-full h-[300px] md:h-[400px] ${IMG_CARD}`}
                onClick={(e) => openLightbox(e, 5)}
              />
            </div>
          </div>
        </article>

        {/* ════ CH7: NEW — Large image + text (documents) ════ */}
        <article className={`ch-7 ${SEC} mb-24 md:mb-36`}>
          <StoryImage
            src={STORY_CHAPTERS[6].image}
            alt={STORY_CHAPTERS[6].imageAlt}
            className={`w-full h-[40vh] md:h-[55vh] ${IMG_CARD}`}
            onClick={(e) => openLightbox(e, 6)}
          />
          <div className="mt-10 md:mt-14">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 overflow-hidden">
              {renderTitle(STORY_CHAPTERS[6].title)}
            </h3>
            <div className="ch-dec-line h-[2px] w-24 bg-[#6B3410] mb-5 origin-left" />
            <p className="text-gray-700 leading-relaxed text-base md:text-lg max-w-3xl">
              {renderBodyWords(STORY_CHAPTERS[6].text)}
            </p>
          </div>
        </article>

        {/* ════ CH8: BOOK OPEN — image splits like opening a book ════ */}
        <article className={`ch-8 ${SEC} mb-24 md:mb-36`}>
          <div
            className="relative w-full h-[45vh] md:h-[55vh] mb-10 md:mb-14"
            style={{ perspective: "1200px" }}
          >
            {/* Left half of the "book" */}
            <div
              className="book-left absolute inset-0 w-1/2 overflow-hidden origin-right"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-[200%] h-full">
                <Image
                  src={STORY_CHAPTERS[7].image}
                  alt={STORY_CHAPTERS[7].imageAlt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Right half of the "book" */}
            <div
              className="book-right absolute inset-0 left-1/2 w-1/2 overflow-hidden origin-left"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-[200%] h-full -translate-x-1/2">
                <Image
                  src={STORY_CHAPTERS[7].image}
                  alt={STORY_CHAPTERS[7].imageAlt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Inner content revealed when book opens */}
            <div className="book-inner absolute inset-0 flex items-center justify-center bg-[#EFE9E7]">
              <div className="text-center px-6 max-w-2xl">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 overflow-hidden">
                  {renderTitle(STORY_CHAPTERS[7].title)}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {renderBodyWords(STORY_CHAPTERS[7].text)}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* ════ CH9: SPIN ROTATE — chess image spins into view ════ */}
        <article className={`ch-9 ${SEC} mb-24 md:mb-36`}>
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-14">
            <div className="md:w-[45%]">
              <StoryImage
                src={STORY_CHAPTERS[8].image}
                alt={STORY_CHAPTERS[8].imageAlt}
                className={`w-full h-[300px] md:h-[400px] ${IMG_CARD}`}
                onClick={(e) => openLightbox(e, 8)}
              />
            </div>
            <div className="ch-text-block md:w-[55%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 overflow-hidden">
                {renderTitle(STORY_CHAPTERS[8].title)}
              </h3>
              <div className="ch-dec-line h-[2px] w-20 bg-[#2C3E50] mb-5 origin-left" />
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {renderBodyWords(STORY_CHAPTERS[8].text)}
              </p>
            </div>
          </div>
        </article>

        {/* ════ CH10: SPLIT IMAGE — tears apart revealing closing text ════ */}
        <article className={`ch-10 ${SEC} mb-24 md:mb-36`}>
          <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-sm">
            {/* Left split */}
            <div className="split-left absolute inset-0 w-1/2 overflow-hidden">
              <div className="relative w-[200%] h-full">
                <Image
                  src={STORY_CHAPTERS[9].image}
                  alt={STORY_CHAPTERS[9].imageAlt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Right split */}
            <div className="split-right absolute inset-0 left-1/2 w-1/2 overflow-hidden">
              <div className="relative w-[200%] h-full -translate-x-1/2">
                <Image
                  src={STORY_CHAPTERS[9].image}
                  alt={STORY_CHAPTERS[9].imageAlt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Inner content */}
            <div className="split-inner absolute inset-0 flex items-center justify-center bg-[#EFE9E7]">
              <div className="text-center px-6 max-w-3xl">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-6 overflow-hidden leading-tight">
                  {renderTitle(STORY_CHAPTERS[9].title)}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
                  {renderBodyWords(STORY_CHAPTERS[9].text)}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* ════ CH11: Final Closing ════ */}
        <article className={`ch-11 ${SEC} mb-20 md:mb-28 text-center`}>
          <div className="max-w-md mx-auto mb-8">
            <StoryImage
              src={STORY_CHAPTERS[9].image}
              alt={STORY_CHAPTERS[9].imageAlt}
              className={`w-full h-[240px] md:h-[300px] ${IMG_CARD}`}
              onClick={(e) => openLightbox(e, 9)}
            />
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
            &ldquo;{renderBodyWords(STORY_CHAPTERS[9].text)}&rdquo;
          </blockquote>
          <div className="end-star flex justify-center mt-14">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-[#8B4513]"
              fill="currentColor"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
        </article>
      </div>

      <ImageLightbox
        data={lightboxData}
        sourceRect={lightboxRect}
        onClose={() => {
          setLightboxData(null);
          setLightboxRect(null);
        }}
      />
    </>
  );
}

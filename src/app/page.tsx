"use client";
import { useEffect, useRef } from "react";
import LearnGsap from "../components/LearnGsap/LearnGsap";
import LearnLocomotiveScroll from "../components/LearnLocomotiveScroll/LearnLocomotiveScroll";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <main>
      <LearnGsap />
      {/* <LearnLocomotiveScroll /> */}
    </main>
  );
}

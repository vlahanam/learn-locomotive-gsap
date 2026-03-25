"use client"

import { useEffect } from "react";
import Demo from "../components/Demo/Demo";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <main>
      <Demo />
    </main>
  );
}

// "use client";

// import { useEffect } from "react";
import ADemoSwiper from "../components/ADemoSwiper/ADemoSwiper";

export default function Home() {
  //   useEffect(() => {
  //     (async () => {
  //       const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //       const locomotiveScroll = new LocomotiveScroll();
  //     })();
  //   }, []);
  return (
    <main>
      <ADemoSwiper />
    </main>
  );
}

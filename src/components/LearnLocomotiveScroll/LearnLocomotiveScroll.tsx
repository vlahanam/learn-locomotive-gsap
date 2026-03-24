export default function LearnLocomotiveScroll() {
  return (
    <div>
      <div className="h-screen flex">
        <div
          data-scroll
          data-scroll-speed="2"
          className="bg-blue-500 w-[30vw] h-[30vw]"
        ></div>

        <div
          data-scroll
          data-scroll-speed="1"
          className="bg-amber-500 w-[30vw] h-[30vw]"
        ></div>
      </div>

      <div className="h-screen bg-red-500"></div>
    </div>
  );
}

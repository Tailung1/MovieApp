// Smooth auto scroll with intervals
//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     const interval = setInterval(() => {
//       if (!scrollContainer) return;

//       const { scrollLeft, clientWidth, scrollWidth } =
//         scrollContainer;

//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         scrollContainer.scrollBy({ left: 320, behavior: "smooth" });
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

import { useEffect, useRef, useState } from "react";
import data from "../movies.json";
import SharedMovies from "../shared/SharedMovies";
import { useSearchMovie } from "../MovieContext";

export default function Home() {
    const {toggleBookmark}=useSearchMovie()
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth, non-stop scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = 0;

    const scroll = (time: number) => {
      if (lastTime === 0) {
        lastTime = time;
      }

      const deltaTime = time - lastTime;
      lastTime = time;

      const scrollSpeed = 0.1; // Speed of scroll (adjust for smoothness)
      const currentScroll = scrollContainer.scrollLeft;
      const newScroll = currentScroll + scrollSpeed * deltaTime; // Adjust scroll by speed

      // If we've reached the end, reset to the beginning
      if (newScroll >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = newScroll;
      }

      // Only request next frame if hover is not active
      if (!isHovered) {
        animationId = requestAnimationFrame(scroll);
      }
    };

    // Start the scrolling animation
    animationId = requestAnimationFrame(scroll);

    // Clean up on unmount or when hover state changes
    return () => cancelAnimationFrame(animationId); // Clean up the animation when unmounted or hover state changes
  }, [isHovered]); // Re-run the effect when hover state changes

  // Handle hover start and end events
  const handleMouseEnter = () => {
    setIsHovered(true); // Stop scrolling when hover starts
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Resume scrolling when hover ends
  };

  return (
    <div className='bg-[#10141E] min-h-[100vh]'>
      <h2 className='text-white pb-[15px] ml-4 text-[20px]'>
        Trending
      </h2>
      <div
        ref={scrollRef}
        className='ml-4 overflow-x-hidden scrollbar-hide'
        style={{
          scrollBehavior: "smooth", // Smooth scrolling
        }}
        onMouseEnter={handleMouseEnter} // Listen for mouse enter
        onMouseLeave={handleMouseLeave} // Listen for mouse leave
      >
        <div className='flex gap-4'>
          {/* Duplicate the data to make it loop */}
          {[...data, ...data].map((movie, index) => (
            <div
              key={index}
              className='relative snap-start flex-shrink-0 w-[240px] h-[140px] flex flex-col gap-2 rounded-md overflow-hidden group'
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className='w-full h-[140px]'
              />
              <div
                className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity'
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              />
              <div
                className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center'
                style={{
                  clipPath: "inset(35px 65px 55px round 15px)",
                }}
              >
                <div className='absolute  top-[-10px] w-full h-full flex gap-[8px] items-center justify-center bg-white/25 z-10'>
                  <img src='/play.svg' alt='play icon' />
                  <p className='text-white'>Play</p>
                </div>
              </div>
              <div
                onClick={() => toggleBookmark(movie.id)}
                className='group/bookmark absolute top-2 right-2 z-20 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                >
                  <circle
                    opacity='0.500647'
                    cx='16'
                    cy='16'
                    r='16'
                    fill='#10141E'
                    className='group-hover/bookmark:fill-white'
                  />
                  <path
                    d='M11.0576 9.75H20.6094C20.628 9.75 20.6454 9.7514 20.6621 9.75488L20.7109 9.77148L20.7217 9.77539L20.7314 9.7793C20.7986 9.80616 20.8383 9.84044 20.8701 9.88672C20.9028 9.93431 20.917 9.97775 20.917 10.0361V21.9639C20.917 22.0222 20.9028 22.0657 20.8701 22.1133C20.8383 22.1596 20.7986 22.1938 20.7314 22.2207L20.7236 22.2236L20.7158 22.2275C20.7109 22.2296 20.6807 22.2412 20.6094 22.2412C20.5318 22.2412 20.4733 22.225 20.418 22.1885L20.3633 22.1445L16.3574 18.2344L15.833 17.7236L15.3096 18.2344L11.3027 22.1455C11.2158 22.2264 11.144 22.2499 11.0576 22.25C11.0204 22.25 10.9879 22.2428 10.9551 22.2285L10.9453 22.2246L10.9346 22.2207L10.8525 22.1738L10.7959 22.1133C10.7632 22.0657 10.75 22.0222 10.75 21.9639V10.0361C10.75 10.0072 10.7534 9.98191 10.7607 9.95801L10.7959 9.88672C10.8277 9.84029 10.8673 9.80622 10.9346 9.7793L10.9453 9.77539L10.9551 9.77148C10.9715 9.76432 10.9881 9.75835 11.0049 9.75488L11.0576 9.75Z'
                    stroke='white'
                    strokeWidth='1.5'
                    fill={movie.isBookmarked ? "#fff" : "none"}
                    className='group-hover/bookmark:stroke-black group-hover/bookmark:fill-[#e39d12]'
                  />
                </svg>
              </div>
              <div className='flex flex-col absolute left-2 bottom-2'>
                <div className='flex gap-[11px] items-center'>
                  <span className='text-white text-[14px]'>
                    {movie.year}
                  </span>
                  <span className='text-gray-400'>•</span>
                  <span className='text-white text-[16px]'>
                    {movie.category}
                  </span>
                </div>
                <p className='text-white text-[17px]'>
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended / Filtered Movies Section */}
      <SharedMovies title='Recommended for you' category={true} />
    </div>
  );
}

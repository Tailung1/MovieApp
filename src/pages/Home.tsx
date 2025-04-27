import { useEffect, useRef } from "react";
import data from "../movies.json";
import SharedMovies from "../shared/SharedMovies";
import { useState } from "react";

export default function Home() {
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

      const scrollSpeed = 0.05; // Speed of scroll (adjust for smoothness)
      const currentScroll = scrollContainer.scrollLeft;
      const newScroll = currentScroll + scrollSpeed * deltaTime; // Adjust scroll by speed

      // If we've reached the end, reset to the beginning
      if (newScroll >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = newScroll;
      }

      // If hover is not active, request next frame to continue scrolling
      if (!isHovered) {
        animationId = requestAnimationFrame(scroll);
      }
    };

    // Start the scrolling animation
    requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId); // Clean up on unmount
  }, [isHovered]); // Re-run when `isHovered` changes

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
              className='snap-start flex-shrink-0 w-[200px] flex flex-col gap-2 rounded-md overflow-hidden'
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className='w-full h-[140px]'
              />
              <div className='flex flex-col'>
                <div className='flex gap-[11px] items-center'>
                  <span className='text-white text-[14px]'>
                    {movie.year}
                  </span>
                  <span className='text-gray-400'>•</span>
                  <span className='text-white text-[14px]'>
                    {movie.category}
                  </span>
                </div>
                <p className='text-violet-500 text-[14px]'>
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
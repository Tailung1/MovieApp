import { useEffect, useRef } from "react";
import data from "../movies.json";


import SharedMovies from "../shared/SharedMovies";
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);



  // Filter movies based on the search term directly
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const interval = setInterval(() => {
      if (!scrollContainer) return;

      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainer;

      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 220, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#10141E] min-h-[100vh]'>
      <h2 className='text-white pb-[15px] ml-4 text-[20px]'>
        Trending
      </h2>
      <div
        ref={scrollRef}
        className='ml-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide'
      >
        <div className='flex gap-4 transition-all duration-1000 ease-in-out'>
          {data.map((movie) => (
            <div
              key={movie.id}
              className='snap-start flex-shrink-0 w-[200px] flex flex-col gap-2 rounded-md overflow-hidden'
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className='w-full h-[140px] object-cover'
              />
              <div className='flex flex-col'>
                <div className='flex gap-[11px] items-center'>
                  <span className='text-white text-[14px]'>
                    {movie.year}
                  </span>
                  <img className='w-1' src='../public/dot.svg' />
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
      <SharedMovies
        title={"Recommended for you"}
        category={true}
      />
    </div>
  );
}

import { useEffect, useRef } from "react";
import data from "../movies.json";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const interval = setInterval(() => {
      if (!scrollContainer) return;

      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainer;

      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 220, behavior: "smooth" }); // Adjusted size
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#10141E] min-h-[100vh]'>
      {/* Trending Movies Section */}
      <div
        ref={scrollRef}
        className='overflow-x-hidden relative scroll-smooth snap-x snap-mandatory ml-4 pr-4' // Added padding-left and right
      >
        <div className='flex gap-4 transition-all duration-1000 ease-in-out'>
          {data.map((movie) => (
            <div
              key={movie.id}
              className='snap-start flex-shrink-0 w-[230px] rounded-md overflow-hidden'
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className='w-full h-[120px] object-cover'
              />
              <p className='text-white mt-2'>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended for you Section */}
      <div className='px-[16px] flex flex-col mt-[24px]'>
        <h2 className='text-white pb-[15px] text-[20px]'>
          Recommended for you
        </h2>
        <div className='flex flex-wrap gap-[15px]'>
          {data.map(
            (movie) =>
              movie.recommended && (
                <div key={movie.id} className='w-[164px]'>
                  <div className='flex relative flex-col gap-[10px]'>
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className='h-[110px] rounded-[8px] object-cover'
                    />
                    <svg
                      className='absolute top-2 right-2 cursor-pointer hover:fill-teal-500 hover:stroke-blue-700 hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out'
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
                      />
                      <path
                        d='M20.7112 9.771L20.7215 9.77548L20.7319 9.77965C20.7992 9.80657 20.8386 9.84049 20.8705 9.88692C20.9032 9.93458 20.9167 9.97786 20.9167 10.0364V21.9636C20.9167 22.0221 20.9032 22.0654 20.8705 22.1131C20.8386 22.1595 20.7992 22.1934 20.7319 22.2203L20.7237 22.2236L20.7156 22.2271C20.7107 22.2292 20.6807 22.2407 20.6094 22.2407C20.5085 22.2407 20.4397 22.2142 20.3686 22.15L16.3572 18.2346L15.8333 17.7233L15.3095 18.2346L11.2975 22.1505C11.2129 22.2276 11.1421 22.25 11.0573 22.25C11.02 22.25 10.9882 22.2433 10.9555 22.229L10.9452 22.2245L10.9347 22.2203C10.8674 22.1934 10.8281 22.1595 10.7962 22.1131C10.7635 22.0654 10.75 22.0221 10.75 21.9636V10.0364C10.75 9.97786 10.7635 9.93458 10.7962 9.88692C10.8281 9.84049 10.8674 9.80657 10.9347 9.77965L10.9452 9.77548L10.9555 9.771C10.9882 9.75674 11.02 9.75 11.0573 9.75H20.6094C20.6466 9.75 20.6784 9.75674 20.7112 9.771Z'
                        stroke='white'
                        strokeWidth='1.5'
                      />
                    </svg>

                    <div className='flex flex-col'>
                      <div className='flex gap-[11px] items-center'>
                        <span className='text-white text-[11px]'>
                          {movie.year}
                        </span>
                        <img
                          className='w-1'
                          src='../public/dot.svg'
                        />
                        <span className='text-white text-[14px]'>
                          {movie.category}
                        </span>
                      </div>
                      <p className='text-white text-[14px]'>
                        {movie.title}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

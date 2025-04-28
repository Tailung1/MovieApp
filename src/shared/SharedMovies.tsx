import { useEffect, useState } from "react";
import { useSearchMovie } from "../MovieContext";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

type TCategory = boolean | "series" | "movie";
type TTitle = "Recommended for you" | "Series" | "Movies";

export default function SharedMovies({
  category,
  title,
}: {
  category: TCategory;
  title: TTitle;
}) {
  const {
    searchMovie,
    inputPlaceHolder,
    toggleBookmark,
    movies,
    originalMovies,
    setMovies,
    direction,
  } = useSearchMovie();
  const [movieMatches, setMovieMatches] = useState(false);

  useEffect(() => {
    let filtered = originalMovies;

    if (direction === "home") {
      // all movies
      filtered = originalMovies;
    } else if (direction === "movie") {
      filtered = originalMovies.filter(
        (movie) => movie.category === "movie"
      );
    } else if (direction === "series") {
      filtered = originalMovies.filter(
        (movie) => movie.category === "series"
      );
    } else if (direction === "bookMarked") {
      filtered = originalMovies.filter((movie) => movie.isBookmarked);
    }

    if (searchMovie) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchMovie.toLowerCase())
      );
    }

    if (typeof category === "boolean") {
      filtered = filtered.filter(
        (movie) => movie.recommended === category
      );
    }

    setMovies(filtered);
    setMovieMatches(filtered.length > 0);
  }, [
    searchMovie,
    category,
    inputPlaceHolder,
    direction,
    originalMovies,
  ]);

  return (
    <div className='px-[16px] flex flex-col mt-[24px]'>
      <h2 className='text-white pb-[15px] text-[20px] min-h-[24px]'>
        {searchMovie ? (
          !movieMatches ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-400 italic'
            >
              No matching titles — maybe try something else?
            </motion.span>
          ) : `${title}` === "Recommended for you" ? (
            <>
              Filtered{" "}
              <span className='text-orange-600'>Recommended</span>{" "}
              Movies/Series
            </>
          ) : (
            `Filtered ${title}`
          )
        ) : (
          `${title}`
        )}
      </h2>

      <div className='flex flex-wrap gap-[15px]'>
        {!movieMatches ? (
          <div className='w-full p-4'>
            <div className='animate-pulse'>
              <div className='bg-gray-600 h-[110px] rounded-[8px] mb-4'></div>
              <div className='bg-gray-600 h-[20px] w-[80%] rounded mb-2'></div>
              <div className='bg-gray-600 h-[14px] w-[60%] rounded'></div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {movies.map((movie) => (
              <div key={movie.id} className='flex flex-col w-[164px]'>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: easeInOut }}
                  className=' h-[110px] rounded-[8px] overflow-hidden cursor-pointer relative group'
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className='w-full h-full'
                  />

                  {"O V E R L A Y"}
                  {"O V E R L A Y"}
                  {"O V E R L A Y"}
                  {"O V E R L A Y"}

                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity '
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  />

                  <div
                    className='absolute inset-0 flex opacity-0 group-hover:opacity-100 bg-red-600   justify-center items-center '
                    style={{
                      clipPath: "inset(35px 35px round 15px)",
                      // Ensure the background doesn't block visibility
                    }}
                  >
                    <img
                      className='absolute inset-0 w-full h-full'
                      src={movie.thumbnail}
                      alt='movie thumbnail'
                    />

                    <div className='flex w-full h-full justify-center items-center bg-white/25 gap-[5px] z-10'>
                      <img
                        className='w-6 h-6'
                        src='/play.svg'
                        alt='play icon'
                      />
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
                </motion.div>

                <div className='mt-1 text-white text-[15px] flex flex-col'>
                  <div className='flex items-center gap-[10px]'>
                    <p className='font-medium leading-none'>
                      {movie.year}
                    </p>
                    <span className='text-gray-400'>•</span>
                    <p>{movie.category}</p>
                  </div>
                  <p className='text-violet-600'>{movie.title}</p>
                </div>
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

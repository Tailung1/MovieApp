import { useEffect, useState } from "react";
import { useSearchMovie } from "../MovieContext";
import data from "../movies.json";
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
  const { searchMovie, inputPlaceHolder, toggleBookmark } =
    useSearchMovie();
  const [movieMatches, setMovieMatches] = useState(false);
  const [moviesToDisplay, setMovieToDisplay] = useState(data);

  useEffect(() => {
    let filtered = data;

    if (searchMovie) {
      if (typeof category === "boolean") {
        filtered = data.filter(
          (movie) =>
            movie.title
              .toLowerCase()
              .includes(searchMovie.toLowerCase()) &&
            movie.recommended === category
        );
      } else if (inputPlaceHolder === "Search for movies") {
        filtered = data.filter(
          (movie) =>
            movie.title
              .toLowerCase()
              .includes(searchMovie.toLowerCase()) &&
            movie.category === "movie"
        );
      } else if (inputPlaceHolder === "Search for TV series") {
        filtered = data.filter(
          (movie) =>
            movie.title
              .toLowerCase()
              .includes(searchMovie.toLowerCase()) &&
            movie.category === "series"
        );
      } else {
        filtered = data.filter((movie) =>
          movie.title
            .toLowerCase()
            .includes(searchMovie.toLowerCase())
        );
      }
    } else {
      if (typeof category === "boolean") {
        filtered = data.filter(
          (movie) => movie.recommended === category
        );
      } else {
        filtered = data.filter(
          (movie) => movie.category === category.toLowerCase()
        );
      }
    }

    setMovieToDisplay(filtered);
    setMovieMatches(filtered.length > 0);
  }, [searchMovie, category, inputPlaceHolder]);

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
            `Filtred ${title}`
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
            {moviesToDisplay.map((movie) => (
              <div key={movie.id} className='flex flex-col'>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: easeInOut }}
                  className='w-[164px] h-[110px] rounded-[8px] overflow-hidden cursor-pointer relative group'
                >
                  {/* Base Image */}
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className='w-full h-full ' // first img
                  />

                  {/* Dark Overlay */}
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity'
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  />

                  {/* Mirror Effect */}
                  <div className='absolute inset-0 hidden   group-hover:flex items-center justify-center pointer-events-none'>
                    <div
                      className='w-full h-full flex  items-center justify-center '
                      style={{
                        clipPath: "inset(36px 36px round 15px)", //
                      }}
                    >
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className='w-full h-full ' // second img
                      />
                      {/* Overlay with opacity background */}
                      <div className='absolute w-full h-full    flex items-center justify-center gap-[8px] text-white z-10 bg-white/25 '>
                        <svg
                          className='w-6 transition-colors'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 30 30'
                          fill='red'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM21 14.5L12 8V21L21 14.5Z'
                          />
                        </svg>
                        <span className='text-[20px] text-red-600'>
                          Play
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => toggleBookmark(movie.id)}
                    className='group/bookmark absolute top-2 right-2 z-20'
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
                        className='group-hover/bookmark:fill-[#fffefc]'
                      />
                      <path
                        d='M11.0576 9.75H20.6094C20.628 9.75 20.6454 9.7514 20.6621 9.75488L20.7109 9.77148L20.7217 9.77539L20.7314 9.7793C20.7986 9.80616 20.8383 9.84044 20.8701 9.88672C20.9028 9.93431 20.917 9.97775 20.917 10.0361V21.9639C20.917 22.0222 20.9028 22.0657 20.8701 22.1133C20.8383 22.1596 20.7986 22.1938 20.7314 22.2207L20.7236 22.2236L20.7158 22.2275C20.7109 22.2296 20.6807 22.2412 20.6094 22.2412C20.5318 22.2412 20.4733 22.225 20.418 22.1885L20.3633 22.1445L16.3574 18.2344L15.833 17.7236L15.3096 18.2344L11.3027 22.1455C11.2158 22.2264 11.144 22.2499 11.0576 22.25C11.0204 22.25 10.9879 22.2428 10.9551 22.2285L10.9453 22.2246L10.9346 22.2207L10.8525 22.1738L10.7959 22.1133C10.7632 22.0657 10.75 22.0222 10.75 21.9639V10.0361C10.75 10.0072 10.7534 9.98191 10.7607 9.95801L10.7959 9.88672C10.8277 9.84029 10.8673 9.80622 10.9346 9.7793L10.9453 9.77539L10.9551 9.77148C10.9715 9.76432 10.9881 9.75835 11.0049 9.75488L11.0576 9.75Z'
                        stroke='white'
                        stroke-width='1.5'
                        className='group-hover/bookmark:stroke-black group-hover/bookmark:fill-[#fffefc]'
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Title + Year below */}
                <div className='mt-1 text-white text-[15px] flex flex-col'>
                  <div className='flex items-center gap-[10px]'>
                    <p className='font-medium leading-none'>
                      {movie.year}
                    </p>
                    <img
                      className='w-1 h-1'
                      src='../public/dot.svg'
                      alt='dot icon'
                    />
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

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
              <motion.div
                layout
                key={movie.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.35, ease: easeInOut }}
                className='w-[164px] h-[110px] rounded-[8px] overflow-hidden cursor-pointer flex flex-col gap-[10px] relative group'
              >
                {/* Base Image */}
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className='w-full h-full ' // no object-cover
                />

                {/* Dark Overlay */}
                <div
                  className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity'
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  }}
                />

                {/* Mirror Effect */}
                <div className='absolute inset-0 hidden group-hover:flex items-center justify-center pointer-events-none'>
                  <div
                    className='w-full h-full flex items-center justify-center overflow-hidden'
                    style={{
                      clipPath: "inset(35px round 15px)",
                      borderRadius: "18px",
                    }}
                  >
                    {/* Mirrored IMG instead of background */}
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className='w-full h-full ' // identical to main image
                    />
                    <div className='absolute flex items-center justify-center gap-[8px] text-white z-10 '>
                      <svg
                        className='w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        viewBox='0 0 30 30'
                        fill='white'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM21 14.5L12 8V21L21 14.5Z'
                        />
                      </svg>
                      <span className='text-[20px]'>Play</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

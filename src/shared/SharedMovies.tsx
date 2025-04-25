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

                  <svg
                    className='absolute group2 top-2 right-2 w-8 h-8'
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
                      fill='#10141E' // this to white
                    />
                    <path
                      stroke='white' // this to black
                      d='M20.6094 9C20.7491 9 20.8828 9.02776 21.0104 9.08328C21.2109 9.16347 21.3704 9.28993 21.4889 9.46266C21.6074 9.63538 21.6667 9.82661 21.6667 10.0364V21.9636C21.6667 22.1734 21.6074 22.3646 21.4889 22.5373C21.3704 22.7101 21.2109 22.8365 21.0104 22.9167C20.895 22.9661 20.7613 22.9907 20.6094 22.9907C20.3177 22.9907 20.0655 22.892 19.8529 22.6946L15.8333 18.7713L11.8138 22.6946C11.5951 22.8982 11.3429 23 11.0573 23C10.9175 23 10.7839 22.9722 10.6562 22.9167C10.4557 22.8365 10.2962 22.7101 10.1777 22.5373C10.0592 22.3646 10 22.1734 10 21.9636V10.0364C10 9.82661 10.0592 9.63538 10.1777 9.46266C10.2962 9.28993 10.4557 9.16347 10.6562 9.08328C10.7839 9.02776 10.9175 9 11.0573 9H20.6094Z'
                      fill='none'
                    />
                  </svg>
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

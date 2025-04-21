import { useEffect, useState } from "react";
import { useSearchMovie } from "../MovieContext";
import data from "../movies.json";

import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedMovies() {
  const { searchMovie } = useSearchMovie();
  const [movieMatches, setMovieMatches] = useState<boolean>(false);
  const [movies, setMovies] = useState(data);

  useEffect(() => {
    let filtered = data;
    if (searchMovie) {
      filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase() === searchMovie.toLowerCase()
      );
    } else {
      filtered = movies.filter((movie) => movie.recommended);
    }

    setMovies(filtered);
    setMovieMatches(true);
  }, [searchMovie]);

  return (
    <div>
      <h2 className='text-white pb-[15px] text-[20px] min-h-[24px]'>
        {searchMovie ? (
          !movieMatches ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-400 italic'
            >
              no Series Found
            </motion.span>
          ) : (
            "Filtered Series"
          )
        ) : (
          "series"
        )}
      </h2>
      <div className='flex flex-wrap gap-[15px]'>
        <AnimatePresence mode='popLayout'>{}</AnimatePresence>
      </div>
    </div>
  );
}

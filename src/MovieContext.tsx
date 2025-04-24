import data from "./movies.json";

import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface IsearchMovie {
  searchMovie: string;
  setSearchMovie: React.Dispatch<React.SetStateAction<string>>;
  inputPlaceHolder: string;
  setInputPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  movies: TMovies;
  setMovies: React.Dispatch<React.SetStateAction<TMovies>>;
  toggleBookmark: (id: number) => void;
}

export interface IMovie {
  id: number;
  title: string;
  thumbnail: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  trending: boolean;
  recommended: boolean;
}

export type TMovies = IMovie[];

const movieSearch = createContext<IsearchMovie>({
  searchMovie: "",
  setSearchMovie: () => {},
  inputPlaceHolder: "",
  setInputPlaceholder: () => {},
  movies: [],
  setMovies: () => {},
  toggleBookmark: () => {},
});

export default function MovieContext({
  children,
}: {
  children: ReactNode;
}) {
  const toggleBookmark = (id: number) => {
    const updated = movies.map((m) =>
      m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m
    );
    setMovies(updated);
  };
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [inputPlaceHolder, setInputPlaceholder] = useState<string>(
    "Search for movies or TV series"
  );
  const [movies, setMovies] = useState(data);
  return (
    <div>
      <movieSearch.Provider
        value={{
          searchMovie,
          setSearchMovie,
          inputPlaceHolder,
          setInputPlaceholder,
          movies,
          setMovies,
          toggleBookmark,
        }}
      >
        {children}
      </movieSearch.Provider>
    </div>
  );
}

export const useSearchMovie = () => {
  const context = useContext(movieSearch);
  if (!context) {
    throw new Error(
      "useSearchMovie must be used within a MovieContext"
    );
  }
  return context;
};

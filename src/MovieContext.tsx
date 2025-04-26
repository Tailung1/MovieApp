import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import data from "./movies.json";

interface IsearchMovie {
  searchMovie: string;
  setSearchMovie: React.Dispatch<React.SetStateAction<string>>;
  inputPlaceHolder: string;
  setInputPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  movies: TMovies;
  setMovies: React.Dispatch<React.SetStateAction<TMovies>>;
  originalMovies: TMovies;
  setOriginalMovies: React.Dispatch<React.SetStateAction<TMovies>>;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  direction: string;
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

const movieSearch = createContext<IsearchMovie>({} as IsearchMovie);

export default function MovieContext({
  children,
}: {
  children: ReactNode;
}) {
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [inputPlaceHolder, setInputPlaceholder] = useState<string>(
    "Search for movies or TV series"
  );
  const [movies, setMovies] = useState<TMovies>([]);
  const [originalMovies, setOriginalMovies] = useState<TMovies>([]);
  const [direction, setDirection] = useState<string>("home");

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      const parsed = JSON.parse(storedMovies);
      setMovies(parsed);
      setOriginalMovies(parsed);
    } else {
      localStorage.setItem("movies", JSON.stringify(data));
      setMovies(data);
      setOriginalMovies(data);
    }
  }, []);

  const toggleBookmark = (id: number) => {
    const updated = originalMovies.map((m) =>
      m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m
    );
    setOriginalMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));

    // Also update currently displayed movies
    const updatedDisplayed = movies.map((m) =>
      m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m
    );
    setMovies(updatedDisplayed);
  };

  return (
    <movieSearch.Provider
      value={{
        searchMovie,
        setSearchMovie,
        inputPlaceHolder,
        setInputPlaceholder,
        movies,
        setMovies,
        originalMovies,
        setOriginalMovies,
        direction,
        setDirection,
        toggleBookmark,
      }}
    >
      {children}
    </movieSearch.Provider>
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

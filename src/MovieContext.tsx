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
}

const movieSearch = createContext<IsearchMovie>({
  searchMovie: "",
  setSearchMovie: () => {},
  inputPlaceHolder: "",
  setInputPlaceholder: () => {},
});

export default function MovieContext({
  children,
}: {
  children: ReactNode;
}) {
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [inputPlaceHolder, setInputPlaceholder] = useState<string>(
    "Search for movies or TV series"
  );
  return (
    <div>
      <movieSearch.Provider
        value={{
          searchMovie,
          setSearchMovie,
          inputPlaceHolder,
          setInputPlaceholder,
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

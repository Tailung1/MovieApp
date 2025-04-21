import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface IsearchMovie {
  searchMovie: string;
  setSearchMovie: React.Dispatch<React.SetStateAction<string>>;
}

const movieSearch = createContext<IsearchMovie>({
  searchMovie: "",
  setSearchMovie: () => {},
});

export default function MovieContext({
  children,
}: {
  children: ReactNode;
}) {
  const [searchMovie, setSearchMovie] = useState<string>("");
  return (
    <div>
      <movieSearch.Provider value={{ searchMovie, setSearchMovie }}>
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

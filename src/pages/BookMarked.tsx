import { useSearchMovie } from "../MovieContext";
import { IMovie } from "../MovieContext";

const Bookmarked = () => {
  const { originalMovies, toggleBookmark, searchMovie } =
    useSearchMovie();

  const getFiltered = (category: "movie" | "series") =>
    originalMovies.filter(
      (movie) =>
        movie.isBookmarked &&
        movie.category === category &&
        (!searchMovie ||
          movie.title
            .toLowerCase()
            .includes(searchMovie.toLowerCase()))
    );

  const bookmarkedMovies = getFiltered("movie");
  const bookmarkedSeries = getFiltered("series");

  const MovieCard = (movie: IMovie) => (
    <div
      key={movie.id}
      className='flex flex-col bg-[#161D2F] p-4 rounded-lg shadow-md w-[200px]'
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className='rounded-lg mb-2  h-[120px]'
      />
      <h2 className='text-lg font-semibold truncate text-white'>
        {movie.title}
      </h2>
      <p className='text-sm text-gray-400'>{movie.year}</p>
      <button
        onClick={() => toggleBookmark(movie.id)}
        className='mt-2 bg-[#5A698F] hover:bg-[#FC4747] hover:text-white text-white text-sm px-3 py-1 rounded'
      >
        {"Unbookmark"}
      </button>
    </div>
  );

  const renderSection = (items: IMovie[], label: string) => (
    <section className='p-4'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>
        {items.length > 0
          ? `Bookmarked ${label}`
          : searchMovie && items.length < 1
          ? `No ${label} found for "${searchMovie}"`
          : `No bookmarked ${label.toLowerCase()} yet.`}
      </h2>
      <div className='flex flex-wrap gap-4'>
        {items.map(MovieCard)}
      </div>
    </section>
  );

  return (
    <div className='bg-[#10141E] min-h-screen min-w-[100vw] px-4'>
      {renderSection(bookmarkedMovies, "Movies")}
      {renderSection(bookmarkedSeries, "Series")}
    </div>
  );
};

export default Bookmarked;

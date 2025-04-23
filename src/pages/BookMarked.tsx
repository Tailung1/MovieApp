import { useSearchMovie } from "../MovieContext";
import { IMovie } from "../MovieContext";

const Bookmarked = () => {
  const { movies, toggleBookmark, searchMovie } = useSearchMovie();

  const getFiltered = (category: "movie" | "series") =>
    movies.filter(
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
      className='flex flex-col bg-[#1c2130] p-4 rounded-lg shadow-md w-[200px]'
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className='rounded-lg mb-2 object-cover h-[120px]'
      />
      <h2 className='text-lg font-semibold truncate'>
        {movie.title}
      </h2>
      <p className='text-sm text-gray-400'>{movie.year}</p>
      <button
        onClick={() => toggleBookmark(movie.id)}
        className='mt-2 bg-[#ff5733] hover:bg-yellow-400 hover:text-red-600 text-white text-sm px-3 py-1 rounded'
      >
        {movie.isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );

  const renderSection = (items: IMovie[], label: string) => (
    <section className='p-4'>
      <h2 className='text-2xl font-semibold mb-4'>
        {searchMovie && items.length === 0
          ? `No bookmarked ${label.toLowerCase()} found for "${searchMovie}"`
          : items.length > 0
          ? `Bookmarked ${label}`
          : `No bookmarked ${label.toLowerCase()} yet.`}
      </h2>

      {items.length > 0 ? (
        <div className='flex flex-wrap gap-[15px]'>
          {items.map(MovieCard)}
        </div>
      ) : (
        <p className='text-sm text-gray-400 italic'>
          {searchMovie
            ? `Try searching for a different ${label.toLowerCase()} title.`
            : `Your bookmarked ${label.toLowerCase()} will appear here.`}
        </p>
      )}
    </section>
  );

  return (
    <div className='text-white bg-[#10141E] min-h-screen'>
      {renderSection(bookmarkedMovies, "Movies")}
      {renderSection(bookmarkedSeries, "Series")}
    </div>
  );
};

export default Bookmarked;

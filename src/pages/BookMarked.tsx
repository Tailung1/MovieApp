import { useSearchMovie } from "../MovieContext";
import { IMovie } from "../MovieContext";

const Bookmarked = () => {
  const { movies, toggleBookmark } = useSearchMovie();

  const bookmarkedMovies = movies.filter(
    (movie) => movie.isBookmarked && movie.category === "movie"
  );
  const bookmarkeSeries = movies.filter(
    (movie) => movie.isBookmarked && movie.category === "series"
  );

  return (
    <div
      className={`text-white bg-[#10141E] flex flex-col gap-[30px] ${
        bookmarkedMovies.length > 0 || bookmarkeSeries.length > 0
          ? "m-h-[100vh]"
          : "h-[100vh]"
      }  `}
    >
      <div>
        {bookmarkedMovies.length > 0 ? (
          <h1 className='text-3xl font-semibold p-4'>
            Bookmarked Movies
          </h1>
        ) : (
          <h1 className='text-red-600 text-3xl font-semibold p-4'>
            No bookmarked movies yet.
          </h1>
        )}

        <div className='flex flex-wrap gap-[15px] p-4'>
          {bookmarkedMovies.length > 0 &&
            bookmarkedMovies.map((movie: IMovie) => (
              <div
                key={movie.id}
                className='flex flex-col bg-[#1c2130] p-4 rounded-lg shadow-md w-[200px]'
              >
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className='rounded-lg mb-2'
                />
                <h2 className='text-xl font-semibold'>
                  {movie.title}
                </h2>
                <p>{movie.year}</p>
                <div className='flex justify-between items-center mt-2'>
                  <button
                    onClick={() => toggleBookmark(movie.id)}
                    className='bg-[#ff5733] hover:bg-yellow-400 hover:text-red-600 text-white px-4 py-2 rounded'
                  >
                    {movie.isBookmarked ? "Unbookmark" : "Bookmark"}
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div>
          {bookmarkeSeries.length > 0 ? (
            <h1 className='text-3xl font-semibold p-4'>
              Bookmarked TV series
            </h1>
          ) : (
            <h1 className='text-red-600 text-3xl font-semibold p-4'>
              No bookmarked TV series yet.
            </h1>
          )}

          <div className='flex flex-wrap gap-[15px] p-4'>
            {bookmarkeSeries.length > 0 &&
              bookmarkeSeries.map((movie: IMovie) => (
                <div
                  key={movie.id}
                  className='flex flex-col bg-[#1c2130] p-4 rounded-lg shadow-md w-[200px]'
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className='rounded-lg mb-2'
                  />
                  <h2 className='text-xl font-semibold'>
                    {movie.title}
                  </h2>
                  <p>{movie.year}</p>
                  <div className='flex justify-between items-center mt-2'>
                    <button
                      onClick={() => toggleBookmark(movie.id)}
                      className='bg-[#ff5733] hover:bg-yellow-400 hover:text-red-600 text-white px-4 py-2 rounded'
                    >
                      {movie.isBookmarked ? "Unbookmark" : "Bookmark"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;

import { useSearchMovie } from "../MovieContext";

export default function Input() {
  const { searchMovie, setSearchMovie, inputPlaceHolder } =
    useSearchMovie();
  return (
    <div className='flex gap-[16px] pl-[16px] py-8 bg-[#10141E]'>
      <img src='/search.svg' alt='search icon' />
      <input
        value={searchMovie}
        onChange={(e) => setSearchMovie(e.target.value)}
        placeholder={inputPlaceHolder}
        className='bg-transparent outline-none w-full md:text-[24px] text-red-700 '
        type='text'
      />
    </div>
  );
}

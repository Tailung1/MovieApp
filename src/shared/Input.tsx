import { useSearchMovie } from "../movieContext";


export default function Input() {
    const { setSearchMovie} = useSearchMovie()
  return (
    <div className='flex gap-[16px] pl-[16px] py-8 bg-[#10141E]'>
      <img src='../public/search.svg' alt='search icon' />
      <input
      onChange={(e)=>setSearchMovie(e.target.value)}
        placeholder='Search for movies or TV Series'
        className='bg-transparent outline-none w-full   text-[10px] md:text-lg text-red-700 '
        type='text'
      />
    </div>
  );
}

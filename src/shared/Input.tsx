import { useSearchMovie } from "../MovieContext";


export default function Input() {
    const { setSearchMovie,inputPlaceHolder} = useSearchMovie()
  return (
    <div className='flex gap-[16px] pl-[16px] py-8 bg-[#10141E]'>
      <img src='../public/search.svg' alt='search icon' />
      <input
      onChange={(e)=>setSearchMovie(e.target.value)}
        placeholder={inputPlaceHolder}
        className='bg-transparent outline-none w-full   text-[10px] md:text-lg text-red-700 '
        type='text'
      />
    </div>
  );
}

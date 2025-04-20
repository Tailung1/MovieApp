import { HomeLogo } from "../Icons/Icons";
import { MovieIcon } from "../Icons/Icons";
import { SeriesIcon } from "../Icons/Icons";
import { BookmarkIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate=useNavigate()
  return (
    <header className='bg-[#161D2F] px-4 py-5'>
      <div className='flex justify-between items-center'>
        <img
          className='w-[25px] shrink-0'
          src='../public/Movie.svg'
          alt='Logo'
        />

        <div className='flex gap-4 items-center flex-nowrap overflow-hidden'>
          <HomeLogo navigate={navigate} />
          <MovieIcon navigate={navigate} />
          <SeriesIcon navigate={navigate} />
          <BookmarkIcon navigate={navigate} />
        </div>

        <img
          className='w-[24px] h-[24px] shrink-0'
          src='../public/personIcon.svg'
          alt='User'
        />
      </div>
    </header>
  );
}

import { HomeLogo } from "../Icons/Icons";
import { MovieIcon } from "../Icons/Icons";
import { SeriesIcon } from "../Icons/Icons";
import { BookmarkIcon } from "../Icons/Icons";

export default function Header() {
  return (
    <header className='bg-[#161D2F] px-4 py-5'>
      <div className='flex justify-between items-center'>
        <img
          className='w-[25px] shrink-0'
          src='../public/Movie.svg'
          alt='Logo'
        />

        <div className='flex gap-4 items-center flex-nowrap overflow-hidden'>
          <HomeLogo />
          <MovieIcon />
          <SeriesIcon />
          <BookmarkIcon />
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

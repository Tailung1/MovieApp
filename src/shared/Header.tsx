import { MicrosoftLogo } from "../Icons/Icons";
import { TVIcon } from "../Icons/Icons";
import { MenuIcon } from "../Icons/Icons";
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
          <MicrosoftLogo />
          <TVIcon />
          <MenuIcon />
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

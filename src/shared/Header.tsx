import { MicrosoftLogo } from "../Icons/Icons";
import { TVIcon } from "../Icons/Icons";
import { MenuIcon } from "../Icons/Icons";
import { BookmarkIcon } from "../Icons/Icons";

export default function Header() {
  return (
    <div className='flex justify-around  gap-[60px]  items-center p-5  bg-[#161D2F] '>
      <img className='w-[25px]' src='../public/Movie.svg' />
      <div className='flex gap-5 items-center '>
        <MicrosoftLogo />
        <TVIcon />
        <MenuIcon />
        <BookmarkIcon />
      </div>

      <img src='../public/personIcon.svg' />
    </div>
  );
}

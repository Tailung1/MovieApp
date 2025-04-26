import { HomeLogo } from "../Icons/Icons";
import { MovieIcon } from "../Icons/Icons";
import { SeriesIcon } from "../Icons/Icons";
import { BookmarkIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useSearchMovie } from "../MovieContext";

export default function Header() {
  const navigate = useNavigate();

  const {
    setInputPlaceholder,
    setSearchMovie,
    setDirection,
    direction,
  } = useSearchMovie();
  return (
    <header className='bg-[#161D2F] px-4 py-5'>
      <div className='flex justify-between items-center'>
        <img
          className='w-[25px] shrink-0'
          src='../public/Movie.svg'
          alt='Logo'
        />

        <div className='flex gap-4 h-[40px]  items-center flex-nowrap overflow-hidden'>
          <HomeLogo
            navigate={navigate}
            direction={direction}
            setDirection={setDirection}
            setInputPlaceholder={setInputPlaceholder}
            setSearchMovie={setSearchMovie}
          />
          <MovieIcon
            navigate={navigate}
            direction={direction}
            setDirection={setDirection}
            setInputPlaceholder={setInputPlaceholder}
            setSearchMovie={setSearchMovie}
          />
          <SeriesIcon
            navigate={navigate}
            direction={direction}
            setDirection={setDirection}
            setInputPlaceholder={setInputPlaceholder}
            setSearchMovie={setSearchMovie}
          />
          <BookmarkIcon
            navigate={navigate}
            direction={direction}
            setDirection={setDirection}
            setInputPlaceholder={setInputPlaceholder}
            setSearchMovie={setSearchMovie}
          />
        </div>

        <img
          className='w-[24px] h-[24px] shrink-0'
          src='../src/assets/personIcon.svg'
          alt='User'
        />
      </div>
    </header>
  );
}

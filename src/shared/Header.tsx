import { HomeLogo } from "../Icons/Icons";
import { MovieIcon } from "../Icons/Icons";
import { SeriesIcon } from "../Icons/Icons";
import { BookmarkIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useSearchMovie } from "../MovieContext";

type HeaderProps = {
  className: string;
};

export default function Header() {
  const navigate = useNavigate();

  const {
    setInputPlaceholder,
    setSearchMovie,
    setDirection,
    direction,
  } = useSearchMovie();
  return (
    <header className='md:bg-[#10141E] md:pt-6  md:px-4 '>
      {" "}
      <div className='bg-[#161D2F]  flex justify-between items-center px-4 py-3 md:rounded-lg lg:flex-col'>
        <img
          className='w-[25px] shrink-0'
          src='/Movie.svg'
          alt='Logo'
        />

        <div className='flex gap-4 h-[40px]  items-center  lg:min-h-screen lg:flex-col lg:pt-[65px] lg:w-7'>
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

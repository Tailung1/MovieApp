import React from "react";
import type { NavigateFunction } from "react-router-dom";

type LogoProps = {
  navigate: NavigateFunction;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  setInputPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  setSearchMovie:React.Dispatch<React.SetStateAction<string>>
};

export const HomeLogo = ({
  navigate,
  direction,
  setDirection,
  setInputPlaceholder,
  setSearchMovie,
}: LogoProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      onClick={() => {
        navigate("/home");
        setDirection("home");
        setInputPlaceholder("Search for movies or TV series");
        setSearchMovie("")
      }}
      className={`${
        direction === "home" ? "w-8 h-8" : "w-6 h-6"
      } cursor-pointer transition-all duration-700 ease-in-out`}
    >
      <g transform='translate(4,4)'>
        <path
          d='M0.8 0H6.4C6.88 0 7.2 0.32 7.2 0.8V6.4C7.2 6.88 6.88 7.2 6.4 7.2H0.8C0.32 7.2 0 6.88 0 6.4V0.8C0 0.32 0.32 0 0.8 0ZM0.8 8.8H6.4C6.88 8.8 7.2 9.12 7.2 9.6V15.2C7.2 15.68 6.88 16 6.4 16H0.8C0.32 16 0 15.68 0 15.2V9.6C0 9.12 0.32 8.8 0.8 8.8ZM15.2 0H9.6C9.12 0 8.8 0.32 8.8 0.8V6.4C8.8 6.88 9.12 7.2 9.6 7.2H15.2C15.68 7.2 16 6.88 16 6.4V0.8C16 0.32 15.68 0 15.2 0ZM9.6 8.8H15.2C15.68 8.8 16 9.12 16 9.6V15.2C16 15.68 15.68 16 15.2 16H9.6C9.12 16 8.8 15.68 8.8 15.2V9.6C8.8 9.12 9.12 8.8 9.6 8.8Z'
          fill={`${direction === "home" ? "#fff" : "#5A698F"}`}
        />
      </g>
    </svg>
  );
};

export function MovieIcon({
  navigate,
  direction,
  setDirection,
  setInputPlaceholder,
  setSearchMovie
}: LogoProps) {
  return (
    <svg
      onClick={() => {
        navigate("/movies");
        setDirection("movie");
        setInputPlaceholder("Search for movies");
        setSearchMovie("");
      }}
      className={`${
        direction === "movie" ? "w-8 h-8" : "w-6 h-6"
      } cursor-pointer transition-all duration-700 ease-in-out`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
    >
      <path
        fill={`${direction === "movie" ? "#fff" : "#5A698F"}`}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z'
      />
    </svg>
  );
}

export function SeriesIcon({
  navigate,
  direction,
  setDirection,
  setInputPlaceholder,
  setSearchMovie,
}: LogoProps) {
  return (
    <svg
      onClick={() => {
        navigate("/series");
        setDirection("series");
        setInputPlaceholder("Search for TV series");
        setSearchMovie("");
      }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke={`${direction === "series" ? "#fff" : "#5A698F"}`}
      className={`${
        direction === "series" ? "w-8 h-8" : "w-6 h-6"
      } cursor-pointer transition-all duration-700 ease-in-out`}
    >
      <path
        fill={`${direction === "series" ? "#fff" : "#5A698F"}`}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
      />
    </svg>
  );
}

export function BookmarkIcon({
  navigate,
  direction,
  setDirection,
  setInputPlaceholder,
  setSearchMovie 
}: LogoProps) {
  return (
    <svg
      onClick={() => {
        navigate("/bookMarked");
        setDirection("bookMarked");
        setInputPlaceholder("Search for bookmarked shows");
        setSearchMovie("")
      }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='none'
      className={`${
        direction === "bookMarked" ? "w-8 h-8" : "w-6 h-6"
      } cursor-pointer transition-all duration-700 ease-in-out`}
    >
      <path
        fill={`${direction === "bookMarked" ? "#fff" : "#5A698F"}`}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
      />
    </svg>
  );
}

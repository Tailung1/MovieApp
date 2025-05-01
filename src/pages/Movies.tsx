import SharedMovies from "../shared/SharedMovies";

export default function Movies() {
  return (
    <div className='bg-[#10141E]   flex flex-col'>
      <SharedMovies category={"movie"} title={"Movies"} />
    </div>
  );
}

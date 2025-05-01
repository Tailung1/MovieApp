import SharedMovies from "../shared/SharedMovies";

export default function Series() {
  return (
    <div className='bg-[#10141E] h-[100vh] flex flex-col'>
     <SharedMovies category={"series"} title={"Series"} />
    </div>
  );
}

import SharedMovies from "../shared/SharedMovies";


export default function Movies() {
  return (
    <div className='px-[16px] bg-[#10141E] h-[100vh] flex flex-col'>
     <SharedMovies category={"movie"} title={"Movies"} />
    </div>
  );
}

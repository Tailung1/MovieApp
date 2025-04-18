

export default function Input() {
  return (
    <div className='flex gap-[16px] pl-[16px] py-8 bg-[#10141E]'>
      <img src='../public/search.svg' alt='search icon' />
      <input
        placeholder='Search for movies or TV Series'
        className='bg-transparent outline-none w-full text-[20px] text-red-700 '
        type='text'
      />
    </div>
  );
}

export default function SignUp() {
  return (
    <div className=' flex justify-center items-center bg-[#10141E]  h-[100vh]'>
      <div className='bg-[#161D2F] rounded-[10px] flex flex-col gap-[40px] pt-[24px] pb-[32px] px-[24px]'>
        <h2 className='text-white text-3xl'>Login</h2>
        <form className='flex flex-col gap-[40px]'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <input
                placeholder='Email adress'
                className='  text-orange-400 text-[20px] bg-transparent outline-none focus:outline-none'
                type='text'
              />
              <hr className='h-px bg-[#5A698F] border-none  ' />
            </div>
            <div className='flex flex-col gap-3 '>
              <input
                placeholder='Password'
                className=' text-orange-400 text-[20px] bg-transparent  outline-none focus:outline-none'
                type='text'
              />
              <hr className='h-px bg-[#5A698F] border-none' />
            </div>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <button className=' cursor-pointer w-full px-[67px] py-[14px] rounded-[6px] bg-[#FC4747] text-white'>
              Login to your account
            </button>
            <p className='text-white mr-[12px]'>
              Don’t have an account?{" "}
              <span className='cursor-pointer text-[#FC4747] ml-[5px]'>
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

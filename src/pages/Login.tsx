import { ChangeEvent, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className=' flex justify-center items-center bg-[#10141E]  h-[100vh]'>
      <div className='bg-[#161D2F] rounded-[10px] flex flex-col gap-[40px] pt-[24px] pb-[32px] px-[24px]'>
        <h2 className='text-white text-3xl'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-[40px]'
        >
          <div className='flex flex-col gap-6'>
            <div className=' relative flex flex-col gap-3'>
              <input
                placeholder='Email adress'
                className='  text-orange-400 text-[20px] bg-transparent outline-none focus:outline-none'
                type='text'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <hr className='h-px bg-[#5A698F] border-none  ' />
            </div>
            <div className='relative '>
              <input
                type='password'
                id='email'
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className='w-full bg-transparent text-white text-[20px] outline-none pt-6 pb-2'
              />
              <label
                htmlFor='email'
                className={`absolute left-0 text-[#b4c4db] transition-all duration-300 ${
                  password.length > 0
                    ? "text-[14px] top-0 text-orange-400"
                    : "text-[20px] top-6 "
                }`}
              >
                Password
              </label>
              <hr className='h-px bg-[#5A698F] border-none ' />
            </div>
          </div>
          <div className='flex flex-col items-center gap-[24px]'>
            <button
              type='submit'
              className=' cursor-pointer w-full px-[67px] py-[14px] rounded-[6px] bg-[#FC4747] text-white'
            >
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

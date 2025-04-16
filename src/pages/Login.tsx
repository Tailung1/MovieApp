import {  useState } from "react";
import FloatingInput from "./FloatingInput";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className=' flex  justify-center items-center bg-[#10141E]  h-[100vh]'>
      <div className='bg-[#161D2F] rounded-[10px] flex flex-col gap-[70px] pt-[24px] pb-[32px] px-[24px]'>
        <h2 className='text-violet-500 text-3xl'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-[40px]'
        >
          <div className='flex flex-col gap-11'>
            <FloatingInput
              label='Email adress'
              value={email}
              type='text'
              onChange={(e) => setEmail(e.target.value)}
            />
           <FloatingInput value={password} label="Password" type="text" onChange={(e)=>setPassword(e.target.value)} />
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

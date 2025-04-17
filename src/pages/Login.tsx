import { useState } from "react";
import FloatingInput from "./FloatingInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError(true);
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      navigate("/home");
    } else {
        setError(true);
        return;
    }
  };

  return (
    <div className='flex justify-center items-center bg-[#10141E] h-[100vh]'>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='bg-[#161D2F] relative rounded-[10px] flex flex-col gap-[70px] pt-[24px] pb-[32px] px-[24px]'
      >
        <img
          className='absolute left-[45%] top-[-70px]'
          src='../public/Movie.svg'
          alt='movie icon'
        />
        <h2 className='text-violet-500 text-3xl'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-11'>
            <FloatingInput
              label='Email adress'
              value={email}

              onChange={(e) => setEmail(e.target.value)}
            />
            <FloatingInput
              value={password}
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col relative items-center gap-[24px]'>
            <p className='text-yellow-400 top-[-30px] absolute'>
              {error ? "Incorrect email or password" : ""}
            </p>
            <button
              type='submit'
              className='cursor-pointer w-full px-[67px] py-[14px] rounded-[6px] bg-[#FC4747] text-white'
            >
              Login to your account
            </button>
            <p className='text-white mr-[12px]'>
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className='cursor-pointer text-[#FC4747] ml-[5px]'
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

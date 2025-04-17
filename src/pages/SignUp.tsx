import { useState } from "react";
import FloatingInput from "./FloatingInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 🪄 import motion

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));

    setError("");
    navigate("/");
  };

  return (
    <div className='flex justify-center items-center bg-[#10141E] h-[100vh]'>
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='bg-[#161D2F] relative rounded-[10px] flex flex-col gap-[70px] pt-[24px] pb-[32px] px-[24px]'
      >
        <img
          className='absolute left-[45%] top-[-70px]'
          src='../public/Movie.svg'
          alt='movie icon'
        />
        <h2 className='text-violet-500 text-3xl'>Sign Up</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-11'>
            <FloatingInput
              label='Email address'
              value={email}

              onChange={(e) => setEmail(e.target.value)}
            />
            <FloatingInput
              value={password}
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <FloatingInput
              value={repeatPassword}
              label='Repeat Password'
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col relative items-center gap-[24px]'>
            <p className='text-yellow-400 top-[-30px] absolute'>
              {error}
            </p>
            <button
              type='submit'
              className='cursor-pointer w-full px-[67px] py-[14px] rounded-[6px] bg-[#FC4747] text-white'
            >
              Create your account
            </button>
            <p className='text-white mr-[12px]'>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className='cursor-pointer text-[#FC4747] ml-[5px]'
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

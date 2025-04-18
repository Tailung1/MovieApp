import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

interface inputPropsTypes {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  isClicked: boolean;
}

export default function FloatingInput({
  label,
  value,
  onChange,
  hasError,
  isClicked,
}: inputPropsTypes) {
  const [showPassword, setShowPassword] = useState(false);
  const isRepeatPassword = label.toLowerCase().includes("repeat");
  const isPassword = label.toLowerCase().includes("password");
  const isEmail = label.toLocaleLowerCase().includes("email");

  return (
    <motion.div
      className='relative w-full'
      animate={
        hasError && value.length === 0 ? { x: [0, -8, 8, -8, 0] } : {}
      }
      transition={{ duration: 0.4 }}
    >
      <input
        className={`w-full text-[20px] pl-2 text-white bg-transparent border-b ${
          hasError && value.length < 1
            ? "border-red-500"
            : "border-gray-500"
        } py-2 pr-10 outline-none`}
        type={
          isPassword ? (showPassword ? "text" : "password") : "text"
        }
        value={value}
        onChange={onChange}
      />
      <label
        className={`pointer-events-none   absolute left-2  text-[#b4c4db]  transition-all duration-300 ${
          value.length > 0
            ? "bottom-11 text-[14px] text-orange-500"
            : "bottom-2 text-[18px]"
        }`}
      >
        {label}
      </label>
      {!isRepeatPassword && (
        <p className='absolute text-red-500 text-[16px] top-1/2 right-9 -translate-y-1/2'>
          {value.trim().length === 0 && isClicked
            ? "Can't be empty!"
            : ""}
        </p>
      )}
      {!isRepeatPassword && (
        <p className='absolute text-red-500 text-[14px] top-1/2 right-1 -translate-y-1/2'>
          {isEmail && hasError && isClicked && value.trim().length > 0
            ? "Invalid email"
            : ""}
        </p>
      )}

      {isPassword && (
        <span
          className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
        </span>
      )}
    </motion.div>
  );
}

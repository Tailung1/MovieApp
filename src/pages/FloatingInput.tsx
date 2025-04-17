import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FloatingInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = label.toLowerCase().includes("password");

  return (
    <div className='relative w-full'>
      <input
        className='w-full text-[20px] text-white bg-transparent border-b border-gray-500 py-2 pr-10 outline-none'
        type={
          isPassword ? (showPassword ? "text" : "password") : "text"
        }
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      {isPassword && (
        <span
          className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
        </span>
      )}
    </div>
  );
}

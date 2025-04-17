import { ChangeEvent } from "react";

interface floatinInputProps {
  value: string;
  label: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function FloatingInput({
  label,
  value,
  onChange,
  type,
}: floatinInputProps) {
  return (
    <div className='relative'>
      <label
        className={`absolute left-2  text-[#b4c4db] transition-all duration-300 ${
          value.length > 0
            ? "text-[14px] bottom-9 text-orange-400"
            : "text-[20px] bottom-2"
        }`}
      >
        {label}
      </label>
      <input
        className=' text-[20px] text-white bg-transparent outline-none focus:outline-none'
        type={type}
        onChange={onChange}
      />
      <hr className='h-px bg-[#5A698F] border-none  ' />
    </div>
  );
}

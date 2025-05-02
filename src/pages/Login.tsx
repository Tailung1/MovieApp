import FloatingInput from "./FloatingInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducer } from "react";

type State = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  loginError: boolean;
  isClicked: boolean;
};


type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "VALIDATE" }
  | { type: "SET_LOGIN_ERROR" }
  | { type: "IS_CLICKED" };

const initialState: State = {
  email: "",
  password: "",
  emailError: false,
  passwordError: false,
  loginError: false,
  isClicked: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "VALIDATE":
      const emailError = state.email.trim() === "";
      const passwordError = state.password.trim() === "";
      return { ...state, emailError, passwordError };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_LOGIN_ERROR":
      return { ...state, loginError: true };
    case "IS_CLICKED":
      return { ...state, isClicked: true };
  }
}

export default function SignUp() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "IS_CLICKED" });
    dispatch({ type: "VALIDATE" });

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      dispatch({ type: "SET_LOGIN_ERROR" });
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (
      parsedUser.email === state.email &&
      parsedUser.password === state.password
    ) {
      navigate("/home");
    } else {
      dispatch({ type: "SET_LOGIN_ERROR" });
      return;
    }
  };

  return (
    <div className='flex justify-center items-center px-[10px] bg-[#10141E] h-[100vh]'>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='bg-[#161D2F] relative rounded-[10px] flex flex-col gap-[70px] pt-[24px] pb-[32px] px-[24px]'
      >
        <img
          className='absolute left-[45%] top-[-70px]'
          src='/Movie.svg'
          alt='movie icon'
        />
        <h2 className='text-violet-500 text-3xl'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-[60px]'
        >
          <div className='flex flex-col gap-11'>
            <FloatingInput
              isClicked={state.isClicked}
              label='Email adress'
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_EMAIL",
                  payload: e.target.value,
                })
              }
              hasError={state.emailError}
            />
            <FloatingInput
              isClicked={state.isClicked}
              value={state.password}
              label='Password'
              onChange={(e) =>
                dispatch({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                })
              }
              hasError={state.passwordError}
            />
          </div>
          <div className='flex flex-col relative items-center gap-[24px]'>
            <p className='text-yellow-400 top-[-30px] absolute'>
              {state.loginError &&
              !state.passwordError &&
              !state.emailError
                ? "Incorrect email or password"
                : ""}
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

// import { useState } from "react";
// import FloatingInput from "./FloatingInput";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<boolean>(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const emailIsEmpty = email.trim() === "";
//     const passwordIsEmpty = password.trim() === "";

//     setEmailError(emailIsEmpty);
//     setPasswordError(passwordIsEmpty);
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       setError(true);
//       return;
//     }
//     const parsedUser = JSON.parse(storedUser);
//     if (
//       parsedUser.email === email &&
//       parsedUser.password === password
//     ) {
//       navigate("/home");
//     } else {
//       setError(true);
//       return;
//     }
//   };

//   return (
//     <div className='flex justify-center items-center bg-[#10141E] h-[100vh]'>
//       <motion.div
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className='bg-[#161D2F] relative rounded-[10px] flex flex-col gap-[70px] pt-[24px] pb-[32px] px-[24px]'
//       >
//         <img
//           className='absolute left-[45%] top-[-70px]'
//           src='../public/Movie.svg'
//           alt='movie icon'
//         />
//         <h2 className='text-violet-500 text-3xl'>Login</h2>
//         <form
//           onSubmit={handleSubmit}
//           className='flex flex-col gap-[60px]'
//         >
//           <div className='flex flex-col gap-11'>
//             <FloatingInput
//               label='Email adress'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               hasError={emailError}
//             />
//             <FloatingInput
//               value={password}
//               label='Password'
//               onChange={(e) => setPassword(e.target.value)}
//               hasError={passwordError}
//             />
//           </div>
//           <div className='flex flex-col relative items-center gap-[24px]'>
//             <p className='text-yellow-400 top-[-30px] absolute'>
//               {error && !passwordError && !emailError
//                 ? "Incorrect email or password"
//                 : ""}
//             </p>
//             <button
//               type='submit'
//               className='cursor-pointer w-full px-[67px] py-[14px] rounded-[6px] bg-[#FC4747] text-white'
//             >
//               Login to your account
//             </button>
//             <p className='text-white mr-[12px]'>
//               Don’t have an account?{" "}
//               <span
//                 onClick={() => navigate("/signup")}
//                 className='cursor-pointer text-[#FC4747] ml-[5px]'
//               >
//                 Sign Up
//               </span>
//             </p>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

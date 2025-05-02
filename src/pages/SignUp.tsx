import FloatingInput from "./FloatingInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducer } from "react";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
interface initialStateTypes {
  email: string;
  password: string;
  repeatPassword: string;
  error: string;
  emailError: boolean;
  passwordError: boolean;
  repeatPasswordError: boolean;
  allFill: boolean;
  isClicked: boolean;
}

const initialState: initialStateTypes = {
  email: "",
  password: "",
  repeatPassword: "",
  error: "",
  emailError: false,
  passwordError: false,
  repeatPasswordError: false,
  allFill: false,
  isClicked: false,
};

type Actions =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_EMAIL_ERROR" }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_REPEATPASSWORD"; payload: string }
  | { type: "ALL_FILL" }
  | { type: "PASSWORDSMATCHES" }
  | { type: "IS_CLICKED" };

function reducer(state: initialStateTypes, action: Actions) {
  switch (action.type) {
    case "SET_EMAIL":
      const emailIsValid = emailRegex.test(action.payload);
      return {
        ...state,
        email: action.payload,
        emailError: state.isClicked ? !emailIsValid : false, // Only show error if user already submitted
      };

    case "SET_EMAIL_ERROR":
      return { ...state, emailError: true };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_REPEATPASSWORD":
      return { ...state, repeatPassword: action.payload };
    case "ALL_FILL":
      const emailIsFilled = state.email.trim() === "";
      const passwordIsFilled = state.password.trim() === "";
      const repeatPasswordIsFilled =
        state.repeatPassword.trim() === "";
      return {
        ...state,
        emailError: emailIsFilled,
        passwordError: passwordIsFilled,
        repeatPasswordError: repeatPasswordIsFilled,
      };

    case "PASSWORDSMATCHES":
      const passwordMatches = state.password !== state.repeatPassword;
      return {
        ...state,
        repeatPasswordError: passwordMatches,
        error: "Passwords do not match.",
      };
    case "IS_CLICKED":
      return { ...state, isClicked: true };
  }
}

export default function SignUp() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "IS_CLICKED" });
    const emailIsEmpty = state.email.trim() === "";
    const passwordIsEmpty = state.password.trim() === "";
    const repeatPasswordIsEmpty = state.repeatPassword.trim() === "";

    const passwordMismatch = state.password !== state.repeatPassword;

    if (
      emailIsEmpty ||
      passwordIsEmpty ||
      repeatPasswordIsEmpty ||
      passwordMismatch
    ) {
      dispatch({
        type: "ALL_FILL",
      });

      if (passwordMismatch) {
        dispatch({ type: "PASSWORDSMATCHES" });
      }

      return;
    }
    if (!emailRegex.test(state.email)) {
      dispatch({ type: "SET_EMAIL_ERROR" });
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: state.email,
        password: state.password,
      })
    );

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
          src='/Movie.svg'
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
              value={state.email}
              hasError={state.emailError}
              isClicked={state.isClicked}
              onChange={(e) =>
                dispatch({
                  type: "SET_EMAIL",
                  payload: e.target.value,
                })
              }
            />
            <FloatingInput
              value={state.password}
              isClicked={state.isClicked}
              label='Password'
              onChange={(e) =>
                dispatch({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                })
              }
              hasError={state.passwordError}
            />
            <FloatingInput
              value={state.repeatPassword}
              label='Repeat Password'
              isClicked={state.isClicked}
              onChange={(e) =>
                dispatch({
                  type: "SET_REPEATPASSWORD",
                  payload: e.target.value,
                })
              }
              hasError={state.repeatPasswordError}
            />
          </div>
          <div className='flex flex-col relative items-center gap-[24px]'>
            <p className='text-yellow-400 top-[-30px] absolute'>
              {state.error}
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

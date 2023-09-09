import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate.js";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data i.e. Username, Email and Password.

    const message = checkValidData(
      name.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    // If form data is Valid -> Sign In/ Sign Up Logic
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Background Image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md"
      >
        {/* Change the type to Email Later */}
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "SignUp"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 opacity-75 rounded-md"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 opacity-75 rounded-md"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 opacity-75 rounded-md"
        />

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className="p-4 my-6 w-full bg-red-700 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered ? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;

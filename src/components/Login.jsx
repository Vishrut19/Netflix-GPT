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
        className="absolute left-0 right-0 w-3/12 p-12 mx-auto text-white bg-black rounded-md my-36 bg-opacity-80"
      >
        {/* Change the type to Email Later */}
        <h1 className="py-4 text-3xl font-bold">
          {isSignInForm ? "Sign In" : "SignUp"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="w-full p-4 my-4 bg-gray-700 rounded-md opacity-75"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="w-full p-4 my-4 bg-gray-700 rounded-md opacity-75"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="w-full p-4 my-4 bg-gray-700 rounded-md opacity-75"
        />

        <p className="py-2 text-lg font-bold text-red-500">{errorMessage}</p>

        <button
          className="w-full p-4 my-6 bg-red-700 rounded-lg"
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

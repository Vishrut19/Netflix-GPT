import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data i.e. Username, Email and Password.

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return; //If message is present that means the user has entered invalid data so return.

    // Sign In/ Sign Up Logic
    if (!isSignInForm) {
      //* SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/53470896?v=4",
          })
            .then(() => {
              //* If user is Signed Up successfully navigate it to Browse page
              const { uid, email, displayName, photoURL } = auth.currentUser; //This user will have updated value i.e. Latest Value from the Redux Store.
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        //TODO: Improve Error Message for Sign In
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //* SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          //* If user is Signed In successfully navigate it to Browse page
          navigate("/browse");
        })
        //TODO: Improve Error Message for Sign Up
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
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
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-4 my-4 bg-gray-700 rounded-md opacity-75"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full p-4 my-4 bg-gray-700 rounded-md opacity-75"
        />
        <input
          ref={password}
          type="password"
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

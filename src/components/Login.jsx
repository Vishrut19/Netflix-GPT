import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE_URL, USER_AVATAR } from "../utils/constants";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import GoogleIcon from "./ui/GoogleIcon";

// Initialize Google Auth Provider once
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = async () => {
    // Validate the form data i.e. Username, Email and Password.
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return; //If message is present that means the user has entered invalid data so return.

    setIsLoading(true);

    try {
      if (!isSignInForm) {
        //* SignUp Logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVATAR,
        });

        //* If user is Signed Up successfully navigate it to Browse page
        //! This fixes a BUG where the user name and image doesn't update.
        const {
          uid,
          email: userEmail,
          displayName,
          photoURL,
        } = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: userEmail,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        //* SignIn Logic
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Provide cleaner error messages
      if (errorCode === "auth/invalid-credential") {
        setErrorMessage("Invalid email or password.");
      } else if (errorCode === "auth/email-already-in-use") {
        setErrorMessage("Email is already registered.");
      } else {
        setErrorMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User signed in successfully
      // The Header component's onAuthStateChanged will handle Redux update and navigation
      const user = result.user;
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle specific error cases
      if (errorCode === "auth/operation-not-allowed") {
        setErrorMessage(
          "Google Sign-In is not enabled. Please enable it in Firebase Console: Authentication > Sign-in method > Google"
        );
      } else if (errorCode === "auth/popup-closed-by-user") {
        setErrorMessage("Sign-in popup was closed. Please try again.");
      } else if (errorCode === "auth/popup-blocked") {
        setErrorMessage(
          "Popup was blocked. Please allow popups for this site."
        );
      } else if (errorCode === "auth/cancelled-popup-request") {
        // User cancelled, don't show error
        setErrorMessage(null);
      } else {
        setErrorMessage(`Google sign-in failed: ${errorMessage}`);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-black font-sans text-white">
      {/* Auth Redirect Logic & Logo */}
      <Header />

      {/* LEFT SIDE: Marketing/Image (Hidden on mobile) */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover"
            src={BACKGROUND_IMAGE_URL}
            alt="Cinematic Background"
          />
          {/* Heavy gradient overlay to hide specific movies and look "SaaS" */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay" />
        </div>

        {/* Marketing Copy */}
        <div className="relative z-10 flex h-full flex-col justify-end p-16">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed text-gray-200">
              "This AI recommendation engine completely changed how I discover
              content. No more scrolling for hours—just ASK and watch."
            </p>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 pt-24 sm:px-6 sm:py-12 sm:pt-28 lg:flex-none lg:px-20 lg:pt-12 xl:px-24 bg-black">
        <div className="w-full max-w-sm space-y-6 sm:space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isSignInForm ? "Welcome back" : "Create an account"}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {isSignInForm
                ? "Enter your details to access your personalized feed."
                : "Join thousands of users discovering movies with AI."}
            </p>
          </div>

          <form
            className="mt-6 sm:mt-8 space-y-5 sm:space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-3 sm:space-y-4">
              {!isSignInForm && (
                <div className="space-y-1">
                  <Input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    icon={User}
                    className="bg-gray-900 border-gray-800 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
              )}

              <div className="space-y-1">
                <Input
                  ref={email}
                  type="email"
                  placeholder="name@example.com"
                  icon={Mail}
                  className="bg-gray-900 border-gray-800 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-1 relative">
                <Input
                  ref={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  icon={Lock}
                  className="bg-gray-900 border-gray-800 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded-md bg-red-900/30 p-3 text-sm text-red-400 border border-red-900/50">
                <AlertCircle size={16} />
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-purple-500 hover:text-purple-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-4 sm:py-6 text-sm sm:text-base shadow-lg shadow-purple-900/20"
              onClick={handleButtonClick}
              isLoading={isLoading}
              size="lg"
            >
              {isSignInForm ? "Sign in" : "Create account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="flex w-full items-center justify-center gap-2 sm:gap-3 rounded-lg border border-gray-700 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200 hover:border-gray-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isGoogleLoading ? (
                  <>
                    <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    <span className="whitespace-nowrap">Signing in...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="whitespace-nowrap">
                      Sign In with Google
                    </span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 sm:mt-2 text-center text-xs sm:text-sm text-gray-500">
              {isSignInForm ? (
                <>
                  Not a member?{" "}
                  <button
                    onClick={toggleSignInForm}
                    className="font-semibold leading-6 text-purple-500 hover:text-purple-400"
                  >
                    Start a 14 day free trial
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleSignInForm}
                    className="font-semibold leading-6 text-purple-500 hover:text-purple-400"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE_URL, USER_AVATAR } from "../utils/constants";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        const { uid, email: userEmail, displayName, photoURL } = auth.currentUser;
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
      if (errorCode === 'auth/invalid-credential') {
        setErrorMessage("Invalid email or password.");
      } else if (errorCode === 'auth/email-already-in-use') {
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
              "This AI recommendation engine completely changed how I discover content. 
              No more scrolling for hours—just ASK and watch."
            </p>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-black">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              {isSignInForm ? "Welcome back" : "Create an account"}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {isSignInForm 
                ? "Enter your details to access your personalized feed." 
                : "Join thousands of users discovering movies with AI."}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-500 hover:text-purple-400">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-6 text-base shadow-lg shadow-purple-900/20"
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
                <span className="bg-black px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

             <div className="mt-6 grid grid-cols-2 gap-3">
               {/* Placeholder Social Buttons */}
                <button className="flex w-full items-center justify-center rounded-md border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 transition-colors">
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.2-3.293 2.253-2.253 3-5.64 3-8.1 0-.573-.053-1.147-.137-1.68h-11.063z" fill="currentColor"/></svg>
                </button>
                <button className="flex w-full items-center justify-center rounded-md border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-800 transition-colors">
                  <span className="sr-only">Sign in with GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.981 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.707 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </button>
             </div>

            <p className="mt-2 text-center text-sm text-gray-500">
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

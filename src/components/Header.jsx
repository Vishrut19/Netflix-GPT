import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Button } from "./ui/Button";
import { Sparkles, Home, LogOut, Globe, User, ChevronDown } from "lucide-react";

import Logo from "./ui/Logo";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);

  const isLoginPage = location.pathname === "/";

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (isLoginPage) navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  // Don't render the navbar on login page
  if (isLoginPage) {
    return (
      <div className="absolute z-20 w-full px-8 py-6">
        <Logo size="xl" />
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        {/* Header Title Area (Empty as requested) */}
        <div className="flex items-center gap-4">
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleGptSearchClick}
            variant="default"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border-none shadow-lg shadow-indigo-500/20 px-6"
          >
            {showGptSearch ? (
              <>
                <Home size={18} />
                <span>Home Dashboard</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Ask AI Assistant</span>
              </>
            )}
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="hidden lg:flex flex-col items-end mr-1">
              <span className="text-sm font-semibold text-white leading-tight">
                {user?.displayName || "User"}
              </span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-1.5 py-0.5 rounded italic">
                Pro Member
              </span>
            </div>
            
            <div className="relative group">
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600/50 p-0.5 transition-transform group-hover:scale-105">
                {user?.photoURL ? (
                  <img className="w-full h-full rounded-full object-cover" src={user?.photoURL} alt="User" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-gray-950">
                    {user?.displayName?.charAt(0) || <User size={16} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

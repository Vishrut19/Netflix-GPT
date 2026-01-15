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
      <div className="absolute z-20 w-full px-8 py-4">
        <img 
          className="w-52 md:w-64 cursor-pointer" 
          src={LOGO} 
          alt="MediaRecs AI Logo"
        />
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <img 
            className="w-48 md:w-56 cursor-pointer transition-transform hover:scale-105" 
            src={LOGO} 
            alt="MediaRecs AI Logo"
            onClick={() => navigate("/browse")}
          />
        </div>

        {/* Right Section */}
        {user && (
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            {showGptSearch && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900/70 transition-colors">
                <Globe size={16} className="text-gray-400" />
                <select
                  className="bg-transparent text-sm text-white focus:outline-none cursor-pointer pr-1"
                  onChange={handleLanguageChange}
                  value={langKey}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier} className="bg-gray-900">
                      {lang.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            )}

            {/* AI Search Toggle Button */}
            <Button
              variant={showGptSearch ? "outline" : "default"}
              size="sm"
              onClick={handleGptSearchClick}
              className={`flex items-center gap-2 ${
                !showGptSearch 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none shadow-lg shadow-purple-900/20" 
                  : "border-gray-700 hover:bg-gray-900"
              }`}
            >
              {showGptSearch ? (
                <>
                  <Home size={16} />
                  <span className="hidden md:inline">Home</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span className="hidden md:inline">Ask AI</span>
                </>
              )}
            </Button>

            {/* User Profile Section */}
            <div className="flex items-center gap-3 pl-3 ml-3 border-l border-white/10">
              {/* User Info - Desktop Only */}
              <div className="hidden lg:flex flex-col items-end text-right">
                <span className="text-sm font-semibold text-white truncate max-w-[120px]">
                  {user?.displayName || "User"}
                </span>
                <span className="text-xs text-gray-400">Premium</span>
              </div>
              
              {/* Avatar */}
              {user?.photoURL ? (
                <img
                  className="w-9 h-9 rounded-full border-2 border-purple-500/50 object-cover cursor-pointer hover:border-purple-500 transition-colors"
                  src={user?.photoURL}
                  alt="User profile"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center border border-purple-500/50 cursor-pointer">
                  <User size={18} className="text-white" />
                </div>
              )}

              {/* Sign Out Button */}
              <button 
                onClick={handleSignOut} 
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all group"
                title="Sign Out"
              >
                <LogOut size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

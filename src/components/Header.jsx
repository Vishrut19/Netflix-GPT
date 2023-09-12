import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // User is signed in
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
        //* If the user is Logged In, then redirect to Browse Page.
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        //* If the user is Not logged In, then redirect to Login/Home Page.
        navigate("/");
      }
    });

    // This will be called when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute z-10 flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-44" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12" src={user?.photoURL} alt="User Icon" />
          <p className="py-4 ml-2 font-bold text-white">{user?.displayName}</p>
          <button onClick={handleSignOut} className="mx-2 font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

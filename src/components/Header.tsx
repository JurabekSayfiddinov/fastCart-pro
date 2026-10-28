import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Sun, Moon, UserRound, LogOut, ShoppingBag } from "lucide-react";
import Logo from "../images/Group 1116606595.png"
import { useTheme } from "../Context/Theme";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useEffect, useRef, useState } from "react";
import { logout } from "../Log/logSlice";
export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const  isAuthenticated  = useSelector(
  (state: RootState) => state.auth.isAuthenticated
);
const navigate = useNavigate();
const dispatch = useDispatch();

const [openProfile, setOpenProfile] = useState(false);

const profileRef = useRef<HTMLDivElement>(null);



const handleLogout = () => {
  dispatch(logout());
  setOpenProfile(false);
  navigate("/login");
};

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setOpenProfile(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
  return (
    <header  className={`
    w-full h-[56px] border-b
    transition-colors duration-300
    ${
      darkMode
        ? "bg-[#111827] text-white border-gray-700"
        : "bg-white text-black border-gray-200"
    }
  `}>
      <div className="max-w-[984px] mx-auto h-full flex items-center justify-between">


        <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="" />
        </Link>

     
        <nav  className={`flex items-center gap-7 text-[14px] ${
    darkMode ? "text-white" : "text-black"
  }`}>
          <Link to="/" className="hover:text-orange-500">
            Home
          </Link>

          <Link to="/contact" className="hover:text-orange-500">
            Contact
          </Link>

          <Link to="/about" className="hover:text-orange-500">
            About
          </Link>

          <Link
            to="/signup"
            className=" hover:text-orange-500"
          >
            Sign Up
          </Link>
        </nav>


        <div className="flex items-center gap-6">


        <div
  className={`w-[203px] h-[32px] rounded flex items-center justify-between px-4 ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-[#F5F5F5] text-black"
  }`}
>
  <input
    type="text"
    placeholder="What are you looking for?"
    className={`w-full bg-transparent outline-none text-[11px] ${
      darkMode
        ? "text-white placeholder:text-gray-400"
        : "text-black placeholder:text-gray-500"
    }`}
  />

  <Search size={20} strokeWidth={1.7} />
</div>


          <Link to="/wishlist" aria-label="Wishlist">
            <Heart
              size={24}
              strokeWidth={1.7}
              className="hover:text-orange-500"
            />
          </Link>

      
          <Link to="/cart" className="relative" aria-label="Shopping cart">
            <ShoppingCart className="hover:text-orange-500" size={24} strokeWidth={1.7} />
          </Link>

          <button
  type="button"
  onClick={toggleTheme}
  aria-label={darkMode ? "Light mode" : "Dark mode"}
  className={`
    w-9 h-9 rounded-full
    flex items-center justify-center
    transition-colors
    ${
      darkMode
        ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `}
>
  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>

{isAuthenticated && (
  <div className="relative" ref={profileRef}>

   
    <button
      type="button"
      onClick={() => setOpenProfile(!openProfile)}
      aria-label="Profile menu"
      aria-expanded={openProfile}
      className="w-[38px] h-[38px] bg-[#DB4444] text-white rounded-full flex items-center justify-center hover:bg-[#c73535] transition-colors"
    >
      <UserRound size={23} strokeWidth={1.8} />
    </button>


    {openProfile && (
      <div
        className="
          absolute right-0 top-[50px] z-50
          w-[225px]
          rounded-lg
          bg-gradient-to-b
          from-[#555555]/95
          via-[#222222]/95
          to-black/95
          backdrop-blur-xl
          shadow-2xl
          p-4
          text-white
        "
      >

      
        <Link
          to="/account"
          onClick={() => setOpenProfile(false)}
          className="flex items-center gap-4 px-2 py-3 hover:bg-white/10 rounded-md transition-colors"
        >
          <UserRound size={25} strokeWidth={1.7} />
          <span className="text-[16px]">
            Account
          </span>
        </Link>

   
        <Link
          to="/orders"
          onClick={() => setOpenProfile(false)}
          className="flex items-center gap-4 px-2 py-3 hover:bg-white/10 rounded-md transition-colors"
        >
          <ShoppingBag size={25} strokeWidth={1.7} />
          <span className="text-[16px]">
            My Order
          </span>
        </Link>

    
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-2 py-3 hover:bg-white/10 rounded-md transition-colors text-left"
        >
          <LogOut size={25} strokeWidth={1.7} />
          <span className="text-[16px]">
            Logout
          </span>
        </button>

      </div>
    )}

  </div>
)}


        </div>
      </div>
    </header>
  );
}
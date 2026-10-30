
import { Link } from "react-router-dom";
import { Send } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { useTheme } from "../Context/Theme";

export default function Footer() {
  const { darkMode } = useTheme();
  return (
   <footer
  className={`
    w-full transition-colors duration-300 mt-[100px]
    ${
      darkMode
        ? "bg-[#080D18] text-white"
        : "bg-[#F3F4F6] text-gray-900"
    }
  `}
>

      <div className="max-w-[984px] mx-auto px-4 pt-[48px] pb-[40px]">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

       
          <div>
            <h2 className="text-[20px] font-semibold mb-4">
              Exclusive
            </h2>

            <h3 className="text-[16px] font-medium mb-3">
              Subscribe
            </h3>

            <p className="text-[12px] mb-3">
              Get 10% off your first order
            </p>

            <div className="flex items-center border border-white rounded-[3px] h-[36px] px-2">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Subscribe email"
                className="bg-transparent w-full min-w-0 text-[11px] outline-none placeholder:text-gray-500"
              />

              <button
                type="button"
                disabled
                aria-label="Subscribe"
                title="Subscription is not connected yet"
                className="ml-2 disabled:opacity-60"
              >
                <Send size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

     
          <div>
            <h3 className="text-[16px] font-medium mb-4">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-[12px]">
              <p>
                111 Bijoy sarani, Dhaka,
                DH 1515, Bangladesh.
              </p>

              <p>exclusive@gmail.com</p>

              <p>+88015-88888-9999</p>
            </div>
          </div>

   
          <div>
            <h3 className="text-[16px] font-medium mb-4">
              Account
            </h3>

            <div className="flex flex-col gap-3 text-[12px]">
              <Link to="/account" className="hover:text-gray-400">
                My Account
              </Link>

              <Link to="/cart" className="hover:text-gray-400">
                Cart
              </Link>

              <Link to="/wishlist" className="hover:text-gray-400">
                Wishlist
              </Link>

              <Link to="/" className="hover:text-gray-400">
                Shop
              </Link>
            </div>
          </div>

  
          <div>
            <h3 className="text-[16px] font-medium mb-4">
              Quick Link
            </h3>

            <div className="flex flex-col gap-3 text-[12px]">
              <Link to="/privacy" className="hover:text-gray-400">
                Privacy Policy
              </Link>

              <Link to="/terms" className="hover:text-gray-400">
                Terms Of Use
              </Link>

              <Link to="/faq" className="hover:text-gray-400">
                FAQ
              </Link>

              <Link to="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </div>
          </div>


        <div>
  <h3 className="text-[16px] font-medium mb-4">
    Social
  </h3>

  <div className="flex items-center gap-4">
    <FaFacebookF
      size={17}
      className="cursor-pointer hover:text-gray-400"
    />

    <FaXTwitter
      size={17}
      className="cursor-pointer hover:text-gray-400"
    />

    <FaInstagram
      size={17}
      className="cursor-pointer hover:text-gray-400"
    />

    <FaLinkedinIn
      size={17}
      className="cursor-pointer hover:text-gray-400"
    />
  </div>
</div>
  

        </div>
      </div>

  
      <div className="border-t border-[#262626] py-4">
        <p className="text-center text-[#555555] text-[12px]">
          © Copyright FastCart 2026. All rights reserved
        </p>
      </div>

    </footer>
  );
}

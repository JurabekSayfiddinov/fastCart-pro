import { Link } from "react-router-dom";

import playstation from "../images/ps5-slim-goedkope-playstation_large 1.png";
import women from "../images/attractive-woman-wearing-hat-posing-black-background 1.png";
import speakers from "../images/Frame 707.png";
import perfume from "../images/Frame 706.png";



export default function NewArrival() {
  return (
    <section className="max-w-[1170px] mx-auto px-4 mt-[100px]">


      <div className="flex items-center gap-4">
        <div className="w-[20px] h-[40px] bg-[#DB4444] rounded" />

        <span className="text-[#DB4444] font-semibold">
          Featured
        </span>
      </div>

      <h2 className="text-[36px] font-semibold mt-5 mb-10">
        New Arrival
      </h2>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">


        <div className="relative bg-black h-[600px] rounded overflow-hidden">

          <img
            src={playstation}
            alt="PlayStation 5"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%] object-contain"
          />

          <div className="absolute bottom-8 left-8 text-white z-10">
            <h3 className="text-[24px] font-semibold">
              PlayStation 5
            </h3>

            <p className="text-[14px] mt-3 max-w-[250px]">
              Black and White version of the PS5 coming out on sale.
            </p>

            <Link
              to="/products"
              className="inline-block mt-4 border-b border-white pb-1"
            >
              Shop Now
            </Link>
          </div>

        </div>

     
        <div className="grid grid-rows-2 gap-[30px]">

       
          <div className="relative bg-[#0D0D0D] h-[285px] rounded overflow-hidden">

            <img
              src={women}
              alt="Women's Collections"
              className="absolute right-0 bottom-0 h-full w-[65%] object-contain object-bottom"
            />

            <div className="absolute bottom-6 left-6 text-white z-10">
              <h3 className="text-[24px] font-semibold">
                Women's Collections
              </h3>

              <p className="text-[14px] mt-2 max-w-[230px]">
                Featured woman collections that give you another vibe.
              </p>

              <Link
                to="/products"
                className="inline-block mt-3 border-b border-white pb-1"
              >
                Shop Now
              </Link>
            </div>

          </div>

         
          <div className="grid grid-cols-2 gap-[30px]">

        
            <div className="relative bg-[#171717] h-[285px] rounded overflow-hidden">

              <img
                src={speakers}
                alt="Speakers"
                className="absolute inset-0 w-full h-full object-contain"
              />

              <div className="absolute bottom-5 left-5 text-white z-10">
                <h3 className="text-[24px] font-semibold">
                  Speakers
                </h3>

                <p className="text-[13px] mt-1">
                  Amazon wireless speakers
                </p>

                <Link
                  to="/products"
                  className="inline-block mt-2 border-b border-white pb-1 text-[14px]"
                >
                  Shop Now
                </Link>
              </div>

            </div>


            <div className="relative bg-[#171717] h-[285px] rounded overflow-hidden">

              <img
                src={perfume}
                alt="Perfume"
                className="absolute inset-0 w-full h-full object-contain"
              />

              <div className="absolute bottom-5 left-5 text-white z-10">
                <h3 className="text-[24px] font-semibold">
                  Perfume
                </h3>

                <p className="text-[13px] mt-1">
                  GUCCI INTENSE OUD EDP
                </p>

                <Link
                  to="/products"
                  className="inline-block mt-2 border-b border-white pb-1 text-[14px]"
                >
                  Shop Now
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
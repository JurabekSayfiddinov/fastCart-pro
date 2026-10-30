import { Link } from "react-router-dom";
import {
  Store,
  DollarSign,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";



import storyImage from "../images/Side Image (1).png";
import team1 from "../images/Frame 874 (1).png";
import team2 from "../images/Frame 875 (1).png";
import team3 from "../images/Frame 876 (1).png";

const statistics = [
  {
    id: 1,
    icon: Store,
    number: "10.5k",
    title: "Sellers active on our site",
  },
  {
    id: 2,
    icon: DollarSign,
    number: "33k",
    title: "Monthly Product Sale",
  },
  {
    id: 3,
    icon: ShoppingBag,
    number: "45.5k",
    title: "Customer active on our site",
  },
  {
    id: 4,
    icon: Wallet,
    number: "25k",
    title: "Annual gross sale on our site",
  },
];

const team = [
  {
    id: 1,
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: team1,
  },
  {
    id: 2,
    name: "Emma Watson",
    position: "Managing Director",
    image: team2,
  },
  {
    id: 3,
    name: "Will Smith",
    position: "Product Designer",
    image: team3,
  },
];

export default function About() {
  return (
    <main>


      <div className="max-w-[1170px] mx-auto px-4 pt-[70px]">

        <div className="flex items-center gap-3 text-[14px]">
          <Link
            to="/"
            className="text-gray-400 hover:text-[#DB4444]"
          >
            Home
          </Link>

          <span>/</span>

          <span>About</span>
        </div>

      </div>

   
      <section className="max-w-[1170px] mx-auto px-4 mt-[80px]">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[75px] items-center">

      
          <div>

            <h1 className="text-[54px] font-semibold tracking-wide mb-8">
              Our Story
            </h1>

            <p className="text-[16px] leading-[26px] mb-6">
              Launched in 2015, Exclusive is South Asia’s premier
              online shopping marketplace with an active presence
              in Bangladesh. Supported by a wide range of tailored
              marketing, data and service solutions, Exclusive has
              10,500 sellers and 300 brands and serves 3 millions
              customers across the region.
            </p>

            <p className="text-[16px] leading-[26px]">
              Exclusive has more than 1 Million products to offer,
              growing at a very fast. Exclusive offers a diverse
              assortment in categories ranging from consumer.
            </p>

          </div>


          <div className="w-full">

            <img
              src={storyImage}
              alt="People shopping"
              className="w-full h-[430px] object-cover rounded"
            />

          </div>

        </div>

      </section>

  
      <section className="max-w-[1170px] mx-auto px-4 mt-[140px]">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">

          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="
                  group
                  h-[230px]
                  border border-gray-300
                  rounded
                  flex flex-col
                  items-center justify-center
                  hover:bg-[#DB4444]
                  hover:border-[#DB4444]
                  hover:text-white
                  hover:shadow-xl
                  transition-all duration-300
                "
              >

          
                <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center">

                  <div className="w-[58px] h-[58px] rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black">

                    <Icon
                      size={30}
                      strokeWidth={1.7}
                    />

                  </div>

                </div>

             
                <h2 className="text-[32px] font-bold mt-5">
                  {item.number}
                </h2>

             
                <p className="text-[14px] text-center mt-2 px-3">
                  {item.title}
                </p>

              </div>
            );
          })}

        </div>

      </section>

     
      <section className="max-w-[1170px] mx-auto px-4 mt-[140px]">

        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="about-team-swiper pb-[55px]"
        >

          {team.map((person) => (
            <SwiperSlide key={person.id}>

              <div>

            
                <div className="h-[430px] bg-[#F5F5F5] rounded overflow-hidden flex items-end justify-center">

                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-contain object-bottom"
                  />

                </div>

   
                <h3 className="text-[30px] font-medium mt-7">
                  {person.name}
                </h3>


                <p className="text-[16px] mt-2">
                  {person.position}
                </p>

         
                <div className="flex items-center gap-4 mt-4">

                  <FaXTwitter
                    size={20}
                    aria-label="Twitter"
                  />

                  <FaInstagram
                    size={20}
                    aria-label="Instagram"
                  />

                  <FaLinkedinIn
                    size={20}
                    aria-label="LinkedIn"
                  />

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>
 
      </section>

    </main>
  );
}
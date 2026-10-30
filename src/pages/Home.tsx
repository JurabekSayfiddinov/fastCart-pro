import React from 'react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { FaApple } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import type { AppDispatch, RootState } from '../app/store';
import { getCategories } from '../components/Category';
import FlashSales from '../components/FlashSales';
import BrowseCategory from '../components/BrowseCategory';
import BestSelling from '../components/BestSelling';
import MusicBanner from '../components/MusicSect';
import ExploreProducts from '../components/ExploreProducts';
import NewArrival from '../components/Arrival';



const slides = [
  {
    id: 1,
    subtitle: "iPhone 14 Series",
    title: "Up to 10%\noff Voucher",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEutxVvoJCvliy-8XfR_4LK0bVX7CjVkIRbqKF6uuODzD0uRfS9E0EDJHC&s=10",
  },
  {
    id: 2,
    subtitle: "iPhone 15 Series",
    title: "Up to 15%\noff Voucher",
    image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed.jpg",
  },
  {
    id: 3,
    subtitle: "iPhone 16 Series",
    title: "Up to 20%\noff Voucher",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmahfMXmoydmIIIHGTvNElJJnZqP3hLf3xNIgpMYGzNw&s=10",
  },
  {
    id: 4,
    subtitle: "Apple Collection",
    title: "Special Offers\nFor You",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKz0JxmQ79jPh0kPBtBewYU2OFsyOQsYzQukIwS_2DyM4yaPtv_HUxwZZD&s=10",
  },
  {
    id: 5,
    subtitle: "New Arrivals",
    title: "Discover New\nProducts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpJsDc_EbXfw8Or_HxdPdM8Xg1MdrtwKwWUXE2ueA5RnxjPUW3JssDw&s=10",
  },
];

const Home = () => {
   const dispatch = useDispatch<AppDispatch>();

  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

 const figmaCategories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronic",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const categoryList = figmaCategories
  .map((name) =>
    categories.find(
      (category: any) =>
        (category.categoryName ?? category.name)
          ?.toLowerCase() === name.toLowerCase()
    )
  )
  .filter(Boolean);

  return (
    <>
     <div className="max-w-[1170px] mx-auto px-4">
      <div className="flex gap-[38px]">

     
        <div className="hidden lg:block w-[230px] shrink-0 border-r border-gray-200 pt-[34px] pr-[16px]">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-[17px]">
              {categoryList.map((category: any) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="flex items-center justify-between text-[15px] hover:text-[#DB4444]"
                >
                  <span>
                    {category.categoryName ?? category.name}
                  </span>

                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          )}
        </div>


        <div className="min-w-0 flex-1 mt-[30px]">

          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="fastcart-swiper w-full h-[330px]"
          >

            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative bg-black w-full h-full overflow-hidden">

          
                  <div className="absolute left-[7%] top-[17%] z-10 text-white">

                    <div className="flex items-center gap-5 mb-5">
                      <FaApple size={40} />

                      <span className="text-[16px]">
                        {slide.subtitle}
                      </span>
                    </div>

                    <h1 className="text-[44px] font-semibold leading-[1.15] whitespace-pre-line">
                      {slide.title}
                    </h1>

                    <Link
                      to="/products"
                      className="inline-flex items-center gap-3 mt-6 text-[16px]"
                    >
                      <span className="border-b border-white pb-1">
                        Shop Now
                      </span>

                      <ArrowRight size={20} />
                    </Link>

                  </div>

                
                  <img
                    src={slide.image}
                    alt={slide.subtitle}
                    className="absolute right-[2%] bottom-0 w-[48%] h-[95%] object-contain"
                  />

                </div>
              </SwiperSlide>
            ))}

          </Swiper>
        </div>

      </div>
    </div>
    <FlashSales/>
    <BrowseCategory/>
    <BestSelling/>
    <MusicBanner/>
    <ExploreProducts/>
    <NewArrival/>
    
    </>
  )
}

export default Home
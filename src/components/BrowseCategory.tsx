import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import type { RootState } from "../app/store";

const categoryIcons = [
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
];

export default function BrowseCategory() {
  const swiperRef = useRef<SwiperType | null>(null);

  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  const categoryList = Array.isArray(categories)
    ? categories
    : [];

  return (
    <section className="max-w-[1170px] mx-auto px-4 mt-[80px]">

      <div className="flex items-center gap-4">
        <div className="w-[20px] h-[40px] bg-[#DB4444] rounded" />

        <span className="text-[#DB4444] font-semibold">
          Categories
        </span>
      </div>

      <div className="flex items-center justify-between mt-5 mb-10">
        <h2 className="text-[36px] font-semibold">
          Browse By Category
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-[46px] h-[46px] bg-[#F5F5F5] text-black rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={22} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-[46px] h-[46px] bg-[#F5F5F5] text-black rounded-full flex items-center justify-center"
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
            1100: { slidesPerView: 6 },
          }}
        >
          {categoryList.map((category: any, index: number) => {
            const Icon = categoryIcons[index % categoryIcons.length];

            return (
              <SwiperSlide key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className="h-[145px] border border-gray-300 rounded flex flex-col items-center justify-center gap-3 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors"
                >
                  <Icon size={42} strokeWidth={1.4} />

                  <span className="text-[14px] text-center">
                    {category.categoryName ?? category.name}
                  </span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="border-b border-gray-200 mt-[70px]" />
    </section>
  );
}
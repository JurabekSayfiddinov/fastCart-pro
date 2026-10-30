import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Eye, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import { addToCart } from "../components/CartSlice";
import type { AppDispatch, RootState } from "../app/store";
import { getProducts } from "../components/Products";
import { Api } from "../utils/Api";
import { toggleWishlist } from "./WishlistSlice";

type Product = {
  id: number;
  productName?: string;
  name?: string;
  price?: number;
  discountPrice?: number;
  image?: string;
};

export default function FlashSales() {

    const [timeLeft, setTimeLeft] = useState(() => {
  const savedEndTime = localStorage.getItem("flashSaleEndTime");

  if (savedEndTime && Number(savedEndTime) > Date.now()) {
    return Number(savedEndTime);
  }

  const endTime = Date.now() + 4 * 24 * 60 * 60 * 1000;

  localStorage.setItem("flashSaleEndTime", String(endTime));

  return endTime;
});

const [remaining, setRemaining] = useState(
  Math.max(0, timeLeft - Date.now())
);

useEffect(() => {
  const timer = setInterval(() => {
    setRemaining(Math.max(0, timeLeft - Date.now()));
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

const hours = Math.floor(
  (remaining / (1000 * 60 * 60)) % 24
);

const minutes = Math.floor(
  (remaining / (1000 * 60)) % 60
);

const seconds = Math.floor(
  (remaining / 1000) % 60
);

const formatTime = (value: number) =>
  String(value).padStart(2, "0");
  const dispatch = useDispatch<AppDispatch>();
  const swiperRef = useRef<SwiperType | null>(null);

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
    
const wishlist = useSelector(
  (state: RootState) => state.wishlist
);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


const productList = Array.isArray(products)
  ? products
  : Array.isArray((products as any)?.data?.products)
    ? (products as any).data.products
    : Array.isArray((products as any)?.data)
      ? (products as any).data
      : Array.isArray((products as any)?.products)
        ? (products as any).products
        : [];
       

  return (
    <section className="max-w-[1170px] mx-auto px-4 mt-[100px]">

  
      <div className="flex items-center gap-4">
        <div className="w-[20px] h-[40px] bg-[#DB4444] rounded" />

        <span className="text-[#DB4444] font-semibold">
          Today's
        </span>
      </div>


    
<div className="flex items-end justify-between gap-6 mt-5 mb-10">

 
  <div className="flex items-end gap-[70px]">

    <h2 className="text-[36px] font-semibold leading-none">
      Flash Sales
    </h2>

  
    <div className="flex items-end gap-4">

      {[
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
      ].map((item, index) => (
        <div
          key={item.label}
          className="flex items-end gap-4"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium">
              {item.label}
            </span>

            <span className="text-[32px] font-bold leading-none tracking-[2px]">
              {formatTime(item.value)}
            </span>
          </div>

          {index !== 3 && (
            <span className="text-[#E07575] text-[28px] font-bold leading-none">
              :
            </span>
          )}
        </div>
      ))}

    </div>
  </div>


  <div className="flex items-center gap-2">

    <button
      type="button"
      onClick={() => swiperRef.current?.slidePrev()}
      aria-label="Previous products"
      className="w-[46px] h-[46px] rounded-full bg-[#F5F5F5] text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
    >
      <ArrowLeft size={22} />
    </button>

    <button
      type="button"
      onClick={() => swiperRef.current?.slideNext()}
      aria-label="Next products"
      className="w-[46px] h-[46px] rounded-full bg-[#F5F5F5] text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
    >
      <ArrowRight size={22} />
    </button>

  </div>

</div>

      {loading ? (
        <p>Loading products...</p>
      ) : productList.length === 0 ? (
        <p>Products not found</p>
      ) : (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1100: { slidesPerView: 4 },
          }}
        >
          {productList.map((product) => (
            <SwiperSlide key={product.id}>

              <div className="group">

                <div className="relative bg-[#F5F5F5] rounded h-[250px] flex items-center justify-center overflow-hidden">

                
                  <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">

                   <button
  type="button"
  onClick={() => dispatch(toggleWishlist({
    id: product.id,
    productName: product.productName ?? product.name ?? "",
    price: product.price ?? 0,
    discountPrice: product.discountPrice ?? 0,
    hasDiscount:
      product.discountPrice != null &&
      product.discountPrice > 0 &&
      product.price != null &&
      product.discountPrice < product.price,
    image: product.image ?? "",
  }))}
  aria-label="Toggle wishlist"
  className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center text-black"
>
  <Heart
    size={19}
    fill={
      wishlist.some((item) => item.id === product.id)
        ? "#DB4444"
        : "none"
    }
    className={
      wishlist.some((item) => item.id === product.id)
        ? "text-[#DB4444]"
        : "text-black"
    }
  />
</button>

                    <Link
                      to={`/product/${product.id}`}
                      aria-label="View product"
                      className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center text-black"
                    >
                      <Eye size={19} />
                    </Link>

                  </div>

                 <img
  src={`${Api}/images/${product.image}`}
  alt={product.productName}
  className="w-[180px] h-[180px] object-contain"
/>
              

                 <button
  type="button"
  onClick={() =>
    dispatch(
      addToCart({
        id: product.id,
        productName: product.productName ?? product.name ?? "",
        image: product.image ?? "",
        price: product.price ?? 0,
        discountPrice: product.discountPrice ?? 0,
        hasDiscount: product.hasDiscount ?? false,
      })
    )
  }
  className="absolute bottom-0 left-0 w-full h-[41px] bg-black text-white flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
>
  <ShoppingCart size={17} />
  Add To Cart
</button>

                </div>

                <div className="mt-4">

                  <h3 className="font-medium text-[16px]">
                    {product.productName || product.name}
                  </h3>


                  <div className="flex items-center gap-3 mt-2">

                    <span className="text-[#DB4444] font-medium">
                      ${product.discountPrice ?? product.price}
                    </span>

                    {product.discountPrice != null &&
                      product.price != null &&
                      product.discountPrice < product.price && (
                        <span className="text-gray-400 line-through">
                          ${product.price}
                        </span>
                      )}

                  </div>

                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-center mt-[60px] mb-[60px]">

        <Link
          to="/products"
          className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition-colors"
        >
          View All Products
        </Link>

      </div>

      <div className="border-b border-gray-200" />

    </section>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Eye, Star } from "lucide-react";

import type { RootState } from "../app/store";
import { Api } from "../utils/Api";
import { toggleWishlist } from "./WishlistSlice";

export default function BestSelling() {
    const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
const wishlist = useSelector(
  (state: RootState) => state.wishlist
);
  const productList = Array.isArray(products)
    ? products
    : Array.isArray((products as any)?.data?.products)
      ? (products as any).data.products
      : Array.isArray((products as any)?.data)
        ? (products as any).data
        : [];

  const bestProducts = productList.slice(0, 4);

  return (
    <section className="max-w-[1170px] mx-auto px-4 mt-[70px]">

      <div className="flex items-center gap-4">
        <div className="w-[20px] h-[40px] bg-[#DB4444] rounded" />

        <span className="text-[#DB4444] font-semibold">
          This Month
        </span>
      </div>

      <div className="flex items-center justify-between mt-5 mb-10">

        <h2 className="text-[36px] font-semibold">
          Best Selling Products
        </h2>

        <Link
          to="/products"
          className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600"
        >
          View All
        </Link>

      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">

          {bestProducts.map((product: any) => (
            <div key={product.id} className="group">

              <div className="relative bg-[#F5F5F5] h-[250px] rounded flex items-center justify-center overflow-hidden">

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">

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
                    className="w-[34px] h-[34px] rounded-full bg-white text-black flex items-center justify-center"
                  >
                    <Eye size={19} />
                  </Link>

                </div>

                <img
                  src={`${Api}/images/${product.image}`}
                  alt={product.productName}
                  className="w-[180px] h-[180px] object-contain"
                />

              </div>

              <h3 className="font-medium mt-4">
                {product.productName}
              </h3>

              <div className="flex gap-3 mt-2">

                <span className="text-[#DB4444] font-medium">
                  ${product.hasDiscount && product.discountPrice > 0
                    ? product.discountPrice
                    : product.price}
                </span>

                {product.hasDiscount && product.discountPrice > 0 && (
                  <span className="text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}

              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1 text-[#FFAD33]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";

import type { AppDispatch, RootState } from "../app/store";
import { getProducts } from "./Products";
import { Api } from "../utils/Api";

type Product = {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  image: string;
  color?: string;
};

export default function ExploreProducts() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  const productList: Product[] = Array.isArray(products)
    ? products
    : Array.isArray((products as any)?.data?.products)
      ? (products as any).data.products
      : Array.isArray((products as any)?.data)
        ? (products as any).data
        : Array.isArray((products as any)?.products)
          ? (products as any).products
          : [];

  const visibleProducts = productList.slice(0, 8);

  return (
    <section className="max-w-[1170px] mx-auto px-4 mt-[100px]">

   
      <div className="flex items-center gap-4">
        <div className="w-[20px] h-[40px] bg-[#DB4444] rounded" />

        <span className="text-[#DB4444] font-semibold">
          Our Products
        </span>
      </div>


      <h2 className="text-[36px] font-semibold mt-5 mb-10">
        Explore Our Products
      </h2>

   
      {loading && productList.length === 0 ? (
        <p>Loading products...</p>
      ) : productList.length === 0 ? (
        <p>Products not found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[30px] gap-y-[60px]">

          {visibleProducts.map((product) => (
            <div key={product.id} className="group">

          
              <div className="relative h-[250px] bg-[#F5F5F5] rounded overflow-hidden flex items-center justify-center">

          
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">

                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="w-[34px] h-[34px] rounded-full bg-white text-black flex items-center justify-center hover:text-[#DB4444]"
                  >
                    <Heart size={19} />
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
                  loading="lazy"
                  className="w-[190px] h-[190px] object-contain"
                />

         
                <button
                  type="button"
                  className="absolute bottom-0 left-0 w-full h-[41px] bg-black text-white text-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Add To Cart
                </button>

              </div>

       
              <h3 className="mt-4 text-[16px] font-medium line-clamp-1">
                {product.productName}
              </h3>

          
              <div className="flex items-center gap-3 mt-2">

                <span className="text-[#DB4444] font-medium">
                  $
                  {product.hasDiscount &&
                  product.discountPrice > 0
                    ? product.discountPrice
                    : product.price}
                </span>

                {product.hasDiscount &&
                  product.discountPrice > 0 && (
                    <span className="text-gray-400 line-through">
                      ${product.price}
                    </span>
                  )}

              </div>

            </div>
          ))}

        </div>
      )}

  
      <div className="flex justify-center mt-[60px]">

        <Link
          to="/products"
          className="bg-[#DB4444] text-white px-[48px] py-[16px] rounded hover:bg-red-600 transition-colors"
        >
          View All Products
        </Link>

      </div>

    </section>
  );
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Eye, ShoppingCart } from "lucide-react";

import type { AppDispatch, RootState } from "../app/store";
import { removeWishlist } from "../components/WishlistSlice";
import { getProducts } from "../components/Products";
import { Api } from "../utils/Api";

type Product = {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  image: string;
};

const getPrice = (product: Product) =>
  product.hasDiscount &&
  product.discountPrice > 0 &&
  product.discountPrice < product.price
    ? product.discountPrice
    : product.price;

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
 

  const wishlist = useSelector(
    (state: RootState) => state.wishlist
  );

  const { products } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productList: Product[] = Array.isArray(products)
    ? products
    : Array.isArray((products as any)?.data?.products)
      ? (products as any).data.products
      : Array.isArray((products as any)?.data)
        ? (products as any).data
        : Array.isArray((products as any)?.products)
          ? (products as any).products
          : [];

  const recommendations = productList
    .filter(
      (product) =>
        !wishlist.some((item) => item.id === product.id)
    )
    .slice(0, 4);

  return (
    <main className="max-w-[1170px] mx-auto px-4 pt-[80px] pb-[130px]">

   
      <div className="flex items-center justify-between mb-[60px]">

        <h1 className="text-[20px] font-medium">
          Wishlist ({wishlist.length})
        </h1>

        <button
          type="button"
          className="border border-gray-400 rounded px-10 py-4 text-[14px] hover:border-[#DB4444] hover:text-[#DB4444]"
        >
          Move All To Bag
        </button>

      </div>


      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-5">
            Your wishlist is empty
          </p>

          <Link
            to="/products"
            className="text-[#DB4444] underline"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">

          {wishlist.map((product) => (
            <div key={product.id}>

              <div className="relative h-[250px] bg-[#F5F5F5] rounded overflow-hidden flex items-center justify-center">

         
                {product.hasDiscount &&
                  product.discountPrice > 0 &&
                  product.discountPrice < product.price && (
                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white px-3 py-1 rounded text-[12px]">
                      -
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100
                      )}
                      %
                    </span>
                  )}

       
                <button
                  type="button"
                  onClick={() =>
                    dispatch(removeWishlist(product.id))
                  }
                  aria-label={`Remove ${product.productName} from wishlist`}
                  className="absolute top-3 right-3 z-10 w-[34px] h-[34px] bg-white text-black rounded-full flex items-center justify-center hover:text-[#DB4444]"
                >
                  <Trash2 size={19} />
                </button>

            
                <Link to={`/product/${product.id}`}>
                  <img
                    src={`${Api}/images/${product.image}`}
                    alt={product.productName}
                    className="w-[180px] h-[180px] object-contain"
                  />
                </Link>

                
                <button
                  type="button"
                  className="absolute bottom-0 left-0 w-full h-[41px] bg-black text-white flex items-center justify-center gap-2 text-[13px]"
                >
                  <ShoppingCart size={17} />
                  Add To Cart
                </button>

              </div>

              <h3 className="mt-4 text-[16px] font-medium line-clamp-1">
                {product.productName}
              </h3>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-[#DB4444] font-medium">
                  ${getPrice(product).toFixed(2)}
                </span>

                {product.hasDiscount &&
                  product.discountPrice > 0 &&
                  product.discountPrice < product.price && (
                    <span className="text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
              </div>

            </div>
          ))}

        </div>
      )}

      
      <div className="flex items-center justify-between mt-[90px] mb-[60px]">

        <div className="flex items-center gap-4">
          <div className="w-[20px] h-[40px] bg-[#DB4444] rounded" />

          <h2 className="text-[20px] font-medium">
            Just For You
          </h2>
        </div>

        <Link
          to="/products"
          className="border border-gray-400 rounded px-10 py-4 text-[14px] hover:border-[#DB4444]"
        >
          See All
        </Link>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">

        {recommendations.map((product) => (
          <div key={product.id}>

            <div className="relative h-[250px] bg-[#F5F5F5] rounded overflow-hidden flex items-center justify-center">

              <Link
                to={`/product/${product.id}`}
                aria-label={`View ${product.productName}`}
                className="absolute top-3 right-3 z-10 w-[34px] h-[34px] bg-white text-black rounded-full flex items-center justify-center"
              >
                <Eye size={19} />
              </Link>

              <Link to={`/product/${product.id}`}>
                <img
                  src={`${Api}/images/${product.image}`}
                  alt={product.productName}
                  className="w-[180px] h-[180px] object-contain"
                />
              </Link>

              <button
                type="button"
                className="absolute bottom-0 left-0 w-full h-[41px] bg-black text-white flex items-center justify-center gap-2 text-[13px]"
              >
                <ShoppingCart size={17} />
                Add To Cart
              </button>

            </div>

            <h3 className="mt-4 text-[16px] font-medium line-clamp-1">
              {product.productName}
            </h3>

            <p className="text-[#DB4444] mt-2">
              ${getPrice(product).toFixed(2)}
            </p>

          </div>
        ))}

      </div>

    </main>
  );
}
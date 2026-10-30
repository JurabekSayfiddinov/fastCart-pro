import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import type { AppDispatch, RootState } from "../app/store";
import { getProducts } from "../components/Products";
import { addToCart } from "../components/CartSlice";
import { toggleWishlist } from "../components/WishlistSlice";
import { Api } from "../utils/Api";

type Product = {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  image: string;
  categoryId: number;
  categoryName: string;
  quantity?: number;
  description?: string;
};

const getPrice = (product: Product) =>
  product.hasDiscount &&
  product.discountPrice > 0 &&
  product.discountPrice < product.price
    ? product.discountPrice
    : product.price;

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  const wishlist = useSelector(
    (state: RootState) => state.wishlist
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [id]);

  const productList: Product[] = Array.isArray(products)
    ? products
    : Array.isArray((products as any)?.data?.products)
      ? (products as any).data.products
      : Array.isArray((products as any)?.data)
        ? (products as any).data
        : Array.isArray((products as any)?.products)
          ? (products as any).products
          : [];

  const product = productList.find(
    (item) => item.id === Number(id)
  );

  if (loading && productList.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-5">
        <h2 className="text-2xl">Product not found</h2>

        <Link to="/products" className="text-[#DB4444]">
          Back to Products
        </Link>
      </div>
    );
  }

  const isFavorite = wishlist.some(
    (item) => item.id === product.id
  );


  const images = product.image
    ? [`${Api}/images/${product.image}`]
    : [];

  const relatedProducts = productList
    .filter(
      (item) =>
        item.categoryId === product.categoryId &&
        item.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: product.id,
          productName: product.productName,
          image: product.image,
          price: product.price,
          discountPrice: product.discountPrice,
          hasDiscount: product.hasDiscount,
        })
      );
    }
  };

  return (
    <main className="max-w-[1170px] mx-auto px-4 pt-[70px] pb-[130px]">

      
      <div className="flex flex-wrap items-center gap-3 text-[14px] mb-[70px]">
        <Link to="/" className="text-gray-400">
          Home
        </Link>

        <span>/</span>

        <Link to="/products" className="text-gray-400">
          Products
        </Link>

        <span>/</span>

        <span className="line-clamp-1">
          {product.productName}
        </span>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[70px]">


        <div className="flex gap-[20px]">


          <div className="flex flex-col gap-4 w-[120px] shrink-0">

            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`bg-[#F5F5F5] rounded h-[110px] p-3 ${
                  selectedImage === index
                    ? "ring-2 ring-[#DB4444]"
                    : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${product.productName} ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}

          </div>

   
          <div className="flex-1 min-w-0 h-[520px] bg-[#F5F5F5] rounded flex items-center justify-center p-8">

            {images.length > 0 && (
              <img
                src={images[selectedImage]}
                alt={product.productName}
                className="w-full h-full object-contain"
              />
            )}

          </div>

        </div>


        <div>

          <h1 className="text-[28px] font-semibold">
            {product.productName}
          </h1>

        
          <div className="flex items-center gap-3 mt-4 text-[14px]">
            <span className="text-gray-400">
              Product #{product.id}
            </span>

            <span className="text-gray-300">|</span>

            <span
              className={
                product.quantity != null &&
                product.quantity <= 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {product.quantity != null &&
              product.quantity <= 0
                ? "Out of Stock"
                : "In Stock"}
            </span>
          </div>

   
          <div className="flex items-center gap-3 mt-5">

            <span className="text-[26px] font-medium">
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

     
          <p className="text-[14px] leading-6 mt-6">
            {product.description ||
              `Discover ${product.productName}. Browse our collection for more products.`}
          </p>

          <div className="border-b border-gray-300 my-6" />

          
          <div className="flex items-center flex-wrap gap-3 mt-8">

           
            <div className="flex items-center h-[44px] border border-gray-400 rounded overflow-hidden">

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
                className="w-[42px] h-full flex items-center justify-center hover:bg-[#DB4444] hover:text-white"
              >
                <Minus size={18} />
              </button>

              <span className="w-[55px] h-full border-x border-gray-400 flex items-center justify-center font-medium">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(
                      product.quantity ?? 99,
                      prev + 1
                    )
                  )
                }
                className="w-[42px] h-full bg-[#DB4444] text-white flex items-center justify-center"
              >
                <Plus size={18} />
              </button>

            </div>

         
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="h-[44px] px-7 bg-[#DB4444] text-white rounded font-medium disabled:opacity-50"
            >
              Add To Cart
            </button>

        
            <button
              type="button"
              onClick={() => dispatch(toggleWishlist(product))}
              aria-label="Toggle wishlist"
              className="h-[44px] w-[44px] border border-gray-400 rounded flex items-center justify-center"
            >
              <Heart
                size={22}
                fill={isFavorite ? "#DB4444" : "none"}
                className={
                  isFavorite
                    ? "text-[#DB4444]"
                    : ""
                }
              />
            </button>

          </div>


          <div className="border border-gray-400 rounded mt-10">

            <div className="flex items-center gap-4 p-5 border-b border-gray-400">
              <Truck size={30} strokeWidth={1.7} />

              <div>
                <h3 className="font-medium">
                  Free Delivery
                </h3>

                <p className="text-[12px] mt-1 underline">
                  Contact us for delivery availability
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5">
              <RotateCcw size={30} strokeWidth={1.7} />

              <div>
                <h3 className="font-medium">
                  Return Delivery
                </h3>

                <p className="text-[12px] mt-1">
                  Contact support for return details
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

  
      <section className="mt-[140px]">

        <div className="flex items-center gap-4 mb-10">
          <div className="w-[20px] h-[40px] rounded bg-[#DB4444]" />

          <h2 className="text-[#DB4444] font-semibold">
            Related Item
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">

          {relatedProducts.map((item) => (
            <div key={item.id} className="group">

              <div className="relative h-[250px] bg-[#F5F5F5] rounded flex items-center justify-center overflow-hidden">

    
                <button
                  type="button"
                  onClick={() => dispatch(toggleWishlist(item))}
                  aria-label={`Toggle wishlist for ${item.productName}`}
                  className="absolute right-3 top-3 z-10 w-[34px] h-[34px] bg-white text-black rounded-full flex items-center justify-center"
                >
                  <Heart
                    size={19}
                    fill={
                      wishlist.some(
                        (wish) => wish.id === item.id
                      )
                        ? "#DB4444"
                        : "none"
                    }
                    className={
                      wishlist.some(
                        (wish) => wish.id === item.id
                      )
                        ? "text-[#DB4444]"
                        : "text-black"
                    }
                  />
                </button>

                <Link to={`/product/${item.id}`}>
                  <img
                    src={`${Api}/images/${item.image}`}
                    alt={item.productName}
                    className="w-[180px] h-[180px] object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    dispatch(addToCart(item))
                  }
                  className="absolute bottom-0 left-0 w-full bg-black text-white h-[41px] flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>

              </div>

              <Link
                to={`/product/${item.id}`}
                className="block mt-4 font-medium line-clamp-1 hover:text-[#DB4444]"
              >
                {item.productName}
              </Link>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-[#DB4444]">
                  ${getPrice(item).toFixed(2)}
                </span>

                {item.hasDiscount &&
                  item.discountPrice > 0 &&
                  item.discountPrice < item.price && (
                    <span className="line-through text-gray-400">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}
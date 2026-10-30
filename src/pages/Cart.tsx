import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircleX } from "lucide-react";

import type { AppDispatch, RootState } from "../app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  type CartItem,
} from "../components/CartSlice";
import { Api } from "../utils/Api";
import { useTheme } from "../Context/Theme";

const getPrice = (product: CartItem) => {
  return product.hasDiscount &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price
      ? product.discountPrice
      : product.price;
};

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useTheme();

  const cart = useSelector(
    (state: RootState) => state.cart
  );

  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const subtotal = cart.reduce(
    (total, product) =>
      total + getPrice(product) * product.quantity,
    0
  );

  const formatPrice = (price: number) =>
    `$${price.toFixed(2)}`;

  const handleApplyCoupon = () => {
    setCouponMessage(
      coupon.trim()
        ? "Coupon validation is not connected yet."
        : "Enter a coupon code."
    );
  };

  return (
    <main
      className={`min-h-screen ${
        darkMode
          ? "bg-[#111827] text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 pt-[80px] pb-[140px]">

  
        <div className="flex items-center gap-3 text-[14px] mb-[70px]">
          <Link to="/" className="text-gray-400">
            Home
          </Link>

          <span>/</span>

          <span>Cart</span>
        </div>

   
        <div className="overflow-x-auto">
          <div className="min-w-[650px]">

        
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_30px] gap-4 items-center px-6 py-5 mb-5 shadow-sm rounded">

              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span />

            </div>


            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-5">
                  Your cart is empty
                </p>

                <Link
                  to="/products"
                  className="text-[#DB4444] underline"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">

                {cart.map((product) => (
                  <div
                    key={product.id}
                    className={`grid grid-cols-[2fr_1fr_1fr_1fr_30px] gap-4 items-center px-6 py-5 rounded shadow-sm ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-white"
                    }`}
                  >

                    {/* PRODUCT */}
                    <div className="flex items-center gap-5">
                      <img
                        src={`${Api}/images/${product.image}`}
                        alt={product.productName}
                        className="w-[65px] h-[65px] object-contain"
                      />

                      <Link
                        to={`/product/${product.id}`}
                        className="text-[14px] hover:text-[#DB4444]"
                      >
                        {product.productName}
                      </Link>
                    </div>

           
                    <span className="text-[14px]">
                      {formatPrice(getPrice(product))}
                    </span>

               
                    <input
                      type="number"
                      min={1}
                      value={product.quantity}
                      onChange={(event) => {
                        const quantity = Number(
                          event.target.value
                        );

                        if (
                          Number.isFinite(quantity) &&
                          quantity >= 1
                        ) {
                          dispatch(
                            updateQuantity({
                              id: product.id,
                              quantity,
                            })
                          );
                        }
                      }}
                      aria-label={`Quantity for ${product.productName}`}
                      className={`w-[72px] h-[44px] border rounded px-3 outline-none ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />

          
                    <span className="text-[14px] font-semibold">
                      {formatPrice(
                        getPrice(product) * product.quantity
                      )}
                    </span>

               
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(removeFromCart(product.id))
                      }
                      aria-label={`Remove ${product.productName}`}
                      className="text-[#DB4444]"
                    >
                      <CircleX size={19} fill="#DB4444" stroke="white" />
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>
        </div>

      
        <div className="flex flex-wrap items-center justify-between gap-4 mt-[30px]">

          <Link
            to="/products"
            className={`border px-10 py-4 rounded text-[14px] ${
              darkMode
                ? "border-gray-600"
                : "border-gray-400"
            }`}
          >
            Return To Shop
          </Link>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => {
             
              }}
              className={`border px-8 py-4 rounded text-[14px] ${
                darkMode
                  ? "border-gray-600"
                  : "border-gray-400"
              }`}
            >
              Update Cart
            </button>

            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              disabled={cart.length === 0}
              className="border border-[#DB4444] text-[#DB4444] px-8 py-4 rounded text-[14px] disabled:opacity-50"
            >
              Remove all
            </button>

          </div>

        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] mt-[70px]">


          <div>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value);
                  setCouponMessage("");
                }}
                className={`h-[56px] flex-1 min-w-0 border rounded px-5 outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-400"
                }`}
              />

              <button
                type="button"
                onClick={handleApplyCoupon}
                className="h-[56px] px-10 border border-[#DB4444] text-[#DB4444] rounded hover:bg-[#DB4444] hover:text-white"
              >
                Apply
              </button>

            </div>

            {couponMessage && (
              <p className="text-[13px] text-gray-500 mt-3">
                {couponMessage}
              </p>
            )}

          </div>

       
          <div className={`border rounded p-6 ${
            darkMode
              ? "border-gray-600"
              : "border-black"
          }`}>

            <h2 className="text-[20px] font-semibold mb-5">
              Cart Total
            </h2>

            <div className="flex justify-between text-[15px] mb-5">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-[15px] mb-5">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="border-t border-gray-300 pt-5 flex justify-between font-semibold">
              <span>Total:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-center mt-7">
              <button
                type="button"
                disabled={cart.length === 0}
                className="bg-[#DB4444] text-white px-10 py-4 rounded disabled:opacity-50"
              >
                Proceed to checkout
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
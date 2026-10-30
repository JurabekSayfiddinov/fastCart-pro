import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Heart,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ShoppingCart,
} from "lucide-react";
import { addToCart } from "../components/CartSlice";
import type { AppDispatch, RootState } from "../app/store";
import { getProducts } from "../components/Products";
import { getCategories } from "../components/Category";
import { Api } from "../utils/Api";
import { useTheme } from "../Context/Theme";

type Product = {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  image: string;
  categoryId: number;
  categoryName: string;
};

type Category = {
  id: number;
  categoryName?: string;
  name?: string;
};

const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];

const getPrice = (product: Product) => {
  return product.hasDiscount &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
};

export default function AllProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useTheme();

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  const { categories } = useSelector(
    (state: RootState) => state.categories
  );

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState("");
  const [appliedMax, setAppliedMax] = useState("");

  const [visibleCount, setVisibleCount] = useState(12);

  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    features: true,
    price: true,
    condition: true,
    ratings: true,
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
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

  const categoryList: Category[] = Array.isArray(categories)
    ? categories
    : Array.isArray((categories as any)?.data)
      ? (categories as any).data
      : [];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );

    setVisibleCount(12);
  };

  const filteredProducts = useMemo(() => {
    let result = [...productList];

  
    if (categoryId !== null) {
      result = result.filter(
        (product) => product.categoryId === categoryId
      );
    }


    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.some((brand) =>
          product.productName
            ?.toLowerCase()
            .includes(brand.toLowerCase())
        )
      );
    }

   
    if (appliedMin !== "") {
      result = result.filter(
        (product) => getPrice(product) >= Number(appliedMin)
      );
    }

  
    if (appliedMax !== "") {
      result = result.filter(
        (product) => getPrice(product) <= Number(appliedMax)
      );
    }


    if (sortBy === "low") {
      result.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (sortBy === "high") {
      result.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    }

    return result;
  }, [
    productList,
    categoryId,
    selectedBrands,
    appliedMin,
    appliedMax,
    sortBy,
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const resetVisible = () => setVisibleCount(12);

  const sectionTitle = (
    title: string,
    section: keyof typeof openSections
  ) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between font-semibold text-[15px] py-4"
    >
      {title}

      {openSections[section] ? (
        <ChevronUp size={16} />
      ) : (
        <ChevronDown size={16} />
      )}
    </button>
  );

  const checkboxClass =
    "w-4 h-4 accent-[#DB4444] cursor-pointer";

  return (
    <main
      className={`min-h-screen ${
        darkMode ? "bg-[#111827] text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 pt-[60px] pb-[120px]">

     
        <div className="flex items-center justify-between mb-[45px]">

          <div className="flex items-center gap-3 text-[14px]">
            <Link to="/" className="text-gray-400">
              Home
            </Link>

            <span>/</span>

            <span>Explore Our Products</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              resetVisible();
            }}
            className={`border rounded px-4 h-[42px] text-[14px] outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="popular">Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

        </div>

        <div className="flex gap-[40px] items-start">

          
          <aside className="hidden lg:block w-[220px] shrink-0">

       
            <div className="border-b border-gray-200 pb-4">

              {sectionTitle("Category", "category")}

              {openSections.category && (
                <div className="flex flex-col items-start gap-3 text-[14px]">

                  <button
                    onClick={() => {
                      setCategoryId(null);
                      resetVisible();
                    }}
                    className={
                      categoryId === null
                        ? "text-[#DB4444]"
                        : "hover:text-[#DB4444]"
                    }
                  >
                    All products
                  </button>

                  {categoryList.slice(0, 5).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setCategoryId(category.id);
                        resetVisible();
                      }}
                      className={`text-left hover:text-[#DB4444] ${
                        categoryId === category.id
                          ? "text-[#DB4444]"
                          : ""
                      }`}
                    >
                      {category.categoryName ?? category.name}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setCategoryId(null);
                      resetVisible();
                    }}
                    className="text-[#DB4444]"
                  >
                    See all
                  </button>

                </div>
              )}
            </div>

          
            <div className="border-b border-gray-200 pb-4">

              {sectionTitle("Brands", "brands")}

              {openSections.brands && (
                <div className="flex flex-col gap-3">

                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-3 text-[14px] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className={checkboxClass}
                      />
                      {brand}
                    </label>
                  ))}

                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      resetVisible();
                    }}
                    className="text-[#DB4444] text-[14px] text-left"
                  >
                    See all
                  </button>

                </div>
              )}
            </div>

           
            <div className="border-b border-gray-200 pb-4">

              {sectionTitle("Features", "features")}

              {openSections.features && (
                <div className="flex flex-col gap-3">

                  {[
                    "Metallic",
                    "Plastic cover",
                    "8GB Ram",
                    "Super power",
                    "Large Memory",
                  ].map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center gap-3 text-[14px] text-gray-500"
                    >
                      <input
                        type="checkbox"
                        disabled
                        className={checkboxClass}
                      />
                      {feature}
                    </label>
                  ))}

                  <span className="text-gray-400 text-xs">
                    Feature filtering coming soon
                  </span>

                </div>
              )}
            </div>

       
            <div className="border-b border-gray-200 pb-4">

              {sectionTitle("Price range", "price")}

              {openSections.price && (
                <div>

                  <div className="flex gap-2 mb-4">

                    <div className="flex-1">
                      <label className="text-xs text-gray-500">
                        Min
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0"
                        className={`w-full h-[40px] border rounded px-2 text-[13px] outline-none ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="text-xs text-gray-500">
                        Max
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="999999"
                        className={`w-full h-[40px] border rounded px-2 text-[13px] outline-none ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAppliedMin(minPrice);
                      setAppliedMax(maxPrice);
                      resetVisible();
                    }}
                    className="w-full h-[38px] border border-[#DB4444] text-[#DB4444] rounded hover:bg-[#DB4444] hover:text-white transition-colors"
                  >
                    Apply
                  </button>

                </div>
              )}
            </div>

       
            <div className="border-b border-gray-200 pb-4">

              {sectionTitle("Condition", "condition")}

              {openSections.condition && (
                <div className="flex flex-col gap-3">

                  {[
                    "Any",
                    "Refurbished",
                    "Brand new",
                    "Old items",
                  ].map((item, index) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 text-[14px]"
                    >
                      <input
                        type="radio"
                        name="condition"
                        defaultChecked={index === 0}
                        disabled={index !== 0}
                        className="accent-[#DB4444]"
                      />

                      {item}
                    </label>
                  ))}

                </div>
              )}
            </div>


            <div className="pb-4">

              {sectionTitle("Ratings", "ratings")}

              {openSections.ratings && (
                <p className="text-[13px] text-gray-500">
                  Rating filtering will be available when
                  the backend provides product ratings.
                </p>
              )}
            </div>

          </aside>


          <div className="flex-1 min-w-0">

            {loading && productList.length === 0 ? (
              <p>Loading products...</p>
            ) : visibleProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[24px] gap-y-[35px]">

                {visibleProducts.map((product) => (
                  <div key={product.id} className="group">

          
                    <div className="relative h-[250px] bg-[#F5F5F5] rounded overflow-hidden flex items-center justify-center">

                      {product.hasDiscount &&
                        product.discountPrice > 0 &&
                        product.price > product.discountPrice && (
                          <span className="absolute left-3 top-3 bg-[#DB4444] text-white rounded px-3 py-1 text-[12px]">
                            -
                            {Math.round(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100
                            )}
                            %
                          </span>
                        )}

                
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">

                        <button
                          type="button"
                          aria-label="Add to wishlist"
                          className="w-[34px] h-[34px] rounded-full bg-white text-black flex items-center justify-center"
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

                      <Link to={`/product/${product.id}`}>
                        <img
                          src={`${Api}/images/${product.image}`}
                          alt={product.productName}
                          loading="lazy"
                          className="w-[180px] h-[180px] object-contain"
                        />
                      </Link>

      
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

            
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-[15px] font-medium mt-3 line-clamp-1 hover:text-[#DB4444]">
                        {product.productName}
                      </h3>
                    </Link>

             
                    <div className="flex items-center gap-3 mt-2 text-[14px]">

                      <span className="text-[#DB4444]">
                        ${getPrice(product).toFixed(2)}
                      </span>

                      {product.hasDiscount &&
                        product.discountPrice > 0 &&
                        product.price > product.discountPrice && (
                          <span className="text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}

                    </div>

                  </div>
                ))}

              </div>
            )}

      
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-[70px]">

                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) => prev + 12)
                  }
                  className="bg-[#DB4444] text-white px-[45px] py-[15px] rounded hover:bg-red-600 transition-colors"
                >
                  More Products
                </button>

              </div>
            )}

          </div>
        </div>

      </div>

 
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 w-[46px] h-[46px] bg-[#F5F5F5] text-black rounded-full flex items-center justify-center shadow-md"
      >
        <ArrowUp size={22} />
      </button>

    </main>
  );
}
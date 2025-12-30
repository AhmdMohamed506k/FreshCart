import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useFilter } from "../Contexts/FilterContext/FilterContext";
import axios from "axios";

export default function PhoneFilterList() {
  const [open, setOpen] = useState(false);
  const { filters, updateFilters } = useFilter();
  const { search, category, minPrice, maxPrice, sort } = filters;
  const [CategoriesProducts, setCategoriesProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  async function GetCategories() {

    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

    setCategoriesProducts(data?.data)

  }


  useEffect(() => {

    GetCategories();
  }, [])

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();

    if (search) params.append("keyword", search); // server uses keyword not search
    if (category) params.append("category", category);
    params.append("price[gte]", minPrice);
    params.append("price[lte]", maxPrice);

    // Sort conversion
    if (sort === "Latest") params.append("sort", "-createdAt");
    if (sort === "Price: Low to High") params.append("sort", "price");
    if (sort === "Price: High to Low") params.append("sort", "-price");

    fetch(`https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        SetIsProduct(data.data);    // <-- correctly assign products
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, category, minPrice, maxPrice, sort]);







  return (
    <>
      {/* Trigger Button (visible only on <1280px) */}
      <div className=" mb-3">
        <button onClick={() => setOpen(true)} className="xl:hidden  cursor-pointer flex  w-full items-center gap-2 bg-white border border-gray-200 rounded-xl p-3 shadow-sm text-gray-700 font-medium" >
          <SlidersHorizontal className="w-5 h-5" />
          Filter Products
        </button>

        {/* Overlay */}
        {open && (<div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-50 xl:hidden" />)}

        {/* Drawer */}
        <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 p-5 overflow-y-auto transition-transform duration-300 xl:hidden     ${open ? "translate-x-0" : "-translate-x-full"}   `} >
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b">
            <h2 className="text-lg font-semibold">Filter Products</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="mt-5 space-y-6">

            {/* Product Categories */}
            <div>
              <p className="font-bold text-sm mb-2">PRODUCT CATEGORIES</p>
              {CategoriesProducts.map((cat) => (
                <li key={cat._id} onClick={() => updateFilters({ category: cat._id })} className={`flex items-center justify-between hover:text-green-600 cursor-pointer  ${filters.category === cat._id ? "text-green-600 font-semibold" : ""}`}  >
                  <span>{cat.name}</span>
                  <span className="text-gray-400 text-lg">+</span>
                </li>
              ))}
            </div>

            <hr />

            {/* Price */}
            <div>
              <p className="font-bold text-sm mb-2">FILTER BY PRICE</p>
              <input  max="120000" value={filters.maxPrice} onChange={(e) => updateFilters({ maxPrice: e.target.value })} type="range" className="w-full" />
              <p className="text-sm text-gray-600 mt-1">Price: ${filters.maxPrice}</p>
            </div>

            <hr />







            {/* Apply button */}
            <button className="w-full bg-green-600 text-white py-2 rounded-xl mt-4 font-medium">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

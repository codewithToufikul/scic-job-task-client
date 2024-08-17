import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products`, {
          params: {
            page: currentPage,
            limit: 6,
            searchQuery,
            minPrice,
            maxPrice,
            category: selectedCategory,
            brand: selectedBrand,
          },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setFilteredProducts(response.data.products);
      } catch (err) {
        console.log("fetch err", err);
      }
    };
    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory, selectedBrand, minPrice, maxPrice]);

  const handleSearchReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedCategory("");
    setSelectedBrand("");
    setMinPrice(0);
    setMaxPrice(100);
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar />

      <div className="flex justify-center items-center gap-5">
        <div className="my-16">
          <form
            className="w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.searchBox.value);
              setCurrentPage(1);
            }}
          >
            <div className="relative md:w-96">
              <input
                type="search"
                id="default-search"
                name="searchBox"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search Your Products..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={handleSearchReset}
          type="button"
          disabled={!searchQuery}
          className={`text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ${
            !searchQuery ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Reset!
        </button>
      </div>
      <div className="">
        <div className="grid grid-cols-4 justify-center items-center">
          <form className=" my-4">
            <h1>Select Category</h1>
            <select
              name="category"
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">all</option>
              {[
                "Electronics",
                "Accessories",
                "Home & Kitchen",
                "Furniture",
                "Home & Office",
                "Wearables",
                "Audio",
                "Home Security",
                "Bedding",
                "Kitchen Appliances",
                "Home Decor",
                "Computer Accessories",
                "Lighting",
                "Cleaning Appliances",
                "Gaming",
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </form>
          <form className=" my-4">
            <h1>Select Brand</h1>
            <select
              name="brand"
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">all</option>
              {[
                "EcoTechie",
                "InnoElectro",
                "EcoTechie",
                "TechWave",
                "GizmoNest",
                "ModernGadget",
                "Smartlyfe",
                "NexGadget",
              ].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </form>
          <form className=" my-4">
            <h1>Price Range</h1>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="input input-bordered w-24"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="input input-bordered w-24"
                placeholder="Max"
              />
            </div>
          </form>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <figure className="px-5 pt-5">
                <div className="w-62 h-40">
                  <img
                    src={product.ProductImage}
                    alt={product.ProductName}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
              </figure>

              <div className="card-body">
                <h2 className="card-title">{product.ProductName}</h2>
                <p>{product.Description.slice(0, 60)}</p>
                <p>
                  <span className="text-lg font-medium">Category:</span>{" "}
                  {product.Category}
                </p>
                <div className="flex justify-between">
                  <p>
                    <span className="text-lg font-medium">Rating:</span>{" "}
                    {product.Ratings}
                  </p>
                  <p>
                    <span className="text-lg font-medium">Price:</span> $
                    {product.Price}
                  </p>
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center col-span-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

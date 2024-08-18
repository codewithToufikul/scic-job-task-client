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
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortField, setSortField] = useState("ProductCreationDateAndTime");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://job-task-server-pi-two.vercel.app/products${
            selectedCategory ? `/category/${selectedCategory}` : ""
          }${selectedBrand ? `/brand/${selectedBrand}` : ""}`,
          {
            params: {
              page: currentPage,
              limit: 8,
              searchQuery,
              minPrice,
              maxPrice,
              sortField,
              sortOrder,
            },
          }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setFilteredProducts(response.data.products);
      } catch (err) {
        console.log("fetch err", err);
      }
    };
    fetchProducts();
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    sortField,
    sortOrder,
  ]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.ProductName.toLowerCase().includes(query) ||
        product.Category.toLowerCase().includes(query) ||
        product.ProductCreationDateAndTime.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearchReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setMinPrice(0);
    setMaxPrice(1000);
    setSortField("ProductCreationDateAndTime");
    setSortOrder("desc");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    if (e.target.name === "minPrice") {
      setMinPrice(parseFloat(e.target.value));
    } else if (e.target.name === "maxPrice") {
      setMaxPrice(parseFloat(e.target.value));
    }
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
<div>
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

      <div>
        <div className="grid grid-cols-4 justify-center items-center gap-5">
          {/* Category form */}
          <form className="my-4">
            <h1>Select Category</h1>
            <select
              name="category"
              className="select select-bordered w-full max-w-xs"
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
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
          {/* Brand form */}
          <form className="my-4">
            <h1>Select Brand</h1>
            <select
              name="brand"
              className="select select-bordered w-full max-w-xs"
              onChange={handleBrandChange}
            >
              <option value="">All</option>
              {[
                "EcoTechie",
                "InnoElectro",
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
          <div className="">
            <h1>Price Range</h1>
            <div className="flex justify-center items-center gap-2">
              <input
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceRangeChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Min Price"
              />
              <input
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceRangeChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Max Price"
              />
            </div>
          </div>
          <div>
            <h1>Sort</h1>
            <select
              onChange={handleSortChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="ProductCreationDateAndTime-desc">
                Date: Newest
              </option>
              <option value="ProductCreationDateAndTime-asc">
                Date: Oldest
              </option>
              <option value="Price-asc">Price: Low to High</option>
              <option value="Price-desc">Price: High to Low</option>
            </select>
          </div>
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
        </div>

        <div className="flex justify-center items-center col-span-3 mt-10">
          <div className="join">
            <button disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)} className="join-item btn">«</button>
            <button className="join-item btn"><span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span></button>
            <button disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)} className="join-item btn">»</button>
          </div>
        </div>


      </div>
    </div>
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 mt-14">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Product Peak</p>
  </aside>
</footer>
</div>
  );
};

export default Home;

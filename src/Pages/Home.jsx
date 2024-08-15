import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (err) {
        console.log("fetch err", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchBox.value;
    console.log(searchValue);
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar />

      <form className="max-w-md mx-auto" onSubmit={handleSearch}>
        <div className="relative">
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

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-xl">
            <figure className="px-5 pt-5">
              <div className="w-62 h-44">
                <img
                  src={product.ProductImage}
                  alt={product.ProductName}
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.ProductName}</h2>
              <p>{product.ProductDescription}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

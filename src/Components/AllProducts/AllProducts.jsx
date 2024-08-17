import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { TiThMenu } from "react-icons/ti";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [sortField, setSortField] = useState("creationDate");
  const [sortOrder, setSortOrder] = useState("desc"); // default to descending

  const fetchProducts = (page, sortField, sortOrder, searchData) => {
    setLoading(true);
    fetch(
      `http://localhost:5000/products?page=${page}&limit=6&sortField=${sortField}&sortOrder=${sortOrder}&search=${searchData}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage, sortField, sortOrder, searchData);
  }, [currentPage, sortField, sortOrder, searchData]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSortChange = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1); // reset to first page
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    setSearchData(searchValue);
    setCurrentPage(1); // reset to first page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-6">

        <div className="flex flex-col lg:flex-row justify-between mb-6">
            {/* Sorting field */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 btn-primary text-white"
              >
                Sort By
              </div>
              <ul
                tabIndex={0}
                className="text-black dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => handleSortChange("creationDate")}>
                    Date Added
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSortChange("price")}>Price</a>
                </li>
              </ul>
            </div>

            {/* Searching */}
            <div>
              <form className="flex flex-row gap-3 " onSubmit={searchHandler}>
                <label className="text-base lg:text-lg font-medium">
                  Search{" "}
                </label>
                <div className="flex flex-row gap-2">
                  <input
                    type="text"
                    name="search"
                    className="rounded-xl border-2 border-blue-800"
                    placeholder="   Product name or brand"
                  />
                  <button type="submit">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchData("");
                      fetchProducts(currentPage, sortField, sortOrder, "");
                    }}
                  >
                    <ImCross />
                  </button>
                </div>
              </form>
            </div>
          </div>

        {/* drawer  */}
      <div className="drawer  lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
                htmlFor="my-drawer-2"
                className="btn bg-black drawer-button lg:hidden rounded-r-lg 
                text-blue-200 left-0 text-sm p-3 z-[2] fixed top-1/4"
            >
            <TiThMenu />
          </label>

      

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 max-w-full">
            {products.map((product) => (
              <div
                key={product._id}
                className="card card-compact w-auto bg-base-100 shadow-xl text-left"
              >
                <figure className="w-56 h-56 md:w-60 lg:w-64 mx-auto block">
                  <img
                    src={product.productImage}
                    alt={product._id}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-secondary">
                    {product.productName}
                    <div className="badge badge-secondary">
                      <FaStar /> {product.ratings}{" "}
                    </div>
                  </h2>
                  <p className="text-base md:text-lg lg:text-lg font-bold text-purple-600 text-right">
                    - by
                    <span className="border-2 border-purple-600 ml-1 font-bold px-2 rounded-2xl text-black">
                      {" "}
                      {product.brand}
                    </span>
                  </p>
                  <p className="text-base md:text-lg lg:text-lg">
                    {product.description}
                  </p>
                  <p className="text-base md:text-lg lg:text-lg">
                    <b> Price:</b> {product.price} $
                  </p>
                  <p className="text-base md:text-lg lg:text-lg">
                    <b> Category :</b> {product.category}
                  </p>
                  <p className="text-base md:text-lg lg:text-lg">
                    <b> Posted Date: </b> {product.creationDate}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* pagination  */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn btn-primary mr-2"
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number + 1)}
                className={`btn ${
                  currentPage === number + 1 ? "btn-active" : ""
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-primary ml-2"
            >
              Next
            </button>
          </div>
        </div>


        <div className="drawer-side z-[10]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-blue-300 lg:bg-transparent  text-base-content min-h-full w-80 p-4 text-left">
            {/* Sidebar content here */}
            <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay text-right btn 
            btn-circle lg:hidden absolute z-[10] right-5 text-indigo-800"
             > 
                <ImCross/> 
             </label>

           <p className="font-semibold text-2xl text-indigo-800 ">Filter By: </p>

           {/* category  */}
           <div className="flex flex-col mt-2">
              <p className="font-semibold text-lg">Category </p>
              <select className="select select-primary w-full max-w-xs">
                <option disabled selected>Any</option>
                <option>Shoes</option>
                <option>Caps</option>
                <option>Watches</option>
                <option>Sunglasses</option>
                <option>Bags</option>
                </select>

           </div>
           {/* Brand  */}
           <div className="flex flex-col mt-2">
              <p className="font-semibold text-lg">Brand </p>
              <select className="select select-primary w-full max-w-xs">
                <option disabled selected>Any</option>
                <option>Gucci</option>
                <option>Adidas</option>
                <option>Nike</option>
                <option>Ray-Ban</option>
                <option>Oakley</option>
                <option>Rolex</option>
                </select>

           </div>

           {/* price range  */}
           <div className="flex flex-col mt-2">
                <p className="font-semibold text-lg">Price  </p>
                <input type="range" min={0} max="100" value="40" className="range range-primary" /> 
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function SearchBar() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // get product data from firebase--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const getProductData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // End of get product data from firebase--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // filtered data on dropDown menu part----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const filterSearchData = products
    .filter((product) => product.name.toLowerCase().includes(search))
    .slice(0, 8);

  // End of filtered data on dropDown menu part----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Productdetails Navigate part when click on item ----------------------------------------------------------------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleItemClick = (productId) => {
    console.log(`Clicked product ID: ${productId}`);
    console.log(`Navigating to: /productsDetails/${productId}`);
    navigate(`/productsDetails/${productId}`);
    setSearch(""); // Clear the search input
    setDropdownVisible(false); // Hide dropdown
  };

  // End of Productdetails Navigate part  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase());
          setDropdownVisible(true);
        }}
        value={search} // Ensure the input reflects the current search state
        className=" rounded-tr-full rounded-bl-full pl-6 bg-light-pink placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none focus:ring-dusty-mauve focus:border-dusty-mauve focus:outline-none text-black border-transparent"
        aria-label="Search Products"
      />
      {dropdownVisible && search && (
        <div className="absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
          {filterSearchData.length > 0 ? (
            filterSearchData.map((product) => (
              <div
                key={product.id}
                className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => handleItemClick(product.id)}
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <span className="text-gray-700 font-medium">
                    {product.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center text-gray-500 py-4">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

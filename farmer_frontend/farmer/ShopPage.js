import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Card } from "flowbite-react";
import { useRouter } from "next/router";
import MemberSidebar from "@/components/MemberSidebar";
import NavbarWithIconIndicatorAndDropdown from "@/layouts/NavbarWithIconIndicatorAndDropdown";

const ShopPage = () => {
  const router = useRouter();
  const [jsonData, setJSONData] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [searchInput, setSerachInput] = useState("");

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/seller/getAllProduct",
        {
          withCredentials: true,
        },
      );
      setJSONData(response.data);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCartHandler = (price, productID) => {
    setSelectedProduct([...selectedProduct, productID]);
    setProductCount(productCount + 1);
    setSelectedProductPrice(selectedProductPrice + price);
    console.log(selectedProduct);
  };

  const productDescriptionHandler = (productID) => {
    router.push(`./${productID}`);
  };

  const searchHandler = (event) => {
    setSerachInput(event.target.value);
  };

  const searchInputHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/member/searchproduct",
        { productName: searchInput },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setJSONData([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarWithIconIndicatorAndDropdown
        productCount={productCount}
        productPrice={selectedProductPrice}
        productIDs={selectedProduct}
      />
      <form onSubmit={searchInputHandler}>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered mb-10 ml-[1150px] mr-5 w-24 md:w-auto"
          value={searchInput}
          onChange={searchHandler}
        />
        <button className="btn btn-primary btn-outline" type="submit">
          Search
        </button>
      </form>
      <div className="flex min-h-screen">
        <MemberSidebar />

        <div className="grid grid-cols-3 gap-4">
          {jsonData.map((product) => (
            <div className="card h-[36rem] w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  src={`http://localhost:3000/seller/getProductPicture/${product.productID}`}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <div className="flex">
                  <svg
                    class="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <div className="flex justify-between py-4">
                  <div className="card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        productDescriptionHandler(product.productID)
                      }
                    >
                      Description
                    </button>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        addToCartHandler(product.price, product.productID)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

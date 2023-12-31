import MemberSidebar from "@/components/MemberSidebar";
import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table, Card } from "flowbite-react";
import axios from "axios";

const ProductDescription = () => {
  const [jsonData, setJSONData] = useState([]);

  const [searchInput, setSerachInput] = useState("");

  const router = useRouter();
  const { productID } = router.query;
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/seller/getProduct/${productID}`,
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

  const searchHandler = (event) => {
    setSerachInput(event.target.value);
  };

  const searchInputHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/member/addcomment",
        { productID: 1, message: searchInput },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setJSONData([response.data]);
      fetchdata();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex">
        <MemberSidebar />
        <img
          src={`http://localhost:3000/seller/getProductPicture/${jsonData.productID}`}
          className="h-[50%] w-[50%]"
        />
        <Table striped className="w-[500px]">
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Product ID:
              </Table.Cell>
              <Table.Cell>{jsonData.productID}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Product Name:
              </Table.Cell>
              <Table.Cell>{jsonData.productName}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Price
              </Table.Cell>
              <Table.Cell>{jsonData.price}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Description
              </Table.Cell>
              <Table.Cell>{jsonData.description}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Category
              </Table.Cell>
              <Table.Cell>{jsonData.category}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Tags
              </Table.Cell>
              <Table.Cell>{jsonData.tags}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Availability
              </Table.Cell>
              <Table.Cell>{jsonData.availabilty}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Rating
              </Table.Cell>
              <Table.Cell>{jsonData.ratings}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Reviews
              </Table.Cell>
              <Table.Cell>{jsonData.reviews}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <form onSubmit={searchInputHandler}>
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered mb-10 ml-[1150px] mr-5 w-24 md:w-auto"
                    value={searchInput}
                    onChange={searchHandler}
                  />
                  <button className="btn btn-primary btn-outline" type="submit">
                    Post
                  </button>
                </form>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCartHandler(product.price)}
                >
                  Add to Cart
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default ProductDescription;

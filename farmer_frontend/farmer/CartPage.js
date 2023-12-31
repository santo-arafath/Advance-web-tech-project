import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Card } from "flowbite-react";
import { useRouter } from "next/router";
import MemberSidebar from "@/components/MemberSidebar";
import NavbarWithIconIndicatorAndDropdown from "@/layouts/NavbarWithIconIndicatorAndDropdown";

const CartPage = () => {
  const router = useRouter();
  const [jsonData, setJSONData] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/member/getAllOrders",
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

  const cancelOrderHandler = async (orderID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/member/cancelorder/${orderID}`,
        {
          withCredentials: true,
        },
      );
      fetchdata();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmOrderHandler = (orderID) => {
    router.push("http://localhost:7000/member/ConfirmOrder");
  };

  return (
    <div>
      <div className="flex min-h-screen">
        <MemberSidebar />
        <Table>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Order Date</Table.HeadCell>
            <Table.HeadCell>Total Amount</Table.HeadCell>

            <Table.HeadCell>Order Status</Table.HeadCell>
            <Table.HeadCell>Shipping Address</Table.HeadCell>
            <Table.HeadCell>Products</Table.HeadCell>
          </Table.Head>
          {jsonData.map((order) => (
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{order.orderID}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {order.orderDate}
                </Table.Cell>
                <Table.Cell>{order.totalAmount}</Table.Cell>
                <Table.Cell>{order.orderStatus}</Table.Cell>
                <Table.Cell>{order.shippingAddress}</Table.Cell>
                {order.products.map((product) => (
                  <Table.Row key={product.productID} className="border-2">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <img
                        src={`http://localhost:3000/seller/getProductPicture/${product.productID}`}
                        alt="Shoes"
                        className="w-10"
                      />
                    </Table.Row>
                    <Table.Row>ID: {product.productID}</Table.Row>
                    <Table.Row>Name: {product.productName}</Table.Row>
                    <Table.Row>Price: {product.price}</Table.Row>
                  </Table.Row>
                ))}

                <Table.Cell>
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="http://localhost:7000/member/ConfirmOrder"
                  >
                    <p>Confirm Order</p>
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                    onClick={() => cancelOrderHandler(order.orderID)}
                  >
                    <p>Cancel Order</p>
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default CartPage;

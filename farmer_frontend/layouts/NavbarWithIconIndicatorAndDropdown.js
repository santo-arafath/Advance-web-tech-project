import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NavbarWithIconIndicatorAndDropdown = ({
  productCount,
  productPrice,
  productIDs,
}) => {
  const router = useRouter();
  const viewCartHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/member/addtocart",
        {
          orderDate: "8-27-2023",
          totalAmount: productPrice,
          orderStatus: "pending",
          shippingAddress: "Tangail, Bangladesh",
          products: productIDs,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      router.push("./Cart");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">Smart Agriculture & Farming</a>
      </div>

      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge indicator-item badge-sm">
                {productCount}{" "}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{productCount} Items</span>
              <span className="text-info">Subtotal: {productPrice}</span>
              <div className="card-actions" onClick={viewCartHandler}>
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img src={"http://localhost:3000/member/showprofilepicture"} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarWithIconIndicatorAndDropdown;

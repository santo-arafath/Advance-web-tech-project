import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useAuth } from "D:/My Projects/nature_nurtures/front_end/pages/utils/authcontext";
import { useRouter } from "next/router";

const NavbarWithSearchInputAndDropdown = () => {
  const [jsonData, setJsonData] = useState("");
  const router = useRouter();
  //const { user, logout, checkUser, login, loginUser, validUSer } = useAuth();
  // useEffect(() => {
  //   if (!validUSer()) {
  //     router.push("http://localhost:7000/login/Login");
  //   }
  //   loginUser();
  // }, []);
  function checkSession() {
    if (user != null) {
      fetchData();
      console.log("User Email:  " + user.email);
      console.log("user Cookie:  " + user.cookie);
    } else {
      // router.push("http://localhost:7000/login/Login");
    }
  }
  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/member/getprofile/" + user.email,
        {
          withCredentials: true,
        },
      );
      const jsonData = response.data;
      console.log(jsonData);
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">Smart Agriculture & Farming</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
          <div className="w-10 rounded-full">
            <img src={"http://localhost:3000/member/showprofilepicture"} />
          </div>
        </label>
      </div>
    </div>
  );
};

export default NavbarWithSearchInputAndDropdown;

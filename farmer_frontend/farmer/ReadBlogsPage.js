import SellerSidebar from "@/components/SellerSidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Card } from "flowbite-react";
import { useRouter } from "next/router";
import MemberSidebar from "@/components/MemberSidebar";
import NavbarWithIconIndicatorAndDropdown from "@/layouts/NavbarWithIconIndicatorAndDropdown";

const ReadBlogspage = () => {
  const router = useRouter();
  const [jsonData, setJSONData] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/member/readblogs",
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

  return (
    <div>
      <div className="flex min-h-screen">
        <MemberSidebar />
        <div>
          {jsonData.map((blog) => (
            <div className="card h-[36rem] w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={`http://localhost:3000/member/showblogpicture/${blog.blogID}`}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title">{blog.title}</h1>
                <h3>{blog.author}</h3>
                <h6>{blog.date}</h6>
                <p>{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadBlogspage;

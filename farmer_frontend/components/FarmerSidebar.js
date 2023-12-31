import React from "react";
import { Sidebar } from "flowbite-react";

const MemberSidebar = () => {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example w-[20vw]">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="http://localhost:7000/member/MemberDashboard">
            <p>Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Collapse label="Profile">
            <Sidebar.Item href="http://localhost:7000/member/SellerProfile">
              Your Profile
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/member/EditSellerProfile">
              Edit Profile
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Shop">
            <Sidebar.Item href="http://localhost:7000/member/Shop">
              Shop
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/member/Cart">
              Cart
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Blogs">
            <Sidebar.Item href="http://localhost:7000/member/PublishBlogs">
              Publish Blogs
            </Sidebar.Item>
            <Sidebar.Item href="http://localhost:7000/member/ReadBlogs">
              Read Blogs
            </Sidebar.Item>
          </Sidebar.Collapse>
          {/* <Sidebar.Item href="http://localhost:7000/member/PlantDiseaseDetection">
            Plant Disease Detection
          </Sidebar.Item> */}
          <Sidebar.Item href="http://localhost:7000/member/Chat">
            Contact With Vet/Expert
          </Sidebar.Item>
          <Sidebar.Item href="http://localhost:7000/login/Login">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default MemberSidebar;

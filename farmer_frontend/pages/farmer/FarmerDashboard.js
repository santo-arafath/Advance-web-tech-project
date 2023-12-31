import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import React from "react";
import MemberSidebar from "../../components/MemberSidebar";
import Lottie from "lottie-react";
import animationData from "../../public/animation_lltvz3q8.json";

const MemberDashboard = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <MemberSidebar />
        <div className="flex">
          
          <img src="../Smart-farming-LetsNurture1.jpg" className="w-[64vw] rounded-lg shadow-3xl" />
          
          <div>
            <h1 className="mt-10 text-4xl font-bold">&nbsp;&nbsp;Hello, Rezuan</h1>
            <h1 className="mt-10 text-2xl font-bold">&nbsp;&nbsp;&nbsp; Let's start the day.</h1>
          </div>
        </div>
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default MemberDashboard;

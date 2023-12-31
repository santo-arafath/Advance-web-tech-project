import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import EditSellerProfilePage from "@/seller/EditSellerProfilePage";
import React from "react";
import MemberSidebar from "../../components/MemberSidebar";

const EditSellerProfile = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <MemberSidebar />
        <EditSellerProfilePage />
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default EditSellerProfile;

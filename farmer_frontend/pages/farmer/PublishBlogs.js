import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import CartPage from "@/member/CartPage";
import ConfirmOrderPage from "@/member/ConfirmOrderPage";
import PublishBlogsPage from "../../member/PublishBlogsPage";
import React from "react";

const PublishBlogs = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <PublishBlogsPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default PublishBlogs;

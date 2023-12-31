import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import ConfirmOrderPage from "@/member/ConfirmOrderPage";
import ReadBlogsPage from "@/member/ReadBlogsPage";
import React from "react";

const Cart = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <ReadBlogsPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default Cart;

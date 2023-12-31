import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import CartPage from "@/member/CartPage";
import ConfirmOrderPage from "@/member/ConfirmOrderPage";
import React from "react";

const Cart = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <ConfirmOrderPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default Cart;

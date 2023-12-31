import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import CartPage from "@/member/CartPage";
import React from "react";

const Cart = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <CartPage />
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default Cart;

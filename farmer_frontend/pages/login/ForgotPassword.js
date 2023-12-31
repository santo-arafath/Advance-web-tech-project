import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithCTAButton from "@/layouts/NavbarWithCTAButton";
import LoginForm from "../../login/LoginForm";
import { Flowbite } from "flowbite-react";
import React from "react";
import ForgotPasswordForm from "../../login/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Flowbite>
      <title>Login</title>
      <NavbarWithCTAButton />
      <ForgotPasswordForm />
      <FooterWithSocialMediaIcons />
    </Flowbite>
  );
};

export default ForgotPassword;

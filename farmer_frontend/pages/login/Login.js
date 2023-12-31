import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithCTAButton from "@/layouts/NavbarWithCTAButton";
import LoginForm from "../../login/LoginForm";
import { Flowbite } from "flowbite-react";
import React from "react";

const Login = () => {
  return (
    <Flowbite>
      <title>Login</title>
      <NavbarWithCTAButton />
      <LoginForm />
      <FooterWithSocialMediaIcons />
    </Flowbite>
  );
};

export default Login;

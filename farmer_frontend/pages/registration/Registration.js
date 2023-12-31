import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithCTAButton from "@/layouts/NavbarWithCTAButton";
import { Flowbite } from "flowbite-react";
import RegistrationForm from "../../registration/RegistrationForm";
import React from "react";
import DefaultNavbar from "../../layouts/DefaultNavbar";

const Registration = () => {
  return (
    <Flowbite>
      <title>Registration</title>
      <DefaultNavbar />
      <div className="flex flex-col items-center justify-center">
        <div className=" flex w-[600px] flex-col items-center justify-center rounded-lg shadow-lg">
          <p className="my-10 text-4xl">Registration</p>
          <RegistrationForm />
        </div>
      </div>
      <FooterWithSocialMediaIcons />
    </Flowbite>
  );
};

export default Registration;

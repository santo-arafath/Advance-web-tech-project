import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithCTAButton from "@/layouts/NavbarWithCTAButton";
import { Flowbite } from "flowbite-react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation_ll9r3svp.json";
import Hero from "../components/Hero";
import ChatBox from "../components/ChatBox";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Flowbite>
      <title>Smart Agriculture & Farming</title>
      <NavbarWithCTAButton />
      <Hero />
      <FooterWithSocialMediaIcons />
    </Flowbite>
  );
};

export default HomePage;

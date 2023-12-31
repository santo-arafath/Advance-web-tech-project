"use client";

import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { useRouter } from "next/router";

const DefaultNavbar = () => {
  const router = useRouter();
  const redirect = () => {
    router.push("./registration/Registration");
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        {/* <img
          alt="Nature Nurtures Logo"
          className="mr-3 h-6 sm:h-9"
          src="/n.png"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Smart Agriculture & Farming
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        {/* <Navbar.Link href="#">Pricing</Navbar.Link> */}
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DefaultNavbar;

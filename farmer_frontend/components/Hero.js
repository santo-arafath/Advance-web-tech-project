import React from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation_llth3j5e.json";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
  const redirect = () => {
    router.push("./registration/Registration");
  };
  return (
    <div className="z-0">
      <div className="hero min-h-screen">
        <div className="fullScreen">
          <img src="./1678157174007.png" className="rounded-lg shadow-2xl" />
        </div>
      </div>
      
      <div className="hero min-h-screen shadow-lg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="./Smart-farming-LetsNurture.jpg" className="max-w-lg rounded-lg shadow-2xl" />
          <div>
            <h1 className="mx-10 text-5xl font-bold">Explore Our Blog</h1>
            <h1 className="mx-10 mt-10 text-2xl">Dive into Smart Agriculture & Farming</h1>
            <p className="mx-10 py-6 ">
            Explore cutting-edge farming practices on our smart agriculture blog. 
            Stay updated with innovative technologies, precision farming, and 
            sustainable solutions. Discover insights, tips, and trends shaping the 
            future of farming for increased efficiency and eco-friendly practices. 
            Join our community and cultivate success with smart agriculture.
            </p>
            <button className="btn btn-primary mx-10">Get Started</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen shadow-lg">
        <div className="hero-content flex-col lg:flex-row">
          <img src="./fertilizer.png" className="max-w-lg rounded-lg shadow-2xl" />
          <div>
            <h1 className="mx-10 text-5xl font-bold">Shop Fertilizers and Equipments</h1>
            <h1 className="mx-10 mt-10 text-2xl">Bringing at Home</h1>
            <p className="mx-10 py-6">
            For efficient agriculture, consider sourcing quality fertilizers 
            and equipment. Choose fertilizers tailored to your crops' needs 
            for optimal growth. Purchase reliable equipment to enhance productivity 
            and streamline farming operations. Prioritize sustainable and environmentally 
            friendly options for a successful and responsible farming venture.
            </p>
            <button className="btn btn-primary mx-10">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

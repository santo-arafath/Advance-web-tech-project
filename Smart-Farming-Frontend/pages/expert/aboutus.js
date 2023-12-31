// pages/expert/About.js
import MyLayout from "../components/layout";


export default function About() {
  return (
    <>
      <MyLayout title="About Us" >

      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              About Our Smart Farming Platform
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              We are dedicated to revolutionizing agriculture by providing innovative solutions for farmers. Our platform connects farmers with experts, enabling them to find answers to their challenges and adopt smart farming practices.
            </p>
            {/* Add more content about your mission, values, and features */}
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/about.jpg" alt="about us" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Additional sections can be added for team members, mission, values, etc. */}

      </MyLayout>
    </>
  );
}

import MyLayout from "./components/layout"
import Footer from "../pages/components/Footer"

export default function Home() {

    return (
        <>
             <MyLayout title="Home" />

<section className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
        Smart Solutions for Farmers
      </h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        Empowering farmers with innovative solutions. Connect with experts and find answers to your agricultural challenges.
      </p>
      {/* Modify the buttons accordingly */}
      <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 ...">
        Connect with Agriculture Experts
      </button>
      <button type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 ...">
        Explore Agricultural Solutions
      </button>
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img src="im.jpg" alt="mockup" />
    </div>
  </div>
</section>
            <Footer />
        </>
    )
}
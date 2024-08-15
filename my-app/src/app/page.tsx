
import Navbar from "./components/navbar";
import Hero from "./components/landing/hero";
import Testimony from "./components/landing/testimony";
import Features from "./components/landing/features";
import Pricing from "./components/landing/pricing";
import Why from "./components/landing/why";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar role={"fixed"} />
      <div className="flex flex-col gap-20">
        <Hero />
        <Testimony />
        <Features />
        <Pricing />
        <Why/>
        <Footer/>
      </div>
    </>
  );
}

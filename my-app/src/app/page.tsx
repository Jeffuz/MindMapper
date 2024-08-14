import Navbar from "./components/navbar";
import Hero from "./components/landing/hero";
import Testimony from "./components/landing/testimony";
import Features from "./components/landing/features";
import Pricing from "./components/landing/pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-20">
        <Hero />
        <Testimony />
        <Features />
        <Pricing />
      </div>
    </>
  );
}

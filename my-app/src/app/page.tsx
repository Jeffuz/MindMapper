import Navbar from "./components/navbar";
import Hero from "./components/landing/hero";
import Testimony from "./components/landing/testimony";
import Features from "./components/landing/features";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-20">
        <Hero />
        <Testimony />
        <Features/>
      </div>
    </>
  );
}

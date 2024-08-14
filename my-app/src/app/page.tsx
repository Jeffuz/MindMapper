import Navbar from "./components/navbar";
import Hero from "./components/landing/hero";
import Testimony from "./components/landing/testimony";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-10">
        <Hero />
        <Testimony />
      </div>
    </>
  );
}

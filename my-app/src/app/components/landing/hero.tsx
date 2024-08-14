import Image from "next/image";

const hero = () => {
  return (
    <div className="flex items-center justify-between h-screen bg-teal1">
      {/* Left */}
      <div className="text-white flex flex-col gap-7 lg:ml-28 mx-10 w-full lg:w-[40%]">
        {/* Slogan */}
        <div className="font-bold lg:text-5xl text-4xl">
          Map Your Knowledge, Master Your Mind.
        </div>
        {/* Description */}
        <div className="lg:text-xl text-lg">
          MindMapper is an AI-powered platform that helps you master any
          subject, from vocabulary to history to science.
        </div>
        {/* CTA */}
        <div className="flex gap-5">
          <button className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md">
            Get Started
          </button>
          <button className="bg-white hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md">
            Learn More
          </button>
        </div>
      </div>
      {/* Right */}
      <div className="text-white lg:block hidden mx-auto">
        <Image
          src="/hero_logo.png"
          alt="Flashcard App Hero Image"
          width={600}
          height={600}
          style={{ aspectRatio: "600/600", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default hero;

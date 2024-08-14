import Features_cards from "./features_cards";
import { TbBrain, TbHighlight, TbChartBar } from "react-icons/tb";

const features = () => {
  const features = [
    {
      symbol: <TbBrain size={45}/>,
      title: "AI-Powered Flashcard Generation",
      description:
        "Automatically generate personalized flashcards from any content, tailored to your learning needs using advanced AI technology.",
    },
    {
      symbol: <TbHighlight size={45}/>,
      title: "Quick and Easy Setup",
      description:
        "Get started in minutes with an intuitive interface that makes it easy to create, organize, and study your flashcards.",
    },
    {
      symbol: <TbChartBar size={45}/>,
      title: "Advanced Analytics",
      description:
        "Track your progress with detailed analytics that show your strengths, weaknesses, and areas for improvement.",
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-5 w-full items-center">
      {/* Title */}
      <div className="text-3xl font-bold">Features</div>
      {/* Description */}
      <div className="text-lg text-gray-500">
        Discover how MindMapper can help you learn and grow.
      </div>
      {/* User feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:mx-28 mx-6 mt-5">
        {features.map((feature, index) => (
          <Features_cards
            symbol={feature.symbol}
            title={feature.title}
            description={feature.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default features;

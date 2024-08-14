import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";
import { GrPlan } from "react-icons/gr";
import { IoAccessibilityOutline } from "react-icons/io5";
import Why_cards from "./why_cards";

const why = () => {
  const whyMindMapper = [
    {
      symbol: <FaRegLightbulb size={45}/>,
      title: "AI-Powered Learning",
      description:
        "Harness the power of artificial intelligence to generate personalized flashcards that cater to your unique learning needs. MindMapper ensures you focus on what matters most, making studying more effective and efficient.",
    },
    {
      symbol: <MdOutlineSpeed size={45}/>,
      title: "Easy to Use",
      description:
        "Get started in minutes with our user-friendly interface. Whether you're a student or a professional, MindMapper is designed to be intuitive and straightforward, allowing you to create, organize, and study your flashcards with ease.",
    },
    {
      symbol: <GrPlan size={45}/>,
      title: "Tailored Study Plans",
      description:
        "Stay on track with personalized study plans that adapt to your progress. MindMapper helps you prioritize your study time and ensures you're always prepared for exams or important presentations.",
    },
    {
      symbol: <IoAccessibilityOutline size={45}/>,
      title: "Affordable and Accessible",
      description:
        "Enjoy high-quality learning tools without breaking the bank. MindMapper offers affordable pricing plans that provide access to powerful features, making advanced learning tools accessible to everyone.",
    },
  ];
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Title */}
      <div className="text-3xl font-bold">Why Choose MindMapper App?</div>
      {/* Description */}
      <div className="text-lg text-gray-500">
        Discover the benefits of our AI-powered flashcard platform.
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:mx-28 mx-6 mt-5">
        {whyMindMapper.map((why, index) => (
          <Why_cards
            symbol={why.symbol}
            title={why.title}
            description={why.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default why;

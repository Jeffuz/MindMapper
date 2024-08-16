import { LuBookOpen } from "react-icons/lu";

const deck_card = ({ title, subtitle, amount }: any) => {
  return (
    <div className="flex flex-col justify-between bg-teal2 rounded-lg 
    shadow-lg p-5 aspect-video hover:brightness-125 transition-all duration-200">
      {/* Titles */}
      <div className="flex flex-col">
        {/* title */}
        <div className="text-xl font-bold">{title}</div>
        {/* Subtitle */}
        <div className="text-gray-700">{subtitle}</div>
      </div>
      {/* Card Amount */}
      <div className="flex items-center gap-2">
        <LuBookOpen size={25} />
        <div>{amount}</div>
      </div>
      {/* Button */}
      <div className="w-full flex justify-between md:flex-row flex-col gap-3">
        <button className="w-full md:w-[70%] bg-orange1 hover:bg-orange-600/80 py-2 text-white 
        rounded-lg shadow-lg transition duration-200">
          Open Deck
        </button>
        <button className="w-full md:w-[30%] hover:bg-white rounded-lg transition duration-200">
          Edit
        </button>
      </div>
    </div>
  );
};

export default deck_card;

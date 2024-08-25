"use client";

import { LuBookOpen } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Deck_card = ({ id, title, subtitle, amount }: any) => {
  const router = useRouter();

  // Edit Deck
  const handleClickEdit = () => {
    router.push(`/deck/edit?deckId=${id}`);
  };

  // Open Deck for studying
  const handleClickOpen = () => {
    router.push(`/dashboard/study?id=${id}`);
  };

  return (
    <div
      className="flex flex-col justify-between bg-teal3 rounded-lg 
    shadow-lg p-5 aspect-video"
    >
      {/* Titles */}
      <div className="flex flex-col">
        {/* title */}
        <div className="text-xl font-bold text-white">{title}</div>
        {/* Subtitle */}
        <div className="text-white">{subtitle}</div>
      </div>
      {/* Card Amount */}
      <div className="flex items-center gap-2 text-white">
        <LuBookOpen size={25} />
        <div>{amount}</div>
      </div>
      {/* Button */}
      <div className="w-full flex justify-between md:flex-row flex-col gap-3">
        <button
          onClick={handleClickOpen}
          className="w-full md:w-[70%] bg-orange1 hover:bg-orange1/80 py-2 text-white 
        rounded-lg shadow-lg transition duration-200"
        >
          Open Deck
        </button>
        <button
          onClick={handleClickEdit}
          className="w-full md:w-[30%] hover:bg-white rounded-lg transition duration-200 text-white hover:text-black"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Deck_card;

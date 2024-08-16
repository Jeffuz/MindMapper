import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const CreateCard = ({
  index,
  term,
  definition,
  handleTermChange,
  handleDefinitionChange,
  handleDeleteCard,
}: any) => {
  return (
    <div className="flex flex-col gap-3 p-5 bg-teal1 rounded-lg shadow lg mb-4">
      {/* Index + Trash */}
      <div className="flex justify-between w-full pb-2">
        {/* Index */}
        <div className="text-white font-bold text-2xl rounded-lg px-3 py-1 bg-orange1">{index + 1}</div>
        {/* Trash */}
        <button
          onClick={() => handleDeleteCard(index)}
          className="text-orange1 hover:text-orange1/80 transition duration-500"
        >
          <FaRegTrashAlt size={25} />
        </button>
      </div>
      <div className="flex md:flex-row flex-col gap-5">
        {/* Text Fields */}
        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            placeholder={`Enter term`}
            value={term}
            onChange={(e) => handleTermChange(index, e.target.value)}
            className="appearance-none py-2 px-3 text-black leading-tight  placeholder-gray-400 focus:outline-none focus:shadow-outline border-b-4 hover:border-b-orange1 focus:border-b-orange1 bg-transparent transition duration-500"
            />
          <label className="text-sm text-white">Term</label>
        </div>
        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            placeholder={`Enter definition`}
            value={definition}
            onChange={(e) => handleDefinitionChange(index, e.target.value)}
            className="appearance-none py-2 px-3 text-black leading-tight  placeholder-gray-400 focus:outline-none focus:shadow-outline border-b-4 hover:border-b-orange1 focus:border-b-orange1 bg-transparent transition duration-500"
            />
          <label className="text-sm text-white">Definition</label>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;

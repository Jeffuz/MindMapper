const why_cards = ({ symbol, title, description }: any) => {
  return (
    <div className="w-full flex flex-col bg-teal2 gap-5 text-gray-800 rounded-lg p-10 shadow-lg">
      {/* Symbol */}
      <div className="text-teal3">{symbol}</div>
      {/* Title */}
      <div className="font-bold">{title}</div>
      {/* Description */}
      <div className="font-medium">{description}</div>
    </div>
  );
};

export default why_cards;

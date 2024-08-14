const features_cards = ({ symbol, title, description }: any) => {
  return (
    <div className="bg-orange2 text-gray-800 transition duration-700 flex flex-col rounded-lg p-5 shadow-lg gap-3">
      {/* Symbol */}
      <div>{symbol}</div>
      {/* Title */}
      <div className="font-bold">{title}</div>
      {/* Description */}
      <div>{description}</div>  
    </div>
  );
};

export default features_cards;
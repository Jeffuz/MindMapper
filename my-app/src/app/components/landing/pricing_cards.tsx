"use client";
import { CiCircleCheck } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  tier: string;
  description: string;
  price: string;
  features: string[];
  status: string;
}

const PricingCards: React.FC<PricingCardProps> = ({
  tier,
  description,
  price,
  features,
  status,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (tier === "Free") {
      router.push("/signup");
    } else {
      router.push(`/subscribe?subType=${tier}`);
    }
  };

  return (
    <div className="bg-white flex flex-col justify-between rounded-lg p-10 shadow-lg gap-16">
      {/* details */}
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col">
          <div className="font-bold text-xl">{tier}</div>
          <div className="font-medium text-gray-700">{description}</div>
        </div>

        {/* Price + Features */}
        <div className="flex flex-col gap-10">
          {/* Price */}
          <div className="flex gap-2">
            <span className="text-4xl font-bold">{price}</span>
            <span className="inline-block align-bottom text-gray-600 tracking-wide">
              /year
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <div className="text-teal1">
                  <CiCircleCheck size={25} />
                </div>
                <div>{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* button */}
      <div>
        <button
          onClick={handleClick}
          className="bg-orange1 hover:bg-orange1/80 text-white transition duration-500 py-3 px-8 rounded-md shadow-lg"
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default PricingCards;

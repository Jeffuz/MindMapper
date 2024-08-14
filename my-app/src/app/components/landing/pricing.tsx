import Pricing_cards from "./pricing_cards";
const pricing = () => {
  const pricingTiers = [
    {
      tier: "Free",
      price: "$0",
      description: "Get started for free",
      features: [
        "Limited flashcard decks",
        "Basic AI-generated flashcards",
      ],
      status: "Sign Up",
    },
    {
      tier: "Basic",
      price: "$0.49",
      description: "Unlock more features",
      features: [
        "Unlimited flashcards",
        "Detailed progress tracking",
        "High quality AI-generated flashcards",
      ],
      status: "Subscribe",
    },
    {
      tier: "Pro",
      price: "$0.99",
      description: "Unlock maximum features",
      features: [
        "Create unlimited flashcards",
        "High quality AI-generated flashcards",
        "Advanced analytics and progress insights",
        "AI-generated flashcards based on your content",
        "Early access to new features",
      ],
      status: "Subscribe",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full items-center bg-teal2 pt-20">
      <div className="text-3xl font-bold mx-6">Pricing</div>
      <div className="text-lg text-gray-900 mx-6">
        Choose the plan that fits your needs and budget.
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 md:mx-28 mx-6 mt-5">
        {pricingTiers.map((price, index) => (
          <Pricing_cards
            key={index}
            tier={price.tier}
            description={price.description}
            price={price.price}
            features={price.features}
            status={price.status}
          />
        ))}
      </div>
    </div>
  );
};

export default pricing;

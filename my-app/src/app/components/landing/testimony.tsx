import Testimony_cards from "./testimony_cards";

const testimony = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Student",
      feedback:
        "MindMapper has been a game-changer for my studies. The personalized learning experience and advanced analytics have helped me improve my retention and performance.",
    },
    {
      name: "Jane Smith",
      role: "Teacher",
      feedback:
        "As a teacher, I've been using MindMapper to create engaging learning experiences for my students. The collaborative features have been a game-changer in my classroom.",
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-5 w-full items-center">
      {/* Title */}
      <div className="text-3xl font-bold">Testimonials</div>
      {/* Description */}
      <div className="text-lg text-gray-500">
        Hear what our users have to say about Flashcard App.
      </div>
      {/* User feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:mx-28 mx-6">
        {testimonials.map((testimonial, index) => (
          <Testimony_cards
            key={index}
            name={testimonial.name}
            role={testimonial.role}
            feedback={testimonial.feedback}
          />
        ))}
      </div>
    </div>
  );
};

export default testimony;

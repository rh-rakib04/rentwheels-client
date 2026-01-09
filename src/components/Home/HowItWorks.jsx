import { FaSearch, FaCar, FaKey } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Search a Car",
      desc: "Browse available cars using filters and search.",
    },
    {
      icon: <FaCar />,
      title: "Book Instantly",
      desc: "Choose your date and book in a few clicks.",
    },
    {
      icon: <FaKey />,
      title: "Drive & Enjoy",
      desc: "Pick up your car and enjoy the journey.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        How RentWheels Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-md bg-base-100 hover:shadow-xl transition"
          >
            <div className="text-4xl text-yellow-500 mb-4 mx-auto">
              {step.icon}
            </div>
            <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
            <p className="text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

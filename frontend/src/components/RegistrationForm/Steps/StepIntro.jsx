import { Button } from "../../Ui/Button";

const StepIntro = ({ handleNext }) => {
  const info = [
    {
      title: "Getting Started",
      text: "Learn what this platform is and how it helps parents and children with ASD.",
    },
    {
      title: "Why Register?",
      text: "Get access to therapists, track progress, and receive tailored support at home.",
    },
    {
      title: "After You Register",
      text: "Your info will be reviewed by a manager and therapist, and you’ll be notified by SMS or email.",
    },
  ];

  return (
    <div className="min-h-screen bg-cutomBlue-100 flex flex-col">
      {/* Info cards */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-24">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Help Desk</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {info.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border-t-4 border-indigo-600"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hero section */}
      <section className="py-6 px-4 text-center relative overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          A space to connect with therapists, track development, and support your child with ASD.
        </h1>

        <Button
          onClick={handleNext}
          className="bg-indigo-700 text-white hover:bg-indigo-800 px-6 py-2 mt-4 rounded-full shadow"
        >
          Register Now
        </Button>
      </section>
    </div>
  );
};

export default StepIntro;

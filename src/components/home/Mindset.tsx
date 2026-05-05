import { Zap, ArrowRight, Mic } from "lucide-react";

interface MindsetProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export default function Mindset({ onGetStarted, onWatchDemo }: MindsetProps) {
  const principles = [
    "Is it right for the customer?",
    "Is it simple?",
    "Can it be automated?",
  ];

  return (
    <section className="bg-sara-dark-green px-6 py-12 text-sara-off-white sm:px-12 sm:py-12 lg:px-24 lg:py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        {/* MINDSET HEADER */}
        {/* <div className="text-center space-y-4 mb-12"> */}

        <div className="text-center space-y-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.28em] text-sara-light-grey sm:text-[16px]">
            Our Mindset
          </span>
          <h2 className="text-3xl leading-tight tracking-tight text-sara-off-white md:text-5xl">
            A "no frills" approach.
          </h2>
        </div>

        {/* PRINCIPLES LIST */}
        <div className="w-full max-w-2xl space-y-4 mb-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 rounded-2xl border border-sara-light-green/16 bg-sara-black/20 p-4 transition-all hover:border-sara-light-green/35"
            >
              <div className="text-sara-light-green transition-transform group-hover:scale-110">
                <Zap size={24} fill="currentColor" fillOpacity={0.2} />
              </div>
              <p className="text-lg tracking-tight text-sara-off-white sm:text-xl">
                {principle}
              </p>
            </div>
          ))}
        </div>

        {/* MISSION STATEMENT */}
        <p className="mb-8 max-w-2xl text-center text-sm leading-relaxed text-sara-light-grey sm:text-base">
          Our mission is to revolutionise utilities through simplicity and
          automation. Just Tradie Mobile is built for tradies who want to focus
          on the job — not the phone.
        </p>

        {/* FINAL CTA SECTION */}
        <div className="text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-tight text-sara-off-white md:text-5xl">
              Ready to stop losing jobs?
            </h2>
            <p className="text-sara-light-grey text-base max-md:text-sm">
              Set up in minutes. No contracts. Just more customers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="flex w-full items-center justify-center gap-3 rounded-sm bg-sara-light-green px-6 py-3 text-sm uppercase tracking-[0.24em] text-sara-dark-green transition-all duration-300 hover:scale-105 hover:bg-[#b7c5a2] active:scale-95 sm:w-auto"
            >
              Get Started Now
              <ArrowRight size={20} />
            </button>

            <button
              onClick={onWatchDemo}
              className="group flex w-full items-center justify-center gap-3 rounded-sm border border-sara-light-green/30 px-6 py-3 text-sm uppercase tracking-[0.24em] text-sara-off-white transition-all duration-300 hover:border-sara-light-green hover:text-sara-light-green sm:w-auto"
            >
              <Mic size={20} className="group-hover:text-sara-light-green" />
              Watch Demo First
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

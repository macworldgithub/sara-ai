import { PhoneCall, Bot, ClipboardList, Send, Play } from "lucide-react";

interface HowItWorksProps {
  onGetStarted: () => void;
}

export default function HowItWorks({ onGetStarted }: HowItWorksProps) {
  const steps = [
    {
      number: "01",
      icon: <PhoneCall size={24} className="text-sara-dark-green" />,
      title: "Customer Calls",
      description:
        "A customer calls your business number. The phone rings 3 times.",
    },
    {
      number: "02",
      icon: <Bot size={24} className="text-sara-dark-green" />,
      title: "Bele.Ai Picks Up",
      description:
        "If you don't answer, Bele.Ai answers with a professional greeting using your business name.",
    },
    {
      number: "03",
      icon: <ClipboardList size={24} className="text-sara-dark-green" />,
      title: "Qualifies & Captures",
      description:
        "Detects their number via CLI, captures name, address, and reason — then checks if it's the right trade.",
    },
    {
      number: "04",
      icon: <Send size={24} className="text-sara-dark-green" />,
      title: "SMS Delivered",
      description:
        "Full lead details sent to your phone instantly. Optional copy to a partner or office manager.",
    },
  ];

  return (
    <section className="border-t border-sara-dark-green/10 bg-sara-off-white px-6 py-24 text-sara-dark-green sm:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        {/* HEADER */}
        <div className="text-center space-y-4 mb-20 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.28em] text-sara-mid-grey sm:text-[11px]">
            How It Works
          </span>
          <h2 className="text-4xl leading-tight tracking-tight text-sara-dark-green md:text-5xl">
            Four steps. Zero missed leads.
          </h2>
          <p className="text-base text-sara-mid-grey sm:text-lg">
            From missed call to qualified lead in under 60 seconds.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative space-y-6 overflow-hidden rounded-[2rem] border border-sara-dark-green/10 bg-white/70 p-8 transition-all hover:border-sara-dark-green/20 hover:bg-white"
            >
              {/* SHINE EFFECT */}
              <div className="absolute right-0 top-0 -z-10 h-32 w-32 bg-sara-light-green/20 blur-3xl transition-colors group-hover:bg-sara-light-green/30" />

              <div className="flex justify-between items-start">
                <span className="font-display text-4xl text-sara-dark-green/20 transition-colors group-hover:text-sara-dark-green/35">
                  {step.number}
                </span>
                <div className="rounded-xl bg-sara-dark-green/10 p-3 transition-transform group-hover:scale-110">
                  {step.icon}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl leading-tight text-sara-dark-green">
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed text-sara-mid-grey">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 flex justify-center">
          <button 
            onClick={onGetStarted}
            className="flex items-center gap-3 rounded-sm border border-sara-dark-green/15 bg-sara-dark-green px-8 py-4 text-sm uppercase tracking-[0.24em] text-sara-off-white transition-all duration-300 hover:scale-105 hover:bg-sara-black"
          >
            Build Your AI Agent
            <Play size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </section>
  );
}

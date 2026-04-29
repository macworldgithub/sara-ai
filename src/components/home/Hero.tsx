import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  return (
    <section className="bg-sara-black px-6 pb-10 pt-8 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-[1500px] rounded-xl border border-sara-light-green/20 bg-sara-dark-green px-8 py-10 shadow-sara-soft sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <div className="flex w-full max-w-4xl flex-col items-start text-left">
          <div className="mb-8 inline-flex items-center rounded-sm bg-sara-light-green px-4 py-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-sara-dark-green">
              Smart AI Response Assistant
            </span>
          </div>

          <h1 className="mb-6 max-w-3xl text-5xl leading-[0.95] text-sara-off-white md:text-7xl">
            Automate the work.
            <br />
            <span className="italic text-sara-light-green">
              Keep the relationship.
            </span>
          </h1>

          <p className="mb-10 max-w-3xl text-base leading-[1.9] text-sara-light-grey sm:text-lg">
            SARA handles your inbound conversations, qualifies leads, and books
            appointments so your team focuses on closing, not chasing.
          </p>

          <div className="mb-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <button
            onClick={onGetStarted}
            className="flex w-full items-center justify-center rounded-md bg-sara-light-green px-8 py-4 text-sm uppercase tracking-[0.25em] text-sara-dark-green transition-all duration-300 hover:bg-[#b7c5a2] sm:w-auto"
          >
            Get Started
          </button>

          <button
            onClick={onWatchDemo}
            className="group flex w-full items-center justify-center gap-3 rounded-md border border-sara-light-grey/35 px-8 py-4 text-sm uppercase tracking-[0.25em] text-sara-off-white transition-all hover:border-sara-light-green hover:text-sara-light-green sm:w-auto"
          >
            See How It Works
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          </div>

          <div className="grid w-full max-w-3xl grid-cols-1 gap-8 border-t border-sara-light-green/20 pt-8 sm:grid-cols-3 sm:gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-display text-5xl leading-none text-sara-light-green">
                3x
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-sara-light-grey">
                Faster Response
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-5xl leading-none text-sara-light-green">
                24/7
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-sara-light-grey">
                Always On
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-5xl leading-none text-sara-light-green">
                ~40%
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-sara-light-grey">
                Less Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

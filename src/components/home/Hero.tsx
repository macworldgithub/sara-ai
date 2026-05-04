import { ArrowRight } from "lucide-react";
import heroImg from "../../../src/assets/image.png"; // 👈 update path if needed

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  return (
    <section className="bg-sara-black px-6 pb-10 pt-8 sm:px-10 lg:px-18">
      <div className="mx-auto w-full max-w-[1500px] rounded-xl border border-sara-light-green/20 bg-sara-dark-green px-8 py-0 shadow-sara-soft sm:px-10 sm:py-10 lg:px-16 lg:py-0">
        <div className="flex w-full flex-col lg:flex-row items-center lg:items-center  gap-12">
          {/* LEFT CONTENT */}
          <div className="w-full xl:w-[60%] lg:w-[50%] flex flex-col items-start text-left">
            <div className="mb-8 inline-flex items-center rounded-sm bg-sara-light-green px-4 py-2">
              <span className="text-[16px] max-sm:text-[10px] uppercase text-sara-dark-green">
                Smart AI Response Assistant
              </span>
            </div>

            {/* <h1 className="mb-6 max-w-3xl text-4xl sm:text-5xl leading-[0.95] text-sara-off-white md:text-7xl">
              Automate <span className="block sm:inline">the work</span>
              <br />
              <span className="italic text-sara-light-green">
                Keep the relationship.
              </span>
            </h1> */}

            <h1 className="mb-6 max-w-3xl text-4xl sm:text-5xl leading-[0.95] text-sara-off-white md:text-7xl">
              Automate <span className="block sm:inline">the work</span>
              <br />
              <span className="italic text-sara-light-green">
                <span className="block sm:inline">Keep</span>{" "}
                <span className="block sm:inline">the relationship.</span>
              </span>
            </h1>

            <p className="mb-10 max-w-3xl sm:text-base leading-[1.9] text-sara-light-grey text-sm">
              SARA handles your inbound conversations, qualifies leads, and
              books appointments so your team focuses on closing, not chasing.
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
                className="group flex w-full items-center justify-center gap-3 rounded-md border border-sara-light-grey/35 px-8 py-4 text-sm uppercase text-sara-off-white transition-all hover:border-sara-light-green hover:text-sara-light-green sm:w-auto max-sm:text-[14px]"
              >
                See How It Works
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid w-full max-w-3xl grid-cols-3  gap-8 border-t border-sara-light-green/20 pt-8 sm:gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-display text-5xl leading-none text-sara-light-green max-md:text-3xl">
                  3x
                </span>
                <span className="text-[16px] uppercase text-sara-light-grey max-sm:text-[10px]">
                  Faster Response
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-5xl leading-none text-sara-light-green max-md:text-3xl">
                  24/7
                </span>
                <span className="text-[16px] uppercase text-sara-light-grey max-sm:text-[10px]">
                  Always On
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-5xl leading-none text-sara-light-green max-md:text-3xl">
                  ~40%
                </span>
                <span className="text-[16px] uppercase text-sara-light-grey max-sm:text-[10px]">
                  Less Admin
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="hidden lg:flex xl:w-[40%] max-xl:w-[50%] justify-end">
            <img
              src={heroImg}
              alt="Hero"
              className="w-full max-w-[650px] h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

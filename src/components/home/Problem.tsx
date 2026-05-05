import manIllustration from "../../assets/man.png";
import { PhoneOff, TrendingDown } from "lucide-react";

export default function Problem() {
  return (
    <section className="border-t border-sara-dark-green/10 bg-sara-off-white px-6 py-12 text-sara-dark-green sm:px-12 sm:py-12 lg:px-24 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:gap-20 xl:flex-row">
        {/* LEFT COLUMN: Text Content */}
        <div className="w-full xl:w-1/2 space-y-8 sm:space-y-10 order-2 xl:order-1 text-left">
          {/* Section Label */}
          <span className="text-[16px] max-sm:text-[10px] uppercase tracking-[0.28em] text-sara-mid-grey">
            The Problem
          </span>

          {/* Main Headline */}
          <h2 className="text-4xl leading-tight tracking-tight text-sara-dark-green md:text-6xl ">
            Missed calls mean <br className="hidden sm:block" />
            <span className="italic text-sara-light-green">
              missed business.
            </span>
          </h2>

          {/* Body Text */}
          <p className="max-w-xl sm:text-base leading-relaxed text-sara-mid-grey text-sm  ">
            You're on a job, your hands are full, and the phone keeps ringing.
            By the time you check, the customer's already called someone else.
            It happens every single day to tradies across Australia.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 ">
            {/* Card 1 */}
            <div className="flex items-start gap-4 rounded-2xl border border-sara-dark-green/10 bg-white/70 p-4 transition-all group hover:border-sara-dark-green/25">
              <div className="rounded-lg bg-sara-dark-green/10 p-3 text-sara-dark-green transition-transform group-hover:scale-110">
                <PhoneOff size={20} />
              </div>
              <div className="-mt-1">
                <h4 className="text-base font-medium text-sara-dark-green sm:text-lg">
                  1 in 3 calls are missed
                </h4>
                <p className="text-xs text-sara-mid-grey sm:text-sm">
                  Home service businesses miss a third of all inbound calls
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start gap-4 rounded-2xl border border-sara-dark-green/10 bg-white/70 p-4 transition-all group hover:border-sara-dark-green/25">
              <div className="rounded-lg bg-sara-dark-green/10 p-3 text-sara-dark-green transition-transform group-hover:scale-110">
                <TrendingDown size={20} />
              </div>
              <div className="-mt-1">
                <h4 className="text-base font-medium text-sara-dark-green sm:text-lg">
                  80% call the next tradie
                </h4>
                <p className="text-xs text-sara-mid-grey sm:text-sm">
                  Customers don't leave voicemails — they move on immediately
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Illustration/Image */}
        <div className="w-full xl:w-1/2 relative order-1 xl:order-2 group">
          <div className="relative h-[300px] overflow-hidden rounded-[2rem] border border-sara-dark-green/12 shadow-sara-soft sm:min-h-[400px] lg:min-h-[550px]">
            <img
              src={manIllustration}
              alt="Tradie working on a job"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Dark Overlay for bottom text stability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sara-black/90 via-sara-black/20 to-transparent" />

            {/* Illustration Label Overlay */}
            <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12">
              <div className="inline-block rounded-md border border-sara-light-green/30 bg-sara-off-white/85 px-5 py-3 text-[8px] uppercase tracking-[0.25em] text-sara-dark-green shadow-2xl backdrop-blur-xl sm:text-[10px]">
                Every missed call is a lost job.
              </div>
            </div>
          </div>

          {/* Enhanced background glow */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-sara-light-green/20 opacity-70 blur-[100px]" />
        </div>
      </div>
    </section>
  );
}

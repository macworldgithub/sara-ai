import solutionIllustration from "../../assets/solution.png";
import {
  Mic,
  Fingerprint,
  ShieldCheck,
  MessageSquare,
  Clock,
  Users,
} from "lucide-react";

export default function Solution() {
  const features = [
    {
      icon: <Mic size={20} />,
      title: "AI Voice Agent",
      description: "Natural conversation, not a robot",
    },
    {
      icon: <Fingerprint size={20} />,
      title: "CLI Detection",
      description: "Auto-detects caller number",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Call Qualification",
      description: "Checks if it's the right trade",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Instant SMS",
      description: "Lead details sent immediately",
    },
    {
      icon: <Clock size={20} />,
      title: "After Hours",
      description: "Different greeting outside hours",
    },
    {
      icon: <Users size={20} />,
      title: "Secondary SMS",
      description: "Copy to partner or office",
    },
  ];

  return (
    <section className="bg-sara-black px-6 py-24 text-sara-off-white sm:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:gap-24 xl:flex-row">
        {/* LEFT COLUMN: Illustration/Image */}
        <div className="w-full xl:w-1/2 relative group">
          <div className="relative h-[350px] overflow-hidden rounded-[2rem] border border-sara-light-green/10 shadow-sara-soft sm:min-h-[450px] lg:min-h-[550px]">
            <img
              src={solutionIllustration}
              alt="Bele.Ai Solution Illustration"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark Overlay for bottom text stability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sara-black/80 via-transparent to-transparent" />

            {/* Illustration Label Overlay */}
            <div className="absolute bottom-6 left-8 sm:bottom-12 sm:left-12">
              <div className="inline-block rounded-sm border border-sara-light-green/25 bg-sara-dark-green/80 px-5 py-3 text-[8px] uppercase tracking-[0.25em] text-sara-off-white backdrop-blur-md sm:text-[10px]">
                AI answers. You get the job.
              </div>
            </div>
          </div>

          {/* Subtle glow behind image */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-sara-light-green/15 opacity-50 blur-[120px]" />
        </div>

        {/* RIGHT COLUMN: Text Content & Features */}
        <div className="w-full xl:w-1/2 space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.28em] text-sara-light-grey sm:text-[11px]">
              The Solution
            </span>
            <h2 className="text-4xl leading-[1.05] tracking-tight text-sara-off-white md:text-6xl">
              Bele.Ai answers <br />
              <span className="italic text-sara-light-green">
                so you don't have to.
              </span>
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-relaxed text-sara-light-grey md:text-base">
            When a customer calls and you can't answer, Bele.Ai picks up after 3
            rings. It greets the caller professionally, qualifies the job,
            captures all their details, and sends you an SMS instantly.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 rounded-xl border border-sara-light-green/10 bg-sara-dark-grey/70 p-4 transition-all hover:border-sara-light-green/30 hover:bg-sara-dark-grey"
              >
                <div className="rounded-lg bg-sara-light-green/10 p-2.5 text-sara-light-green transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <div className="-mt-[2px]">
                  <h4 className="text-sm leading-tight text-sara-off-white sm:text-base">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] tracking-wide text-sara-light-grey sm:text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

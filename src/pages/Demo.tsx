import { useState } from "react";
import {
  Phone,
  Sun,
  Moon,
  User,
  MapPin,
  Settings,
  Volume2,
  ArrowLeft,
} from "lucide-react";

interface DemoProps {
  onBack: () => void;
}

export default function Demo({ onBack }: DemoProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const rings = 0;
  const status = "SYSTEM IDLE";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-sara-black text-sara-off-white">
      {/* TOP NAVBAR */}
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-sara-light-green/15 bg-sara-black px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-sara-light-grey hover:text-sara-off-white transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-1">
            <span className="font-bold text-sara-light-green">~</span>
            <span className="text-sm uppercase tracking-[0.2em] text-sara-off-white">
              JUST
            </span>
            <span className="text-sm uppercase tracking-[0.2em] text-sara-light-green">
              Tradie AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Volume2
            size={20}
            className="cursor-pointer text-sara-light-green hover:text-sara-off-white"
          />
          <Settings
            size={20}
            className="cursor-pointer text-sara-mid-grey hover:text-sara-off-white transition-all"
            onClick={() => setShowConfig(!showConfig)}
          />
        </div>
      </nav>

      {/* BUSINESS CONFIGURATION MODAL (Bar at top) */}
      {showConfig && (
        <div className="w-full animate-in border-b border-sara-light-green/15 bg-sara-dark-grey p-6 slide-in-from-top duration-300">
          <div className="max-w-[1400px] mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-sara-light-green">
                Business Configuration
              </span>
              <button
                onClick={() => setShowConfig(false)}
                className="flex items-center gap-2 text-[10px] uppercase text-sara-mid-grey hover:text-sara-off-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ConfigInput
                label="Business Name"
                defaultValue="Jon's Plumbing"
              />
              <ConfigInput label="Owner Name" defaultValue="Jon" />
              <ConfigInput
                label="Trade Type"
                defaultValue="Tradesperson"
                isSelect
              />
              <ConfigInput label="Phone Number" defaultValue="02 8488 8484" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* CENTER CONTENT (Main Demo) */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto bg-sara-dark-green/18 p-8">
          <div className="max-w-xl w-full flex flex-col items-center text-center space-y-8 py-12">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-sm border border-sara-light-green/20 bg-sara-dark-grey px-4 py-2">
              <Phone size={14} className="text-sara-light-green" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-sara-light-green">
                Live Demo
              </span>
            </div>

            {/* HEADERS */}
            <div className="space-y-4">
              <h1 className="text-3xl leading-tight tracking-tight text-sara-off-white md:text-5xl">
                Experience Tradie AI in Action
              </h1>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-sara-light-grey">
                Watch how Tradie AI handles a missed call, captures the
                lead, and sends a real SMS to your phone.
              </p>
            </div>

            {/* INPUT SECTION */}
            <div className="w-full space-y-2 text-left">
              <div className="ml-1 flex items-center gap-2 text-sara-light-green">
                <div className="flex h-5 w-4 items-center justify-center rounded-sm border-2 border-sara-light-green">
                  <div className="mb-3 h-0.5 w-0.5 rounded-full bg-sara-light-green" />
                </div>
                <label className="text-[10px] font-black uppercase tracking-widest">
                  Your Mobile Number
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="0412 345 678"
                  className="w-full rounded-2xl border border-sara-light-green/12 bg-sara-dark-grey px-6 py-3 font-mono tracking-wider text-sara-off-white placeholder-sara-mid-grey transition-all focus:outline-none focus:border-sara-light-green/50"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-sara-mid-grey">
                  AU
                </span>
              </div>
              <p className="text-center text-[10px] text-sara-mid-grey">
                You'll receive a real SMS confirmation when the demo completes
              </p>
            </div>

            {/* BUTTONS */}
            <div className="w-full space-y-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-md bg-sara-light-green px-8 py-3 text-sm uppercase tracking-[0.24em] text-sara-dark-green transition-all hover:bg-[#b7c5a2]">
                <Sun size={20} className="stroke-[3]" />
                BUSINESS HOURS DEMO
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-md border border-sara-light-green/15 bg-sara-dark-grey px-8 py-3 text-sm uppercase tracking-[0.24em] text-sara-off-white transition-all hover:bg-sara-black">
                <Moon size={20} className="text-sara-light-green" />
                AFTER HOURS DEMO
              </button>
            </div>

            {/* FOOTNOTE */}
            <p className="max-w-sm text-[10px] uppercase tracking-[0.18em] text-sara-mid-grey">
              Business hours: Tradie gets 3 rings to answer. After hours: Tradie
              Mobile picks up automatically.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL (Workflow Sidebar) */}
        <aside className="flex w-full flex-col border-l border-sara-light-green/15 bg-sara-black lg:w-[380px] xl:w-[450px]">
          {/* CALL FLOW SECTION */}
          <div className="flex-1 overflow-y-auto border-b border-sara-light-green/15 p-8 pb-12">
            <div className="mb-4 flex items-center gap-2 text-sara-light-green">
              <Phone size={16} className="rotate-90" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Call Flow
              </span>
            </div>

            <div className="flex flex-col items-center space-y-4 relative">
              {/* FLOW STEP 1 */}
              <FlowCard
                title="CUSTOMER"
                sub="Incoming Call"
                icon={<User size={18} />}
                active
              />

              {/* CONNECTING LINE */}
              <div className="relative h-10 w-[1px] bg-gradient-to-b from-sara-light-green/50 to-transparent">
                <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-sara-light-green/30 bg-sara-black" />
              </div>

              {/* FLOW STEP 2 */}
              <FlowCard
                title="JON'S PLUMBING"
                sub="02 8488 8484"
                icon={<Phone size={18} />}
              />

              {/* CONNECTING LINE */}
              <div className="relative h-10 w-[1px] bg-sara-light-grey/20">
                <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-sara-light-grey/20 bg-sara-black" />
              </div>

              {/* DECISION NODE */}
              <div className="relative flex h-24 w-24 translate-y-2 rotate-45 items-center justify-center border border-sara-light-grey/20">
                <span className="-rotate-45 text-center text-[10px] uppercase tracking-[0.2em] text-sara-mid-grey leading-tight">
                  Call <br /> Answered?
                </span>
                <div className="absolute -right-4 -top-4 h-1.5 w-1.5 rounded-full bg-sara-dark-grey" />
              </div>
            </div>
          </div>

          {/* CAPTURED DATA SECTION */}
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-sara-light-green">
              <div className="h-1.5 w-1.5 rounded-full bg-sara-light-green shadow-[0_0_8px_rgba(163,177,138,1)]" />
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Captured Data
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <CapturedItem label="NAME" icon={<User size={14} />} />
              <CapturedItem label="NUMBER" icon={<Phone size={14} />} />
              <CapturedItem label="ADDRESS" icon={<MapPin size={14} />} />
              <CapturedItem label="REASON" icon={<Settings size={14} />} />
            </div>
          </div>

          {/* BOTTOM STATUS BAR */}
          <div className="flex h-12 w-full items-center justify-between border-t border-sara-light-green/15 bg-sara-black/60 px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-sara-mid-grey">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-sara-mid-grey" />
              {status}
            </div>
            <div className="flex items-center gap-6">
              <span>00:00</span>
              <span>RINGS: {rings}/3</span>
              <span className="text-sara-light-green opacity-60">
                Tradie AI
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ConfigInput({ label, defaultValue, isSelect }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] uppercase tracking-[0.2em] text-sara-mid-grey">
        {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <select className="w-full appearance-none rounded-lg border border-sara-light-green/12 bg-sara-dark-grey px-4 py-3 text-xs text-sara-off-white focus:outline-none focus:border-sara-light-green/50">
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Carpenter</option>
            <option>HVAC Technician</option>
            <option>Locksmith</option>
            <option>Painter</option>
            <option>Roofer</option>
            <option>Tradesperson</option>
          </select>
        ) : (
          <input
            type="text"
            defaultValue={defaultValue}
            className="w-full rounded-lg border border-sara-light-green/12 bg-sara-dark-grey px-4 py-3 text-xs font-mono text-sara-off-white focus:outline-none focus:border-sara-light-green/50"
          />
        )}
      </div>
    </div>
  );
}

function FlowCard({ title, sub, icon, active = false }: any) {
  return (
    <div
      className={`w-full max-w-[280px] p-4 rounded-xl border flex items-center gap-4 transition-all ${
        active
          ? "bg-sara-light-green/10 border-sara-light-green/40 text-sara-off-white"
          : "bg-sara-dark-grey border-sara-light-green/12 text-sara-light-grey"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-sara-light-green/10 text-sara-light-green" : "bg-sara-black/30 text-sara-mid-grey"}`}
      >
        {icon}
      </div>
      <div className="space-y-0.5">
        <p
          className={`text-xs uppercase tracking-[0.2em] ${active ? "text-sara-off-white" : "text-sara-light-grey"}`}
        >
          {title}
        </p>
        <p
          className={`text-[10px] ${active ? "text-sara-light-grey" : "text-sara-mid-grey"}`}
        >
          {sub}
        </p>
      </div>
      {active && (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sara-light-green shadow-[0_0_8px_rgba(163,177,138,1)]" />
      )}
    </div>
  );
}

function CapturedItem({ label, icon }: any) {
  return (
    <div className="group flex w-full items-center gap-4 rounded-xl border border-sara-light-green/12 bg-sara-dark-grey/70 px-5 py-4 transition-all hover:border-sara-light-green/24">
      <div className="text-sara-mid-grey transition-colors group-hover:text-sara-light-grey">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[9px] uppercase tracking-[0.2em] text-sara-mid-grey">
          {label}
        </p>
        <p className="text-xs tracking-[0.2em] text-sara-light-grey">—</p>
      </div>
    </div>
  );
}

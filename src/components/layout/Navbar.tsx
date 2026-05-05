import { useState } from "react";
import { Menu, X, Mic, LogOut } from "lucide-react";
import sara from "../../assets/sara-logo.jpeg"


interface NavbarProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ onGetStarted, onWatchDemo, onLogin, isLoggedIn, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-sara-light-green/15 bg-sara-black/90 text-sara-off-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LEFT: Logo Section */}
        <div className="flex items-center gap-3">
          <img src={sara} alt="Logo" className="h-10  w-32" />
        </div>

        {/* RIGHT (Desktop) - Shows only on LG screens (1024px) and above */}
        <div className="hidden lg:flex items-center gap-6">
          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-sara-light-grey">
            POWERED BY BELE.AI
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onWatchDemo}
              className="flex items-center gap-2 rounded-sm bg-sara-light-green px-4 py-2 text-xs uppercase tracking-[0.2em] text-sara-dark-green transition-all duration-300 hover:bg-[#b7c5a2] whitespace-nowrap"
            >
              <Mic size={14} className="text-black" />
              Live Demo
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 rounded-sm border border-rose-400/45 px-4 py-2 text-xs uppercase tracking-[0.2em] text-rose-300 transition-all hover:bg-rose-500 hover:text-white"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="rounded-sm border border-sara-light-green/35 px-5 py-2 text-xs uppercase tracking-[0.2em] text-sara-light-green transition-all hover:bg-sara-light-green hover:text-sara-dark-green"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON - Shows on all screens below LG (1024px) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-sara-light-grey transition-colors hover:text-sara-off-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Hidden on LG+ */}
      {isOpen && (
        <div className="absolute left-0 top-full flex w-full animate-in flex-col gap-6 border-t border-sara-light-green/15 bg-sara-dark-grey px-6 py-8 shadow-2xl slide-in-from-top-2 duration-300 lg:hidden">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sara-light-grey">
              POWERED BY
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-sara-off-white leading-none">
              BELE.AI
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { onWatchDemo(); setIsOpen(false); }}
              className="flex items-center justify-center gap-2 rounded-sm bg-sara-light-green py-4 text-sm uppercase tracking-[0.2em] text-sara-dark-green shadow-lg transition-transform active:scale-95"
            >
              <Mic size={18} fill="black" />
              Live Demo
            </button>

            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { onLogout && onLogout(); setIsOpen(false); }}
                  className="flex w-full items-center justify-center gap-2 rounded-sm border border-rose-400/30 bg-rose-400/10 p-4 text-xs uppercase tracking-[0.2em] text-rose-300 transition-all hover:bg-rose-500 hover:text-white"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { onLogin && onLogin(); setIsOpen(false); }}
                  className="w-full rounded-sm border border-sara-light-green/20 p-4 text-xs uppercase tracking-[0.2em] text-sara-off-white transition-all hover:bg-sara-light-green/10"
                >
                  Log In
                </button>

                <button
                  onClick={() => { onGetStarted(); setIsOpen(false); }}
                  className="w-full rounded-sm border border-sara-light-green/15 bg-sara-black p-4 text-xs uppercase tracking-[0.2em] text-sara-light-green transition-all hover:bg-sara-light-green hover:text-sara-dark-green"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

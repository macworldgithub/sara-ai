export default function Footer() {
  return (
    <footer className="w-full border-t border-sara-light-green/15 bg-sara-black px-6 py-12 sm:px-12 md:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* LEFT: Branding */}
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl tracking-tight text-sara-off-white">
            JUST
          </h2>
          <div className="rounded-sm border border-sara-light-green/30 px-3 py-1">
            <span className="text-[8px] uppercase tracking-[0.25em] text-sara-light-green">
              Tradie Mobile
            </span>
          </div>
        </div>

        {/* RIGHT: Attribution */}
        <div className="text-center md:text-right">
          <p className="text-[8px] uppercase leading-relaxed tracking-[0.18em] text-sara-light-grey md:text-[10px]">
            Powered by Bele.Ai — Revolutionising utilities Through{" "}
            <br className="sm:hidden" /> Simplicity and Automation
          </p>
        </div>
      </div>
    </footer>
  );
}

export function MissionCityLogo() {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1eadf] shadow-[0_10px_24px_rgba(0,0,0,0.22)] md:h-14 md:w-14">
        <svg viewBox="0 0 88 88" className="h-9 w-9 md:h-10 md:w-10" aria-hidden="true">
          <path
            d="M44 5.5 L47.8 17 H60.1 L50.2 24.2 L54 35.8 L44 28.7 L34 35.8 L37.8 24.2 L27.9 17 H40.2 Z"
            fill="#091015"
          />
          <path
            d="M11 68 H77 V45.5 H59.5 C59.5 38.4 53.7 32.6 46.6 32.6 H43.9 C43.9 24.4 37.2 17.8 29 17.8 C20.8 17.8 14.1 24.4 14.1 32.6 H11 Z"
            transform="translate(7,10)"
            fill="none"
            stroke="#091015"
            strokeWidth="4.6"
            strokeLinejoin="round"
          />
          <path d="M44 45 V68" stroke="#091015" strokeWidth="4.4" />
          <path d="M22 49.5 H66" stroke="#091015" strokeWidth="4.4" />
          <path d="M30 37 V49 M58 37 V49" stroke="#091015" strokeWidth="4.4" />
        </svg>
      </div>
      <div className="leading-none">
        <div className="text-[15px] font-semibold uppercase tracking-[0.24em] text-zinc-100 md:text-[17px]">
          Mission City
        </div>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.48em] text-zinc-500 md:text-[12px]">
          Sound
        </div>
      </div>
    </div>
  );
}

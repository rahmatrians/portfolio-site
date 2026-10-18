interface ClientSectionProps {
  className?: string;
}

const ROW_ONE_LOGOS = [
  { name: "COMPANY", type: "company" },
  { name: "LOGO", type: "logo-cube" },
  { name: "LOGOIPSUM", type: "logoipsum" },
  { name: "BRAND", type: "brand" },
  { name: "VECTOR", type: "vector" },
];

const ROW_TWO_LOGOS = [
  { name: "LOGOIPSUM", type: "logoipsum-alt" },
  { name: "MINIMAL", type: "minimal-bar" },
  { name: "AGENCY", type: "agency" },
  { name: "STUDIO", type: "studio" },
  { name: "CORP", type: "corp" },
];

function ClientLogoItem({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex items-center gap-3 px-8 text-neutral-400 select-none group cursor-pointer transition-all duration-300 hover:text-black">
      {type === "company" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-wider uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "logo-cube" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "logoipsum" && (
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-7 rounded-full bg-current opacity-90 inline-block transform -rotate-12" />
            <span className="w-3.5 h-7 rounded-full bg-current opacity-70 inline-block transform rotate-12" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            LOGOIPSUM
          </span>
        </div>
      )}

      {type === "brand" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "vector" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M12 7v10M7 12h10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-wider uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "logoipsum-alt" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="2" />
            <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.6" />
            <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.6" />
            <rect x="13" y="13" width="8" height="8" rx="2" />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            LOGOIPSUM
          </span>
        </div>
      )}

      {type === "minimal-bar" && (
        <div className="flex items-center gap-3">
          <div className="h-6 w-12 bg-current rounded-sm opacity-80" />
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "agency" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 4.5l7 12H5l7-12z" />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "studio" && (
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-current rounded-full" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-poppins">
            {name}
          </span>
        </div>
      )}

      {type === "corp" && (
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 9l7-7v7h-7z" />
          </svg>
          <span className="text-xl md:text-2xl font-black tracking-wider uppercase font-poppins">
            {name}
          </span>
        </div>
      )}
    </div>
  );
}

export function ClientSection({ className = "" }: ClientSectionProps) {
  return (
    <section
      aria-label="Clients & Partners"
      className={`relative w-full py-16 overflow-hidden ${className}`}
    >
      {/* Horizontal marquee container with side fade gradient (matching CLIENT.png) */}
      <div className="relative w-full space-y-8">
        {/* Left and right fade gradient mask to match Figma screenshot */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-white via-white/80 to-transparent z-10" />

        {/* Row 1: Left to right / right to left infinite marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-8">
            {ROW_ONE_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r1-1-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
            {ROW_ONE_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r1-2-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
            {ROW_ONE_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r1-3-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
            {ROW_ONE_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r1-4-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Reverse direction marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex items-center gap-8">
            {ROW_TWO_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r2-1-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
            {ROW_TWO_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r2-2-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
            {ROW_TWO_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r2-3-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
            {ROW_TWO_LOGOS.map((logo, index) => (
              <ClientLogoItem
                key={`r2-4-${index}`}
                name={logo.name}
                type={logo.type}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

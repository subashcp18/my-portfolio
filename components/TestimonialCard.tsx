
"use client";

interface StrategyCardFrontProps {
  heading: string;
  items: string[];
  footerText?: string;
  accentColor?: string;
}

function BrandMark() {
  return (
    <svg
      viewBox="0 0 64 76"
      className="h-8 w-7 shrink-0 md:h-10 md:w-9"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 4H60V19H25V34H60V70H8V55H43V40H8V4Z" />
    </svg>
  );
}

export default function StrategyCardFront({
  heading,
  items,
  footerText = "STRATEGY",
}: StrategyCardFrontProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* WHITE CONTAINER */}
      <div className="absolute inset-[3%] flex flex-col overflow-hidden rounded-[10px] bg-white px-[7%] py-[6%]">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 text-[clamp(16px,2.5vw,26px)] font-normal uppercase leading-tight tracking-[-0.04em] text-black">
            {heading}
          </h3>

          <BrandMark />
        </div>

        {/* CONTENT LIST */}
        <div className="mt-[7%] flex flex-1 flex-col justify-start">
          {items.map((item, index) => (
            <div key={`${item}-${index}`}>
              <p className="py-[4%] text-[clamp(11px,1.5vw,16px)] font-normal leading-[1.35] tracking-[-0.02em] text-black">
                {item}
              </p>

              {index !== items.length - 1 && (
                <div
                  className="h-[4px] w-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #CFD2FF 1.5px, transparent 2px)",
                    backgroundSize: "12px 4px",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "left center",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM BRANDING */}
        <div className="mt-[5%] flex items-center justify-between gap-3">
          <div className="rotate-180">
            <BrandMark />
          </div>

          <span className="rotate-180 text-right text-[clamp(15px,2.3vw,24px)] font-normal uppercase leading-none tracking-[-0.04em] text-black">
            {footerText}
          </span>
        </div>
      </div>
    </div>
  );
}

import { MARQUEE_ITEMS } from "@/data/content";

const Sequence = () => (
  <div className="flex shrink-0 items-center">
    {MARQUEE_ITEMS.map((item) => (
      <span key={item} className="flex items-center">
        <span className="whitespace-nowrap px-8 font-serif text-lg italic text-ink sm:text-xl">
          {item}
        </span>
        <span className="h-2 w-2 rotate-45 bg-ink/70" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div
      data-testid="marquee-band"
      className="marquee-track relative z-10 overflow-hidden border-y border-gold/40 bg-gold py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max">
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}

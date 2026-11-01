import {
  BadgeCheck,
  ShieldCheck,
  DraftingCompass,
  Eye,
  SlidersHorizontal,
  HeartHandshake,
} from "lucide-react";
import { WHY_US } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

const ICONS = {
  BadgeCheck,
  ShieldCheck,
  DraftingCompass,
  Eye,
  SlidersHorizontal,
  HeartHandshake,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" data-testid="why-us-section" className="bg-warm py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose Crown Stone Construction?"
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((r, i) => {
            const Icon = ICONS[r.icon];
            return (
              <Reveal key={r.title} delay={0.08 * (i % 3)}>
                <div
                  data-testid={`why-us-card-${i + 1}`}
                  className="group border-t border-ink/15 pt-8 transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center border border-gold/50 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="font-serif text-sm italic text-ink/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold sm:text-2xl">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {r.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

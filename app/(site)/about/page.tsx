import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Fallow Coffee — who we are, where our coffee comes from, and the space we've made.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-espresso text-milk noise overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-8 bg-crema/30" />
            <p className="font-accent italic text-crema/40 text-[11px] tracking-[0.2em] uppercase">
              The story
            </p>
          </div>
          <h1 className="text-display text-milk max-w-[14ch]">
            Who we are
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Owner story */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20 md:mb-28 items-center">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-roast/40" />
              <p className="font-accent italic text-roast/60 text-[11px] tracking-[0.2em] uppercase">
                Our story
              </p>
            </div>
            <p className="text-body text-espresso max-w-[52ch] leading-relaxed">
              Fallow started as a simple idea: a coffee shop where the owner&apos;s care for the craft
              is visible in every detail — from the cup sleeve to the espresso pull. We&apos;re not a
              chain. We&apos;re a neighbourhood anchor.
            </p>
          </div>
          <div className="md:col-span-6 bg-crema/20 border border-crema rounded-sm aspect-[4/3] flex items-center justify-center text-stone text-small">
            Owner portrait photo
          </div>
        </section>

        {/* Sourcing */}
        <section className="mb-20 md:mb-28 border-t border-crema/60 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-roast/40" />
                <p className="font-accent italic text-roast/60 text-[11px] tracking-[0.2em] uppercase">
                  Our coffee
                </p>
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="text-h2 text-espresso mb-5 leading-snug">
                Traceability matters.
              </p>
              <p className="text-body text-stone max-w-[52ch]">
                We work with a small roaster to source single-origin and blended lots that change
                with the season. We want to know the farm, the process, and the people behind
                every bag we serve.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="border-t border-crema/60 pt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-roast/40" />
            <p className="font-accent italic text-roast/60 text-[11px] tracking-[0.2em] uppercase">
              The space
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-crema/20 border border-crema rounded-sm aspect-square flex items-center justify-center text-stone text-label"
              >
                Photo {i + 1}
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

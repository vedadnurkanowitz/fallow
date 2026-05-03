import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Fallow Coffee — who we are, where our coffee comes from, and the space we've made.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-h1 text-espresso mb-2">About</h1>

      {/* Owner story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <p className="text-label text-stone uppercase tracking-widest mb-3">Our story</p>
          <p className="text-body text-espresso">
            Fallow started as a simple idea: a coffee shop where the owner&apos;s care for the craft is visible in every detail — from the cup sleeve to the espresso pull. We&apos;re not a chain. We&apos;re a neighbourhood anchor.
          </p>
        </div>
        <div className="bg-crema/20 border border-crema rounded-sm aspect-square flex items-center justify-center text-stone text-small">
          Owner portrait photo
        </div>
      </section>

      {/* Sourcing */}
      <section className="mb-16">
        <p className="text-label text-stone uppercase tracking-widest mb-3">Our coffee</p>
        <p className="text-body text-espresso max-w-2xl">
          We work with a small roaster to source single-origin and blended lots that change with the season. Traceability matters to us — we want to know the farm, the process, and the people behind every bag.
        </p>
      </section>

      {/* Gallery placeholder */}
      <section>
        <p className="text-label text-stone uppercase tracking-widest mb-4">The space</p>
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
  );
}

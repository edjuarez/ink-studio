export default function StylesBanner() {
  return (
    <section className="w-full bg-[#f4f1eb] py-12 px-6 text-neutral-900">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 text-center font-serif text-xl sm:gap-8 sm:text-2xl md:text-3xl">
        <span>Tradicional</span>
        <span className="font-sans font-light text-neutral-300">|</span>
        <span>Ornamental</span>
        <span className="font-sans font-light text-neutral-300">|</span>
        <span>Lineal</span>
      </div>
    </section>
  );
}
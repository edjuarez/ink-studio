import { ArrowDownRight } from "lucide-react";

const images = [
  {
    src: "/images/tattoo-hero-1.jpg",
    alt: "Tattoo artwork",
    className:
      "absolute left-[4%] top-[12%] w-32 rotate-[-7deg] sm:w-44 lg:w-56",
  },
  {
    src: "/images/tattoo-hero-2.jpg",
    alt: "Tattoo artwork",
    className:
      "absolute left-[15%] bottom-[8%] w-28 rotate-[5deg] sm:w-40 lg:w-52",
  },
  {
    src: "/images/tattoo-hero-3.jpg",
    alt: "Tattoo artwork",
    className:
      "absolute right-[15%] top-[10%] w-32 rotate-[6deg] sm:w-44 lg:w-56",
  },
  {
    src: "/images/tattoo-hero-4.jpg",
    alt: "Tattoo artwork",
    className:
      "absolute right-[4%] bottom-[12%] w-28 rotate-[-5deg] sm:w-40 lg:w-52",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f4f1eb] px-6">
      {/* Decorative images */}
{/*       {images.map((image, index) => (
        <div
          key={image.src}
          className={`${image.className} group z-10`}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="overflow-hidden bg-white p-2 shadow-xl sm:p-3">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[3/4] w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        </div>
      ))} */}

      {/* Main content */}
      <div className="relative z-20 flex max-w-4xl flex-col items-center text-center">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
          Tattoo Artist · Córdoba / Barcelona
        </p>

        <h1 className="font-serif text-[15vw] font-normal leading-[0.75] tracking-[-0.07em] text-neutral-900 sm:text-[12vw] lg:text-[10rem]">
          Nombre
        </h1>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
          Tatuajes únicos, pensados para cada persona.
          <br />
          Blackwork · Fine Line · Custom
        </p>

        <a
          href="#trabajos"
          className="group mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900"
        >
          Ver trabajos

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900 transition duration-300 group-hover:rotate-45">
            <ArrowDownRight size={15} strokeWidth={1.5} />
          </span>
        </a>
      </div>

      {/* Small decorative text */}
      <div className="absolute bottom-6 left-6 z-20 hidden text-[9px] uppercase tracking-[0.25em] text-neutral-400 sm:block">
        Selected works — 2026
      </div>

      <div className="absolute bottom-6 right-6 z-20 hidden text-[9px] uppercase tracking-[0.25em] text-neutral-400 sm:block">
        Scroll to explore
      </div>
    </section>
  );
}
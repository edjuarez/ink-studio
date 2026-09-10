import { ArrowDownRight } from "lucide-react";

const backgroundImages = [
  "homeGallery/home1.webp",
  "homeGallery/home2.webp",
  "homeGallery/home3.webp",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f4f1eb] px-6">

      {/* Animated background images */}
<div className="absolute inset-0 z-0 flex">
  {backgroundImages.map((image, index) => (
    <div
      key={image}
      className="hero-image relative h-full w-1/3 overflow-hidden"
      style={{
        animationDelay: `${index * 5}s`,
      }}
    >
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  ))}
</div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-[#f4f1eb]/55" />

      {/* Content */}
      <div className="relative z-20 flex max-w-4xl flex-col items-center justify-center text-center">

        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] sm:text-xs">
          Tattoo Artist · Córdoba / Barcelona
        </p>

        <div className="flex flex-row items-center justify-center gap-4">
          <img
            src="logo.webp"
            alt="Logo Artista"
            className="h-80 w-auto object-contain"
          />

          <h1 className="font-serif text-[15vw] font-normal leading-[0.75] tracking-[-0.07em] text-neutral-900 sm:text-[12vw] lg:text-[10rem]">
            Sophie <br />
            Tattoo
          </h1>
        </div>

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

      {/* Decorative text */}
      <div className="absolute bottom-6 left-6 z-20 hidden text-[9px] uppercase tracking-[0.25em] text-neutral-400 sm:block">
        Selected works — 2026
      </div>

      <div className="absolute bottom-6 right-6 z-20 hidden text-[9px] uppercase tracking-[0.25em] text-neutral-400 sm:block">
        Scroll to explore
      </div>
    </section>
  );
}
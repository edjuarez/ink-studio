import { ArrowDownRight } from "lucide-react";
import { useState } from "react";

const backgroundImages = [
  "homeGallery/home1.webp",
  "homeGallery/home2.webp",
  "homeGallery/home3.webp",
];

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMouse({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#E8E8E8] px-6"
    >
      {/* Background */}
      <div
        className="absolute -inset-[20px]"
        style={{
          transform: `translate(${mouse.x * -12}px, ${mouse.y * -12}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src="bg.webp"
          alt=""
          className="absolute h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex max-w-4xl flex-col items-center justify-center text-center">

        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] sm:text-xs">
          Tattoo Artist · Barcelona
        </p>

        <div className="flex flex-col items-center justify-center">

          <h1
            style={{ textShadow: "0 0 1px black" }}
            className="font-main text-[15vw] font-normal leading-[0.75] tracking-[-0.07em] text-neutral-900 sm:text-[12vw] lg:text-[7rem]"
          >
            Sophie Art
          </h1>

          <p className="font-display text-[5rem] text-neutral-900">
            t · a · t · t · o · o
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center gap-5">

            {/* Agendar cita */}
            <div className="border-2 border-neutral-700 p-1.5">
              <a
                href="#contacto"
                className="group relative bg-neutral-700 flex items-center gap-3 overflow-hidden border-2 border-neutral-700 px-7 py-3.5 uppercase tracking-[0.15em]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 group-hover:scale-x-100" />

                <span className="text-white relative z-10 transition-colors duration-500 group-hover:text-[#E8E8E8]">
                  Agendar cita
                </span>
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-neutral-800 underline underline-offset-4 transition-colors duration-300 hover:text-neutral-500"
            >
              WhatsApp
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
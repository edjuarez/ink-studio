import { useState } from "react";
import ScrollIndicator from "../ui/ScrollIndicator";
import { FaWhatsappSquare, FaInstagramSquare  } from "react-icons/fa";

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
{/* 
        <p className="mb-6 text-[10px] sm:text-[1rem] font-medium uppercase tracking-[0.35em]">
          Tattoo Artist · Barcelona
        </p> */}

        <div className="flex flex-col items-center justify-center">

        <h1
          className="grenze-gotisch-bold text-[17vw] leading-[0.75] tracking-wider text-neutral-800 sm:text-[12vw] lg:text-[9rem]"
          style={{
            textShadow: `
              ${mouse.x * 5}px ${mouse.y * 5}px 0 rgba(230, 216, 216, 0.76),
              ${mouse.x * -14}px ${mouse.y * -14}px 10px rgba(0,0,0,0.18)
            `,
            transition: "text-shadow 0.15s ease-out",
          }}
        >
          Sophie Art
        </h1>

          <p className="font-display text-[5rem] text-neutral-800">
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
            <div className="flex flex-row items-center gap-3">
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors duration-500"
              >
                <FaWhatsappSquare size={50} />
              </a>
              <a
                href="https://instagram.com/sophiearttattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors duration-500"
              >
                <FaInstagramSquare size={50} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
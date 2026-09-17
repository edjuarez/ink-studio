import { useEffect, useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");

      if (!hero) return;

      const heroHeight = hero.offsetHeight;

      // 0 al principio, 1 al llegar al final del hero
      const progress = Math.min(window.scrollY / heroHeight, 1);

      // Máximo 5px de blur
      setBlur(progress * 5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      style={{
        filter: `blur(${blur}px)`,
      }}
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
          alt={contentData.sections.hero.backgroundAlt}
          className="absolute h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <FadeIn className="relative z-20 flex max-w-4xl flex-col items-center justify-center text-center">
        {/* 
        <p className="mb-6 text-[10px] sm:text-[1rem] font-medium uppercase tracking-[0.35em]">
          Tattoo Artist · Barcelona
        </p> */}

        <div className="flex flex-col items-center justify-center">
          <img
            src="/logo.webp"
            alt="Sophie Art Tattoo"
            className="mb-6 h-auto w-23 object-contain md:hidden  grayscale opacity-80"
          />

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
            {contentData.sections.hero.title}
          </h1>

          <p className="font-display text-[3rem] md:text-[5rem] text-neutral-800">
            {contentData.sections.hero.subtitle}
          </p>

          {/* Actions */}
          <div className="mt-5 md:mt-10 flex flex-col items-center gap-5">

            {/* Agendar cita */}
            <div className="border-2 border-neutral-700 p-1.5">
              <a
                href="#contacto"
                className="text-[0.75rem] group relative bg-neutral-700 flex items-center gap-3 overflow-hidden border-2 border-neutral-700 px-7 py-3.5 uppercase tracking-[0.15em]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 group-hover:scale-x-100" />

                <span className="text-white relative z-10 transition-colors duration-500 group-hover:text-[#E8E8E8]">
                  {contentData.buttons.bookAppointment}
                </span>
              </a>
            </div>
            <div className="mt-3 md:mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {/* WhatsApp */}
              <a
                href={contentData.userData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  group flex items-center gap-3
                  text-neutral-800
                  transition-colors duration-300
                  hover:text-neutral-900
                "
              >
                <FaWhatsapp
                  size={28}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />

                <span className="text-[0.80rem] md:text-[0.85rem] md:font-medium font-bold uppercase tracking-[0.2em]">
                  WhatsApp
                </span>
              </a>

              {/* Separador solo desktop */}
              <span className="hidden h-5 w-px bg-neutral-700/30 sm:block" />

              {/* Instagram */}
              <a
                href={contentData.userData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  group flex items-center gap-3
                  text-neutral-800
                  transition-colors duration-300
                  hover:text-neutral-900
                "
              >
                <FaInstagram
                  size={28}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />

                <span className="text-[0.80rem] md:text-[0.85rem] md:font-medium font-bold uppercase tracking-[0.2em]">
                  Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
import { useNavigate } from "react-router-dom";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";
import Intro from "./Intro";
import { GiAbstract086 } from "react-icons/gi";
import { GiAbstract020 } from "react-icons/gi";
import { GiAbstract065 } from "react-icons/gi";
import { GiAbstract023 } from "react-icons/gi";

const styleIcons = [
  GiAbstract086,
  GiAbstract020,
  GiAbstract065,
  GiAbstract023,
];

export default function Estilos() {
  const { styles } = contentData.sections.estilos;
  const navigate = useNavigate();

  return (
    <section id="estilos" className="section-bg-primary px-0">
      <Intro />

      <FadeIn className="border-y border-neutral-900">
        <div className="bg-background py-5">
          <div className="grid grid-cols-2 bg-neutral-700 md:grid-cols-4">
            {styles.map((style, index) => {
              const Icon = styleIcons[index];

              return (
                <button
                  key={style}
                  type="button"
                  onClick={() =>
                    navigate("/diseños", {
                      state: { category: style },
                    })
                  }
                  className="
                    group relative flex min-h-32 cursor-pointer
                    flex-col items-center justify-center
                    overflow-hidden px-4 py-8 text-center text-white
                    transition-all duration-500
                    hover:bg-neutral-800
                  "
                >
                  {/* Línea superior */}
                  <span
                    className="
                      absolute top-5 left-1/2 h-px w-0
                      -translate-x-1/2
                      bg-white
                      transition-all duration-500
                      group-hover:w-12
                    "
                  />

                  {/* Icono */}
                  <Icon
                    className="
                      mb-3 text-xl text-white/60
                      transition-all duration-500
                      group-hover:-translate-y-1
                      group-hover:scale-110
                      group-hover:text-white
                      md:text-2xl
                    "
                  />

                  {/* Texto */}
                  <span
                    className="
                      font-display text-2xl uppercase
                      tracking-wide
                      transition-all duration-500
                      group-hover:translate-y-0
                      group-hover:tracking-[0.08em]
                      md:text-3xl lg:text-4xl
                    "
                  >
                    {style}
                  </span>

                  {/* Línea inferior */}
                  <span
                    className="
                      absolute bottom-5 left-1/2 h-px w-0
                      -translate-x-1/2
                      bg-white/70
                      transition-all duration-500
                      group-hover:w-16
                    "
                  />
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
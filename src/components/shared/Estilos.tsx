import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";
import { GiDiamonds } from "react-icons/gi";
import { LuSparkle } from "react-icons/lu";
import { RiStarHalfSLine } from "react-icons/ri";
import { MdStarPurple500 } from "react-icons/md";

export default function Estilos() {
  const { styles } = contentData.sections.estilos;

  const styleIcons = [
    GiDiamonds,
    LuSparkle,
    RiStarHalfSLine,
    MdStarPurple500,
  ];

  return (
    <section id="estilos" className="section-bg-primary">
      <div className="mx-auto">
        <FadeIn className="mb-16 flex flex-col items-center text-center">
          <p className="section-name">
            {contentData.sections.estilos.eyebrow}
          </p>

          <h2 className="section-title-secondary">
            {contentData.sections.estilos.title}
          </h2>

          <p className="mt-6 text-center text-sm text-neutral-600 md:text-base">
            {contentData.sections.estilos.paragraph}
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-30 gap-y-4 border-y border-neutral-900/20 py-8"
        >
          {styles.map((style, index) => {
            const Icon = styleIcons[index];

            return (
              <div key={style} className="flex items-center gap-7">
                <Icon className="text-neutral-500" size={28} />

                <span className="font-display text-2xl text-neutral-900 md:text-3xl">
                  {style}
                </span>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
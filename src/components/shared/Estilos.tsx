import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";
import { GiDiamonds } from "react-icons/gi";

export default function Estilos() {
  const { styles } = contentData.sections.estilos;

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

          <p className="section-description-primary max-w-sm mx-auto">
            {contentData.sections.estilos.paragraph}
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="mt-16 flex flex-col gap-5 border-y border-neutral-900/20 py-8 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-30 md:gap-y-4"
        >
          {styles.map((style) => {

            return (
              <div
                key={style}
                className="flex items-center gap-5 md:gap-7"
              >
                <GiDiamonds className="shrink-0 text-neutral-500" size={28} />

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
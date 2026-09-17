import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

export default function Intro() {

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
      </div>
    </section>
  );
}
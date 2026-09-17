import ActionButton from "../../components/ui/ActionButton";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

export default function Prints() {
  const { printsSection } = contentData.sections;
  const { buttons, common } = contentData;
  return (
    <section className="section-bg-primary">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          
          {/* Texto */}
          <FadeIn>
            <div>
              <p className="section-name text-center">
                {printsSection.eyebrow}
              </p>

              <h2 className="section-title-secondary text-center">
                {printsSection.title}
              </h2>

              <p className="section-description-primary max-w-sm mx-auto">
                {printsSection.description}
              </p>

              <ActionButton href="/prints">
                {buttons.seePrints}
              </ActionButton>
            </div>
          </FadeIn>

          {/* Galería */}
          <FadeIn delay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
            {printsSection.images.map((image, index) => (
              <a
                key={image}
                href="/prints"
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-200"
              >
                <img
                  src={image}
                  alt={common.printAlt(index + 1)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
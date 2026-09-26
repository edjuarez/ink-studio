import ActionButton from "../../components/ui/ActionButton";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";
import {useState, useEffect} from "react";
import { getPrints } from "../../services/prints";
import type { Print } from "../../types/api";

export default function Prints() {
  const { printsSection } = contentData.sections;
  const { buttons, common } = contentData;
  const [prints, setPrints] = useState<Print[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrints() {
      try {
        const data = await getPrints(true, 3);
        setPrints(data);
      } catch (error) {
        console.error("Error loading featured prints", error);
      } finally {
        setLoading(false);
      }
    }

    loadPrints();
  }, []);

  if (loading) {
    return null;
  }

  const items = prints.map((print) => ({
    id: print.id,
    image: print.image_url,
    title: print.title ?? undefined,
    category: undefined,
  }));

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
            {items.map((image, index) => (
              <a
                key={image.id}
                href="/prints"
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-200"
              >
                <img
                  src={image.image}
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
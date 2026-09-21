import ActionButton from "../../components/ui/ActionButton";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";
import { getDesigns } from "../../services/designs";
import type { Design } from "../../types/api";
import { useEffect, useState } from "react";

export default function Designs() {
  const { designsSection } = contentData.sections;
  const { buttons, common } = contentData;
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDesigns() {
      try {
        const data = await getDesigns(true, 3);
        setDesigns(data);
      } catch (error) {
        console.error("Error loading featured designs", error);
      } finally {
        setLoading(false);
      }
    }

    loadDesigns();
  }, []);

  if (loading) {
    return null;
  }

  const items = designs.map((design) => ({
    id: design.id,
    imageUrl: design.image_url,
    title: undefined,
    category: design.category ?? undefined,
  }));
  console.log(items)
  return (
    <section className="section-bg-primary">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <FadeIn
            delay={0.15}
            className="order-2 grid grid-cols-1 gap-3 md:order-1 md:grid-cols-3 md:gap-5"
          >
            {items.map((image, index) => (
              <a
                key={image.id}
                href="/diseños"
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-200"
              >
                <img
                  src={image.imageUrl}
                  alt={common.printAlt(index + 1)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            ))}
          </FadeIn>

          <FadeIn className="order-1 md:order-2">
            <div>
              <p className="section-name text-center">
                {designsSection.eyebrow}
              </p>

              <h2 className="section-title-secondary text-center">
                {designsSection.title}
              </h2>

              <p className="section-description-primary mx-auto max-w-sm">
                {designsSection.description}
              </p>

              <ActionButton href="/diseños">
                {buttons.seeDesigns}
              </ActionButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
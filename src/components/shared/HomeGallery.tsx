import ActionButton from '../ui/ActionButton';
import FadeIn from '../ui/FadeIn';
import { contentData } from '../../data/data';
import { getTattoos } from "../../services/tattoos";
import type { Tattoo } from "../../types/api";
import { useEffect, useState } from "react";

export default function HomeGallery() {
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTattoos() {
      try {
        const data = await getTattoos(true, 6);
        setTattoos(data);
      } catch (error) {
        console.error("Error loading featured tattoos", error);
      } finally {
        setLoading(false);
      }
    }

    loadTattoos();
  }, []);

  if (loading) {
    return null;
  }

  const items = tattoos.map((tattoo) => ({
    id: tattoo.id,
    image: tattoo.image_url,
    title: undefined,
    category: undefined,
  }));
  return (
    <section id="galeria" className="section-bg-primary">
      <div className="mx-auto">
        
        <FadeIn className="mb-16 flex flex-col">
          <p className="section-name">
            {contentData.sections.homeGallery.eyebrow}
          </p>
          <h2 className="section-title-secondary">
            {contentData.sections.homeGallery.title}
          </h2>
        </FadeIn>

        <FadeIn className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((work) => (
            <div
              key={work.id}
              className="group relative flex flex-col overflow-hidden bg-neutral-200/50"
            >
              <div className="cursor-pointer relative aspect-[3/4] w-full overflow-hidden bg-neutral-300">
                <img
                  src={work.image}
                  alt={work.title}
                  className="saturate-80 contrast-105 transition-all duration-700 group-hover:saturate-100 h-full w-full object-cover ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </FadeIn>
        <div className="flex justify-center">
            <ActionButton href="/portfolio" variant="light">
              {contentData.buttons.seeWork}
            </ActionButton>
        </div>
      </div>
    </section>
  );
}
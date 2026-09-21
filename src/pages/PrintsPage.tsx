import BookingCta from "../components/shared/BookingCta";
import Gallery from "../components/shared/Gallery";
import Social from "../components/shared/Social";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";
import { getPrints } from "../services/prints";
import type { Print  } from "../types/api";
import { useState, useEffect } from "react";

export default function PrintsGalleryPage() {
  const [print, setPrints] = useState<Print[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDesigns() {
      try {
        const data = await getPrints();
        setPrints(data);
      } catch (error) {
        console.error("Error loading designs", error);
      } finally {
        setLoading(false);
      }
    }

    loadDesigns();
  }, []);

  if (loading) {
    return null;
  }

  const items = print.map((design) => ({
    id: design.id,
    image: design.image_url,
    title: undefined
  }));
  return (
    <>
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            {contentData.pages.prints.title}
          </h1>

          <p className="section-description-primary">
            {contentData.pages.prints.description}
          </p>
        </FadeIn>

        <Gallery
          items={items}
          variant="prints"
        />

        <BookingCta />
      </section>
      
    </main>
    <Social />
    </>
  );
}
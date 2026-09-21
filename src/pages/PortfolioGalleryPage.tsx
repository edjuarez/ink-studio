import BookingCta from "../components/shared/BookingCta";
import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";
import { getTattoos } from "../services/tattoos";
import type { Tattoo } from "../types/api";
import { useState, useEffect } from "react";

export default function PortfolioGalleryPage() {
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTattoos() {
      try {
        const data = await getTattoos();
        setTattoos(data);
      } catch (error) {
        console.error("Error loading tattoos", error);
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
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            {contentData.pages.portfolio.title}
          </h1>
        </FadeIn>
        <Gallery
          items={items}
          variant="tattoos"
        />
        <BookingCta />
      </section>
    </main>
  );
}
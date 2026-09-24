import BookingCta from "../components/shared/BookingCta";
import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";
import { useLocation } from "react-router-dom";
import { getDesigns } from "../services/designs";
import type { Design } from "../types/api";
import { useState, useEffect } from "react";
import Loading from "../components/shared/Loading";

export default function DesignsGalleryPage() {
  const location = useLocation();

  const initialCategory = location.state?.category;
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDesigns() {
      try {
        const data = await getDesigns();
        setDesigns(data);
      } catch (error) {
        console.error("Error loading designs", error);
      } finally {
        setLoading(false);
      }
    }

    loadDesigns();
  }, []);

  if (loading) {
    return <Loading variant="fullscreen" />;
  }

  const items = designs.map((design) => ({
    id: design.id,
    image: design.image_url,
    title: undefined,
    category: design.category ?? undefined,
  }));

  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">

        <FadeIn className="mb-16 text-center">

          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            {contentData.pages.designs.title}
          </h1>

          <p className="section-description-primary">
            {contentData.pages.designs.description}
          </p>
        </FadeIn>

        <Gallery
          items={items}
          variant="designs"
          initialCategory={initialCategory}
        />

        <BookingCta />

      </section>
    </main>
  );
}
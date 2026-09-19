import BookingCta from "../components/shared/BookingCta";
import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";
import { useLocation } from "react-router-dom";

export default function DesignsGalleryPage() {
  const location = useLocation();

  const initialCategory = location.state?.category;
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
          items={contentData.pages.designs.items}
          variant="designs"
          initialCategory={initialCategory}
        />

        <BookingCta />

      </section>
    </main>
  );
}
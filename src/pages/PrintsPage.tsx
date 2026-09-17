import BookingCta from "../components/shared/BookingCta";
import Gallery from "../components/shared/Gallery";
import Social from "../components/shared/Social";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";

export default function PrintsGalleryPage() {
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
          items={contentData.pages.prints.items}
          variant="prints"
        />

        <BookingCta />
      </section>
      
    </main>
    <Social />
    </>
  );
}
import Gallery from "../components/shared/Gallery";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";

export default function PrintsGalleryPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            {contentData.pages.prints.title}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            {contentData.pages.prints.description}
          </p>
        </FadeIn>

        <Gallery
          items={contentData.pages.prints.items}
          variant="prints"
        />
      </section>
    </main>
  );
}
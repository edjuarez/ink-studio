import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";

export default function NotFoundPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto flex w-full max-w-3xl items-center justify-center">
        <FadeIn className="text-center">
          <p className="section-name">
            {contentData.pages.notFound.eyebrow}
          </p>

          <h1 className="section-title-secondary">
            {contentData.pages.notFound.title}
          </h1>

          <p className="section-description-primary mx-auto mt-6 max-w-md">
            {contentData.pages.notFound.description}
          </p>

          <Link
            to="/"
            className="group mt-12 inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-8 py-4 text-xs uppercase tracking-[0.18em] text-[#E8E8E8] transition-colors duration-300 hover:bg-neutral-700"
          >
            {contentData.buttons.backHome}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}

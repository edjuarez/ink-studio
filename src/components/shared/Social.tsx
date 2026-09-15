import ActionButton from "../ui/ActionButton";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

export default function Social() {
  return (
    <section className="section-bg-primary w-full bg-[#E8E8E8] px-0">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        <p className="section-name">
          {contentData.sections.social.eyebrow}
        </p>

        <a
          href={contentData.userData.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <h2 className="section-title-secondary">
            {contentData.userData.instagramHandle}
          </h2>
        </a>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
          {contentData.sections.social.description}
        </p>
      </FadeIn>
      {/* IMAGES */}
      <FadeIn delay={0.15} className="mt-20 grid w-full grid-cols-2">
        {contentData.sections.social.images.map((image) => (
          <div key={image.src} className="overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover saturate-80"
            />
          </div>
        ))}
      </FadeIn>
      <ActionButton href={contentData.userData.instagramUrl} variant="dark">
        {contentData.buttons.followInstagram}
      </ActionButton>
    </section>
  );
}
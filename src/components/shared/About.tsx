import ActionButton from "../ui/ActionButton"
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

export default function About() {
  return (
    <section id="artista" className="section-bg-primary">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="relative lg:col-span-6 order-2 md:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-300">
              <img
                src="artist.webp"
                alt={contentData.sections.about.portraitAlt}
                className="cursor-pointer h-full w-full object-cover grayscale contrast-105 transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="flex flex-col items-start lg:col-span-6 lg:pl-4 order-1 md:order-2">
            <p className="section-name">
              {contentData.sections.about.eyebrow}
            </p>

            <h2 className="section-title">
              {contentData.sections.about.title}
            </h2>
            <p className="text-[1rem] tracking-[0.15em] text-muted mt-8">
              {contentData.sections.about.tagline}
            </p>
            <div className="max-w-md font-sans mt-8 space-y-4 text-xl leading-relaxed text-neutral-600 sm:text-[1.125rem] sm:leading-relaxed">
              {contentData.sections.about.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.lead}
                  {paragraph.highlights.map((highlight, highlightIndex) => (
                    <strong
                      key={highlightIndex}
                      className="font-medium text-neutral-900"
                    >
                      {highlight}
                      {highlightIndex < paragraph.highlights.length - 1 && ", "}
                    </strong>
                  ))}
                  {paragraph.tail}
                </p>
              ))}
            </div>
            <ActionButton href="#contacto" variant="light">
              {contentData.buttons.bookAppointment}
            </ActionButton>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {/* WhatsApp */}
              <a
                href={contentData.userData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  group flex items-center gap-3
                  text-neutral-700
                  transition-colors duration-300
                  hover:text-neutral-900
                "
              >
                <FaWhatsapp
                  size={25}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />

                <span className="text-[0.80rem] md:text-[0.75rem] md:font-medium font-bold uppercase tracking-[0.2em]">
                  WhatsApp
                </span>
              </a>

              <span className="hidden h-5 w-px bg-neutral-700/30 sm:block" />

              {/* Instagram */}
              <a
                href={contentData.userData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  group flex items-center gap-3
                  text-neutral-700
                  transition-colors duration-300
                  hover:text-neutral-900
                "
              >
                <FaInstagram
                  size={25}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />

                <span className="text-[0.80rem] md:text-[0.75rem] md:font-medium font-bold uppercase tracking-[0.2em]">
                  Instagram
                </span>
              </a>
            </div>

          </FadeIn>
        </div>
      </div>
    </section>
  );
}
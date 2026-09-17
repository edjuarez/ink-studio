import { ArrowUpRight } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import ContactForm from "./ContactForm";
import { contentData } from "../../data/data";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="section-bg-primary"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {/* LEFT SECTION */}
        <FadeIn className="flex flex-col">
          <div>
            <p className="section-name">
              {contentData.sections.contact.eyebrow}
            </p>
            <h2 className="section-title-secondary">
              {contentData.sections.contact.titleLine1} <br /> {contentData.sections.contact.titleLine2}
            </h2>
            <p className="section-description-primary text-left">
              {contentData.sections.contact.description}
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {/* WhatsApp CTA */}
            <a
              href={contentData.userData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer group inline-flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8]"
            >
              {contentData.buttons.whatsapp}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* Contact Details */}
            <div className="space-y-3 text-sm text-neutral-700">
              <p>
                <span className="text-neutral-400">{contentData.sections.contact.details.phone}</span>
                <br />
                {contentData.userData.phone}
              </p>
              <p>
                <span className="text-neutral-400">{contentData.sections.contact.details.instagram}</span>
                <br />
                <a
                  href={contentData.userData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-500"
                >
                  {contentData.userData.instagramHandle}
                </a>
              </p>
              <p>
                <span className="text-neutral-400">{contentData.sections.contact.details.location}</span>
                <br />
                {contentData.userData.location}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* RIGHT SECTION - FORM */}
        <FadeIn delay={0.15}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
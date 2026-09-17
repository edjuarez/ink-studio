import ContactForm from "../components/shared/ContactForm";
import FadeIn from "../components/ui/FadeIn";
import { contentData } from "../data/data";

export default function ContactPage() {
  return (
    <main className="section-bg-primary">
      <section className="mx-auto w-full">
        <FadeIn className="mb-16 text-center">
          <h1 className="font-display text-5xl text-neutral-900 md:text-7xl">
            {contentData.pages.contact.title}
          </h1>

          <p className="section-description-primary max-w-3xl mx-auto w-full">
            {contentData.pages.contact.description}
            
          </p>
        </FadeIn>
        <div className="mx-auto w-full max-w-3xl">
          <ContactForm />
        </div>  
      </section>
    </main>
  );
}
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import ContactForm from "./ContactForm";

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
              Contacto
            </p>
            <h2 className="section-title-secondary">
              ¿Tienes una idea <br /> en mente?
            </h2>
            <p className="section-paragraph-primary">
              Si tienes una idea para un tatuaje, quieres personalizar un diseño
              o simplemente quieres contarme lo que tienes en mente, escríbeme.
              Cuéntame tu idea y nos ponemos en contacto para hablar sobre tu
              proyecto.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8]"
            >
              WhatsApp
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* Contact Details */}
            <div className="space-y-3 text-sm text-neutral-700">
              <p>
                <span className="text-neutral-400">Teléfono</span>
                <br />
                +34 600 000 000
              </p>
              <p>
                <span className="text-neutral-400">Instagram</span>
                <br />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-500"
                >
                  @sophiearttattoo
                </a>
              </p>
              <p>
                <span className="text-neutral-400">Ubicación</span>
                <br />
                Barcelona, España
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
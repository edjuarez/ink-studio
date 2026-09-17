import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

export default function BookingCta() {
  const { booking } = contentData.sections;

  return (
    <FadeIn className="mt-24 flex flex-col items-center border-t border-neutral-300 pt-20 text-center">
      <p className="section-name">{booking.eyebrow}</p>

      <h2 className="font-display text-4xl text-neutral-900 md:text-5xl">
        {booking.title}
      </h2>

      <p className="section-paragraph-primary">{booking.description}</p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={contentData.userData.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8]"
        >
          <FaWhatsapp size={16} />
          {contentData.buttons.whatsappCta}
        </a>

        <Link
          to="/contacto"
          className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-[#E8E8E8] transition-all duration-300 hover:bg-neutral-700"
        >
          {contentData.buttons.bookAppointment}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>

      <p className="mt-6 text-xs text-neutral-500">{booking.microcopy}</p>
    </FadeIn>
  );
}

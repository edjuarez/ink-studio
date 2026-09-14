import ActionButton from "../ui/ActionButton"
import SocialButton from "../ui/SocialButton";
import FadeIn from "../ui/FadeIn";

export default function About() {
  return (
    <section id="artista" className="section-bg-primary">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-300">
              <img
                src="artist.webp"
                alt="Retrato del tatuador"
                className="cursor-pointer h-full w-full object-cover grayscale contrast-105 transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="flex flex-col items-start lg:col-span-6 lg:pl-4">
            <p className="section-name">
              Artista
            </p>

            <h2 className="section-title">
              Sofi
            </h2>
            <p className="text-sm tracking-[0.15em] text-muted mt-8">
              ✦ Tradicional · Ornamental · Linework · OpArt ✦
            </p>
            <div className="max-w-md font-sans mt-8 space-y-4 text-xl leading-relaxed text-neutral-600 sm:text-xl">
              <p>
                Especializado en técnicas de <strong className="font-medium text-neutral-900">Blackwork</strong>, <strong className="font-medium text-neutral-900">Fine Line</strong> y proyectos autorales. Concibo el tatuaje no solo como una ilustración, sino como una extensión de la anatomía e identidad de cada persona.
              </p>
              <p>
                Mi proceso es totalmente personalizado: desde la idea inicial y el diseño a medida, hasta la ejecución cuidando cada detalle de contraste, trazo y curación a largo plazo.
              </p>
            </div>
            <ActionButton href="#contacto" variant="light">
              Agendar cita
            </ActionButton>
            <div className="mt-8 flex gap-4">
            <SocialButton type="instagram" />
            <SocialButton type="whatsapp" />
            </div>

          </FadeIn>
        </div>
      </div>
    </section>
  );
}
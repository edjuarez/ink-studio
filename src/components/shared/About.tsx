export default function About() {
  return (
    <section id="sobre-mi" className="z-10 bg-[#e8e7e3] w-full px-6 py-24">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-300">
              <img
                src="artist.webp"
                alt="Retrato del tatuador"
                className="cursor-pointer h-full w-full object-cover grayscale contrast-105 transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
          </div>

          <div className="flex flex-col items-start lg:col-span-6 lg:pl-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
              El Artista
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

            <div className="border-2 border-neutral-900 bg-white/80 p-1.5 mt-8">
              <a
                href="#contacto"
                className="group bg-white/80 relative flex items-center gap-3 overflow-hidden border-2 border-neutral-900 px-7 py-3.5 uppercase tracking-[0.15em]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 group-hover:scale-x-100" />

                <span className="relative z-10 transition-colors duration-500 group-hover:text-[#E8E8E8]">
                  Agendar cita
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import ActionButton from "../ui/ActionButton";
import FadeIn from "../ui/FadeIn";

export default function Social() {
  return (
    <section className="section-bg-primary w-full bg-[#E8E8E8] px-0">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        <p className="section-name">
          Redes sociales
        </p>

        <a
          href="https://instagram.com/sophiearttattoo"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <h2 className="section-title-secondary">
            @sophiearttattoo
          </h2>
        </a>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
          Seguime en redes para ver mis últimos trabajos, nuevos diseños y
          todo lo que voy creando. Publico contenido constantemente y
          comparto nuevos tatuajes, ideas e inspiración.
        </p>
      </FadeIn>
      {/* IMAGES */}
      <FadeIn delay={0.15} className="mt-20 grid w-full grid-cols-2">
        <div className="overflow-hidden">
          <img
            src="/social/social-1.webp"
            alt="Sophie Art Tattoo"
            className="h-full w-full object-cover saturate-80"
          />
        </div>

        <div className="overflow-hidden">
          <img
            src="/social/social-2.webp"
            alt="Sophie Art Tattoo"
            className="h-full w-full object-cover saturate-80"
          />
        </div>
      </FadeIn>
      <ActionButton href="https://instagram.com/sophiearttattoo" variant="dark">
        Seguir en Instagram
      </ActionButton>
    </section>
  );
}

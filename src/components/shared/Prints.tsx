import ActionButton from "../../components/ui/ActionButton";
import FadeIn from "../ui/FadeIn";

const prints = [
  "/prints/print-1.jpg",
  "/prints/print-2.jpg",
  "/prints/print-3.jpg",
];

export default function Prints() {
  return (
    <section className="section-bg-primary">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          
          {/* Texto */}
          <FadeIn>
            <div>
              <p className="section-name text-center">
                Obra gráfica
              </p>

              <h2 className="section-title-secondary text-center">
                Prints
              </h2>

              <p className="mt-6 text-sm text-neutral-600 md:text-base text-center">
                Ilustraciones y piezas creadas por Sophie para llevar su trabajo
                más allá del tatuaje.
              </p>

              <ActionButton href="/prints">
                Ver prints
              </ActionButton>
            </div>
          </FadeIn>

          {/* Galería */}
          <FadeIn delay={0.15} className="grid grid-cols-3 gap-3 md:gap-5">
            {prints.map((image, index) => (
              <a
                key={image}
                href="/prints"
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-200"
              >
                <img
                  src={image}
                  alt={`Print ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
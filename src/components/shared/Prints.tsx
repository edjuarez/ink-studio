import ActionButton from "../../components/ui/ActionButton";

const prints = [
  "/prints/print_1.jpg",
  "/prints/print_2.jpg",
  "/prints/print_3.jpg",
];

export default function Prints() {
  return (
    <section className="section-bg-primary">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          
          {/* Texto */}
          <div>
            <p className="section-name">
              Obra gráfica
            </p>

            <h2 className="section-title-secondary">
              Prints
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600 md:text-base">
              Ilustraciones y piezas creadas por Sophie para llevar su trabajo
              más allá del tatuaje.
            </p>

            <ActionButton href="/prints">
              Ver prints
            </ActionButton>
          </div>

          {/* Galería */}
          <div className="grid grid-cols-3 gap-3 md:gap-5">
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
          </div>

        </div>
      </div>
    </section>
  );
}
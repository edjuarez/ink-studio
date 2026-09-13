import { useState } from "react";

type GalleryItem = {
  id: number;
  image: string;
  title: string;
  category?: string;
};

type GalleryProps = {
  items: GalleryItem[];
  variant: "designs" | "tattoos" | "prints";
};

export default function Gallery({
  items,
  variant,
}: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = [
    "Todos",
    ...new Set(
      items
        .map((item) => item.category)
        .filter((category): category is string => Boolean(category))
    ),
  ];

  const filteredItems =
    activeCategory === "Todos"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const gridStyles = {
    designs: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    tattoos: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    prints: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  };

  const aspectStyles = {
    designs: "aspect-[3/4]",
    tattoos: "aspect-[4/5]",
    prints: "aspect-[3/4]",
  };

  const showCategories =
    variant === "designs" && categories.length > 1;

  return (
    <div className="w-full">
      {showCategories && (
        <div className="mb-14 flex flex-wrap justify-center gap-x-7 gap-y-4">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative pb-2 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {category}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-px w-full bg-neutral-900" />
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className={`grid gap-4 ${gridStyles[variant]}`}>
        {filteredItems.map((item) => (
          <article key={item.id} className="group overflow-hidden">
            <div
              className={`overflow-hidden bg-neutral-200 ${aspectStyles[variant]}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-800">
                {item.title}
              </span>

              {variant === "designs" && item.category && (
                <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-500">
                  {item.category}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

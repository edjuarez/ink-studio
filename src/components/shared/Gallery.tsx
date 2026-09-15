import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";

type GalleryItem = {
  id: number;
  image: string;
  title?: string;
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
  const [activeCategory, setActiveCategory] = useState(contentData.common.allCategories);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    contentData.common.allCategories,
    ...new Set(
      items
        .map((item) => item.category)
        .filter((category): category is string => Boolean(category))
    ),
  ];

  const filteredItems =
    activeCategory === contentData.common.allCategories
      ? items
      : items.filter((item) => item.category === activeCategory);

  const gridStyles = {
    designs: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4",
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
        <div className="mb-10 flex flex-wrap justify-center gap-x-7 gap-y-4">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer relative pb-2 text-[1rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
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
          <article
            key={item.id}
            className="group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01]"
            onClick={() => setSelectedImage(item)}
          >
            <FadeIn
              delay={0.1}
              className={`overflow-hidden bg-neutral-200 ${aspectStyles[variant]}`}
            >
              <img
                src={item.image}
                alt={item.title ?? contentData.common.imageAlt(item.id)}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </FadeIn>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white/80 transition-colors hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.image}
              alt={selectedImage.title ?? contentData.common.imageAlt(selectedImage.id)}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

{/*             {selectedImage.title && (
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="text-sm uppercase tracking-[0.15em] text-white/80">
                  {selectedImage.title}
                </span>
              </div>
            )} */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { contentData } from '../../data/data';
import FadeIn from '../ui/FadeIn';

export default function FAQ({ items = contentData.sections.faq.items }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-bg-primary">
      <div className="mx-auto max-w-3xl">
        <FadeIn className="mb-16 text-center">
          <p className="section-name">
            {contentData.sections.faq.eyebrow}
          </p>
          <h2 className="section-title-secondary">
            {contentData.sections.faq.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="divide-y divide-neutral-500 border-y border-neutral-500">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.id || index} className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className=" cursor-pointer group flex w-full items-center justify-between gap-4 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-lg font-normal text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-xl">
                    {item.question}
                  </span>

                  <span className=" text-xl flex h-8 w-8 shrink-0 items-center justify-center transition-all duration-300 group-hover:border-neutral-900">
                    {isOpen ? (
                      <Minus size={30} className="text-neutral-900" />
                    ) : (
                      <Plus size={30} className="text-neutral-900" />
                    )}
                  </span>
                </button>

<div
  className={`grid transition-all duration-500 ease-in-out ${
    isOpen
      ? 'grid-rows-[1fr] opacity-100'
      : 'grid-rows-[0fr] opacity-0'
  }`}
>
  <div className="overflow-hidden">
    <p className="mt-4 pr-8 text-sm leading-relaxed text-neutral-600 sm:text-base">
      {item.answer}
    </p>
  </div>
</div>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
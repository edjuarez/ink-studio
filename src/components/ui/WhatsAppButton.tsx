import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

    useEffect(() => {
    const hero = document.getElementById("home");

    if (!hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
        setVisible(!entry.isIntersecting);
        },
        {
        threshold: 0,
        }
    );

    observer.observe(hero);

    return () => observer.disconnect();
    }, []);

  return (
    <a
      href="https://wa.me/34600000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`
        fixed bottom-6 right-6 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full
        bg-neutral-900 text-[#E8E8E8]
        shadow-lg shadow-black/15
        transition-all duration-500
        hover:scale-105 hover:bg-neutral-800
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }
      `}
    >
      <MessageCircle size={23} strokeWidth={1.7} />
    </a>
  );
}
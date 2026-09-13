import { useEffect, useState } from "react";

type ScrollIndicatorProps = {
  targetId: string;
};

export default function ScrollIndicator({
  targetId,
}: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

/*       if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }
 */
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (): void => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Ir a la siguiente sección"
      className={`cursor-pointer absolute bottom-8 left-1/2 z-9 -translate-x-1/2 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="relative block h-12 w-7 rounded-full border-2 border-neutral-900 bg-transparent">
        <span className="animate-scroll-dot absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-neutral-900" />
      </span>
    </button>
  );
}

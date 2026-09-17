import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { contentData } from "../../data/data";

type ScrollIndicatorProps = {
  targetId: string;
};

export default function ScrollIndicator({
  targetId,
}: ScrollIndicatorProps) {
  const visible = true;
  const prefersReduced = useReducedMotion();

  const handleClick = (): void => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label={contentData.buttons.goNextSection}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="cursor-pointer absolute bottom-8 left-1/2 z-9 -translate-x-1/2 hidden md:block"
        >
          <span className="animate-scroll-bounce relative block h-12 w-7 rounded-full border-2 border-neutral-900 bg-transparent">
            <span className="animate-scroll-dot absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-neutral-900" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

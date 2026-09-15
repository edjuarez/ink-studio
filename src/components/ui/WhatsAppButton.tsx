import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { contentData } from "../../data/data";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

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
    <AnimatePresence>
      {visible && (
        <motion.a
          href={contentData.userData.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contentData.buttons.contactWhatsapp}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex h-17 w-17 items-center justify-center rounded-full bg-neutral-700 transition-all transition-100 text-[#E8E8E8] shadow-lg shadow-black/15 hover:scale-105 hover:bg-neutral-800"
        >
          <FaWhatsapp size={40} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
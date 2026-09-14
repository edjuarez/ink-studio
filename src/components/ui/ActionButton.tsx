import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

type ActionButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
};

export default function ActionButton({
  href,
  children,
  variant = "dark",
}: ActionButtonProps) {
  const styles = {
    dark: {
      wrapper: "border-neutral-700",
      button: "bg-neutral-500 border-neutral-700",
      hover: "bg-neutral-900",
      text: "text-white",
    },
    light: {
      wrapper: "border-neutral-900 bg-white/80",
      button: "bg-white/80 border-neutral-900",
      hover: "bg-neutral-900",
      text: "text-neutral-900",
    },
  };

  const current = styles[variant];

  return (
    <FadeIn className="mt-16 flex justify-center">
      <div className={`border-2 p-1.5 ${current.wrapper}`}>
        <Link
          to={href}
          className={`group relative flex items-center gap-3 overflow-hidden border-2 px-7 py-3.5 uppercase tracking-[0.15em] ${current.button}`}
        >
          <span
            className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${current.hover}`}
          />

          <span
            className={`relative z-10 transition-colors duration-500 group-hover:text-[#E8E8E8] ${current.text}`}
          >
            {children}
          </span>
        </Link>
      </div>
    </FadeIn>
  );
}

import { FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";
import FadeIn from "./FadeIn";
import { contentData } from "../../data/data";

type SocialButtonProps = {
  type: "instagram" | "whatsapp";
};

export default function SocialButton({ type }: SocialButtonProps) {
  const isInstagram = type === "instagram";

  const href = isInstagram
    ? contentData.userData.instagramUrl
    : contentData.userData.whatsappUrl;

  return (
    <FadeIn>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-neutral-700 transition-colors duration-500 hover:text-neutral-900"
      >
        {isInstagram ? (
          <FaInstagramSquare size={50} />
        ) : (
          <FaWhatsappSquare size={50} />
        )}
      </a>
    </FadeIn>
  );
}

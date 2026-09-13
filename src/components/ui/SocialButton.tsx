import { FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";

type SocialButtonProps = {
  type: "instagram" | "whatsapp";
};

export default function SocialButton({ type }: SocialButtonProps) {
  const isInstagram = type === "instagram";

  const href = isInstagram
    ? "https://instagram.com/sophiearttattoo"
    : "https://wa.me/34600000000";

  return (
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
  );
}

/* ```tsx
<SocialButton type="instagram" />

<SocialButton type="whatsapp" />
```
 */

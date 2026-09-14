import { FaInstagramSquare } from "react-icons/fa";
import FadeIn from "./FadeIn";

export default function InstagramButton() {
    return (
        <FadeIn>
            <a
                href="https://instagram.com/sophiearttattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors duration-500"
            >
                <FaInstagramSquare size={50} />
            </a>
        </FadeIn>
    );
}
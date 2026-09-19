import { useNavigate } from "react-router-dom";
import FadeIn from "../ui/FadeIn";
import { contentData } from "../../data/data";
import Intro from "./Intro";

export default function Estilos() {
  const { styles } = contentData.sections.estilos;
  const navigate = useNavigate();

  return (
    <section id="estilos" className="section-bg-primary px-0">
      <Intro />

      <FadeIn className="border-y border-neutral-900">
        <div className="py-5 bg-background">
          <div className="grid grid-cols-2 py-10 md:grid-cols-4 bg-neutral-700">
            {styles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() =>
                  navigate("/diseños", {
                    state: { category: style },
                  })
                }
                className={`
                  flex min-h-28 items-center justify-center cursor-pointer hover:bg-neutral-500
                  transition-all duration-300 
                  px-4 py-8 text-center text-white
                `}
              >
                <span className="font-display text-2xl uppercase md:text-3xl lg:text-4xl">
                  {style}
                </span>
              </button>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
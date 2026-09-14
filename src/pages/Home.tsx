import Hero from "../components/shared/Hero";
import HomeGallery from "../components/shared/HomeGallery";
import About from "../components/shared/About";
import FAQ from "../components/shared/FAQ";
import Social from "../components/shared/Social";
import Contact from "../components/shared/Contact";
import Estilos from "../components/shared/Estilos";
import Prints from "../components/shared/Prints";
import FadeIn from "../components/ui/FadeIn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div id="home" className="w-full z-0 sticky h-screen">
        <Hero />
      </div>
      <FadeIn>
        <Estilos />
      </FadeIn>
      <FadeIn>
        <HomeGallery />
      </FadeIn>
      <FadeIn>
        <Prints />
      </FadeIn>
      <FadeIn>
        <About />
      </FadeIn>
      <FadeIn>
        <FAQ />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
      <FadeIn>
        <Social />
      </FadeIn>
    </main>
  );
}
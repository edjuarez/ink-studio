import Hero from "../components/shared/Hero";
import HomeGallery from "../components/shared/Gallery";
import About from "../components/shared/About";
import FAQ from "../components/shared/FAQ";
import Social from "../components/shared/Social";
import StylesBanner from "../components/shared/StylesBanner";
import Contact from "../components/shared/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div id="home" className="w-full z-0 sticky top-0 h-screen">
        <Hero />
      </div>
      <StylesBanner />
      <HomeGallery />
      <About />
      <FAQ />
      <Contact />
      <Social />
    </main>
  );
}
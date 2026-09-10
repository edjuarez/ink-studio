import Hero from "../components/Hero";
import HomeGallery from "../components/Gallery";
import About from "../components/About";
import FAQ from "../components/FAQ";
import Social from "../components/Social";
import StylesBanner from "../components/StylesBanner";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <StylesBanner />
      <HomeGallery />
      <About />
      <FAQ />
      <Social />
    </main>
  );
}
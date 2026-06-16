import { getDictionary } from "../dictionaries";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Results from "@/components/Results/Results";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import RevealManager from "@/components/Reveal/RevealManager";

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.nav} lang={lang} />
      <main id="top">
        <Hero dict={dict.hero} />
        <Results dict={dict.work} />
        <Skills dict={dict.skills} />
        <Experience dict={dict.experience} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
      <RevealManager />
    </>
  );
}

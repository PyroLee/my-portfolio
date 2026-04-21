import { getDictionary } from "../dictionaries";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

export default async function Home({ params }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);

  return (
    <>
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <ScrollIndicator />
      <main>
        <Hero dict={dict.hero} />
        <About dict={dict.about} />
        <Skills dict={dict.skills} />
        <Experience dict={dict.experience} />
      </main>
      <Footer dict={{ ...dict.footer, contact: dict.navigation.contact }} lang={resolvedParams.lang} />
    </>
  );
}

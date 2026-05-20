
import HeroSection from "../components/home/HeroSection";
import ThinkingSection from "../components/home/ThinkingSection";
import ValuesSection from "../components/home/ValuesSection";
import Seo from "../components/seo/Seo";

export default function Homepage() {
  return (
    <>
      <Seo
        title="Gabriele Todaro | Sviluppatore Full-Stack"
        description="Portfolio di Gabriele Todaro, sviluppatore full-stack specializzato in applicazioni web moderne, interfacce React e soluzioni backend solide."
        path="/"
      />
      <HeroSection />
      <ThinkingSection />
      <ValuesSection />
    </>
  )
}

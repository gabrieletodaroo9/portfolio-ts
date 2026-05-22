
import HeroSection from "../components/home/HeroSection";
import ThinkingSection from "../components/home/ThinkingSection";
import ValuesSection from "../components/home/ValuesSection";
import Seo from "../components/seo/Seo";

export default function Homepage() {
  return (
    <>
      <Seo
        title="Gabriele Todaro - Sviluppatore Full-Stack"
        description="Portfolio di Gabriele Todaro, anche cercato come Todaro Dev o Tod Dev: sviluppatore full-stack specializzato in React, TypeScript, Laravel, MySQL e applicazioni web moderne."
        path="/"
        keywords={[
          "todaro dev portfolio",
          "tod dev sviluppatore",
          "todaro sviluppatore web",
          "sviluppatore siti web",
        ]}
      />
      <HeroSection />
      <ThinkingSection />
      <ValuesSection />
    </>
  )
}

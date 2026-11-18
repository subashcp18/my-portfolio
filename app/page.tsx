import Manifesto from "@/components/Manifesto";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Thoughts from "@/components/Thoughts";
import ContactAndFooter from "@/components/ContactAndFooter";
import HomeIntro from "@/components/HomeIntro";
import Experience from "@/components/Experience";
import Loader from "@/components/Loader";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <div className="relative w-full">
      <Loader />

      <HomeIntro />
      <Manifesto />
      <Experience />
      {/* <Projects /> */}
      <Testimonials />
      <TechMarquee />
      <Thoughts />
      <ContactAndFooter />
    </div>
  );
}

import HeroSection from "@/features/home/components/HeroSection";
import ProjectSection from "@/features/home/components/ProjectSection";
import TechStackSection from "@/features/home/components/TechStackSection";

export default function Home() {
  return (
    <div>
      <HeroSection /> 
      <TechStackSection />
      <ProjectSection/>
    </div>
  );
}

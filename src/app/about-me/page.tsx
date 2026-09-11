import Header from "@/components/Header";
import DescriptionSection from "@/features/about-me/components/DescriptionSection";
import ExperienceSection from "@/features/about-me/components/ExperienceSection";
import TechStackSection from "@/features/about-me/components/TechStackSection";
import EducationSection from "@/features/about-me/components/EducationSection";

export default function AboutMe() {
  return (
    <main className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-8 sm:gap-10">
      <Header
        title="About Me"
        subtitle="A breakdown of my background, the tools I use, and my journey so far."
        iconName="IdentificationBadgeIcon"
      />

      <DescriptionSection />
      <ExperienceSection />
      <TechStackSection />
      <EducationSection />
    </main>
  );
}
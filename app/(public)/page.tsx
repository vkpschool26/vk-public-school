import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AcademicsHighlights } from "@/components/home/AcademicsHighlights";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { LatestEvents } from "@/components/home/LatestEvents";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <WhyChooseUs />
      <AcademicsHighlights />
      <ActivitiesSection />
      <FacilitiesSection />
      <LatestEvents />
      <GalleryPreview />
      <AdmissionsCTA />
      <ContactSection />
    </>
  );
}

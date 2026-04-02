import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HudOverlay from "@/components/HudOverlay";

const Index = () => (
  <>
    <Navbar />
    <HudOverlay />
    <HeroSection />
    <HowItWorksSection />
    <FeaturesSection />
    <Footer />
  </>
);

export default Index;

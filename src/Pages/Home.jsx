import HeroSection from "./Hero";
import Navbar from "../Components/Navbar";
import BestSellers from "./BestSeller";
import GoodnessSection from "./GoodnessSection";
import TrustSection from "./TrustSection";
import TestimonialCarousel from "./TestimonialCarousel";
import FooterInfo from "./Footer";
import MamaearthUI from "./MamaearthUI";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <BestSellers />
      <GoodnessSection />
      <TrustSection />
      <TestimonialCarousel />
      <FooterInfo />
      <MamaearthUI />
    </div>
  );
};

export default HomePage;
import HeroSection from "../Pages/Hero";
import Navbar from "../Components/Navbar";
import BestSellers from "../Pages/BestSeller";
import GoodnessSection from "../Pages/GoodnessSection";
import TrustSection from "../Pages/TrustSection";
import TestimonialCarousel from "../Pages/TestimonialCarousel";
import FooterInfo from "../Components/Footer";
import MamaearthUI from "../Pages/MamaearthUI";

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
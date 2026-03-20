import { motion , AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

const HeroSection = () => {
  const backgroundImages = [
    "https://st-images.honasa.in/Sunscreen_banner_GIF_06bffadac5.gif?width=&qualilty=",
    "https://st-images.honasa.in/1920_X512_b839243f92.jpg?format=auto&width=&qualilty=",
    "https://st-images.honasa.in/1920_X512_2de8ac5a19.jpg?format=auto&width=&qualilty=",
    "https://st-images.honasa.in/Sunscreen_banner_GIF_06bffadac5.gif?width=&qualilty="
  ];


  const [currentBg, setCurrentBg] = useState(0);

  // Auto slide background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-[70vh] flex-col lg:flex-row items-center justify-between px-6 py-12 overflow-hidden">
      
      {/* Background Carousel */}
      <AnimatePresence>
        <motion.div
          key={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
        ></motion.div>
      </AnimatePresence>  
    </div>
  );
};
export default HeroSection
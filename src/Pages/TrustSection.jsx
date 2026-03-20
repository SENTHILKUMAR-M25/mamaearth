import React from 'react';

const TrustSection = () => {
  const certifications = [
    {
      title: "Dermatologically Tested",
      desc: "We ensure each product is tested clinically on the sensitive human skin to ensure that it is not allergic.",
      icon: "https://images.mamaearth.in/wysiwyg/dermatology-tested-100x100.png", // Replace with your local icon path
    },
    {
      title: "FDA Approved",
      desc: "MamaEarth is FDA approved, which means we are 100% safe to be used for babies as well as mamas.",
      icon: "https://images.mamaearth.in/wysiwyg/fda-100x100.jpg",
    },
    {
      title: "Made Safe Certified",
      desc: "The MADE SAFE (Made with Safe Ingredients™) seal means that a product is literally made with safe ingredients.",
      icon: "https://images.mamaearth.in/wysiwyg/msafe-100x100.jpg",
    }
  ];

  return (
    <div className="w-full font-sans">
      {/* 1. WE PLANT GOODNESS BANNER */}
      <div 
        className="relative w-full h-[350px] md:h-[450px] bg-cover bg-center flex items-center justify-end pr-4 md:pr-24 lg:pr-40"
        style={{ 
          backgroundImage: `url('https://images.mamaearth.in/wysiwyg/desktop_home_img.png?format=auto')`, // Replace with your tree background
          backgroundColor: '#e0f4f9' 
        }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 uppercase tracking-wide">
            WE PLANT GOODNESS
          </h2>
          
          <div className="text-4xl md:text-6xl font-bold text-[#8CC63F] my-2">
            1093966
          </div>
          
          <p className="text-gray-600 font-medium leading-tight">
            Trees have got life already...<br />
            Everytime you buy from us, we plant more trees!
          </p>

          <button className="mt-6 px-10 py-2 bg-[#00B5EF] text-white font-bold rounded-md hover:bg-[#0094C4] transition-all relative shadow-[0_4px_0_0_rgba(0,148,196,1)] active:translate-y-[2px] active:shadow-none">
            Know More
          </button>
        </div>
      </div>

      {/* 2. SUPER SAFE STANDARDS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-10">
          Super Safe Standards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <img 
                src={item.icon} 
                alt={item.title} 
                className="w-20 h-20 object-contain flex-shrink-0" 
              />
              <div>
                <h4 className="font-bold text-gray-800 text-base mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-[13px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-[#00B5EF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrustSection;
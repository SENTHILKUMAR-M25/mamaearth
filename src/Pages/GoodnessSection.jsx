import React from 'react';

const GoodnessSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 font-sans">
      
      {/* Left Column: Video Thumbnail */}
      <div className="w-full md:w-1/2">
        <div className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-2xl">
          {/* Main Image */}
          <img 
            src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" // Replace with your baby/video thumbnail
            alt="Goodness Inside Video"
            className="w-full h-auto object-cover aspect-video"
          />
          
          {/* YouTube Overlay Elements */}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            {/* Play Button Icon */}
            <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
            </div>
          </div>

          {/* Top Video Title Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm" />
              <span className="text-sm font-medium truncate w-48 md:w-auto">
                Goodness Inside: Its all in the little choices w...
              </span>
            </div>
            <div className="flex gap-4 opacity-90">
              <button className="flex flex-col items-center"><span className="text-[10px]">Watch later</span></button>
              <button className="flex flex-col items-center"><span className="text-[10px]">Share</span></button>
            </div>
          </div>

          {/* YouTube Bottom Logo */}
          <div className="absolute bottom-4 right-4 text-white font-bold italic opacity-80 flex items-center gap-1">
            <span className="bg-red-600 px-1 rounded text-[10px] not-italic">▶</span> YouTube
          </div>
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="w-full md:w-1/2 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Our Goodness Promise
        </h2>
        
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 px-4 md:px-0">
          At Mamaearth, we live to spread a little love and goodness every day. We believe that 
          goodness isn't a superpower, nor a special gift, it's inside all of us and it shows in the little 
          choices we make. Our mission is to bring you the best of nature through our purest and most 
          nurturing products that are made without any toxins or harmful chemicals. For us goodness 
          also means being good to the earth. Which is why we recycle more plastic than we use and 
          we're PETA Certified - which means we never test on animals. This is our #GoodnessInside.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row justify-center items-center gap-4">
          <button className="px-10 py-3 bg-[#00B5EF] text-white font-bold rounded-lg text-sm tracking-wider uppercase shadow-md hover:bg-[#0094C4] transition-all">
            SHOP NOW
          </button>
          <button className="px-10 py-3 bg-white text-[#00B5EF] border border-[#00B5EF] font-bold rounded-lg text-sm tracking-wider uppercase hover:bg-cyan-50 transition-all">
            OUR PLEDGES
          </button>
        </div>
      </div>

    </div>
  );
};

export default GoodnessSection;
import React from 'react';
// Import your local image from the assets folder
// !!! IMPORTANT: Replace 'hero-image.png' with your actual image filename and extension !!!
import heroImage from '../../assets/landing3.webp';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-[80vh] lg:min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 px-4 py-10 overflow-hidden">
      {/* Background Abstract Shapes (Enhanced & More Dynamic) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30"> 
        {/* Larger, more vibrant, and active blobs */}
        <div className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-70 -top-28 -left-28 transform rotate-15 animate-float-slow"></div>
        <div className="absolute w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-60 bottom-16 left-1/4 transform -rotate-45 animate-float-slow-alt"></div>
        <div className="absolute w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-70 bottom-28 right-28 transform -rotate-30 animate-float-slow"></div>
      </div>
      <style>
      
      </style>

      {/* Content Section (Left side on larger screens) */}
      <div className="relative z-10 max-w-xl text-center lg:text-left lg:w-1/2 lg:pr-20 mb-10 lg:mb-0 animate-slide-in-right py-8">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold mb-6 text-blue-900 leading-tight tracking-tight drop-shadow-lg"> {/* Stronger drop-shadow */}
          Empowering Futures, Together
        </h1>
        <p className="text-xl sm:text-2xl md:text-2xl mb-12 leading-relaxed text-gray-700">
          Uniting therapists and parents with personalized tools and local resources to foster growth and support for autistic children in Ethiopia.
        </p>
        <a
          href="#get-started"
          className="inline-block bg-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold border-2 border-blue-700 hover:border-blue-900" /* Enhanced CTA */
        >
          Discover Collaborative Care
        </a>
        <p className="mt-8 text-base text-gray-600 font-medium">
          Trusted by dedicated therapists and loving families across Ethiopia.
        </p>
      </div>

      {/* Illustration Section (Right side on larger screens) */}
      <div className="relative z-10 lg:w-1/2 flex justify-center items-center p-6 animate-slide-in-left">
        <img
          src={heroImage} // Using your locally imported image
          alt="Illustration representing online therapy, connection, or platform interface"
          width={700}
          height={450}
          className="w-full max-w-lg lg:max-w-xl h-auto object-contain transition-transform duration-500 ease-out transform hover:scale-105 shadow-2xl border-4 border-white" /* Re-added shadow-2xl and a white border */
          loading="eager"
        />
      </div>
    </section>
  );
};

export default HeroSection;
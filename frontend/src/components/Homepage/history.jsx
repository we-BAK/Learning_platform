import React from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2010",
    title: "Our Beginning",
    description: "Bright Autism Center was founded by Dr. Emily Chen, a passionate child psychologist, recognizing the need for specialized autism services. We started with three therapists and a small office."
  },
  {
    year: "2015",
    title: "Expanding Our Reach",
    description: "After five years of consistent growth, we expanded to a larger facility and increased our staff to 15 specialized therapists, introducing new programs and serving more families."
  },
  {
    year: "2020",
    title: "Innovation in Therapy",
    description: "Recognizing communication challenges, we began developing the Bright Connect platform to bridge the gap between parents and therapists, enhancing the therapeutic journey."
  },
  {
    year: "Today",
    title: "Bright Connect Today",
    description: "Bright Autism Center now helps over 500 families annually with a team of 40+ professionals across three locations. Our commitment to innovation and quality care drives our mission."
  }
];

export default function OurJourney() {
  return (
    <section className="py-20 bg-blue-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our <span className="text-blue-600">Growth Journey</span>
        </motion.h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-16">
          From a small clinic to a leading autism therapy provider, our journey is marked by dedication, innovation, and a passion for empowering families.
        </p>
      </div>
      
      {/* Timeline Container */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Vertical Line for Mobile/Tablet */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-300 md:hidden"></div>
        {/* Horizontal Line for Desktop */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-300 hidden md:block" style={{ width: 'calc(100% - 100px)', transform: 'translateX(50px)' }}></div>
        
        {/* Adjusted: Removed overflow-x-auto and scrollbar classes */}
        {/* flex-col for mobile, flex-row for desktop */}
        <div className="flex flex-col md:flex-row md:space-x-12 items-center md:items-stretch justify-center"> 
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index} 
              // Removed flex-none, replaced with w-full for mobile, w-80 for desktop
              className="w-full md:w-80 flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100 mb-8 md:mb-0 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            >
              {/* Year Circle & Connector Line */}
              {/* Desktop version (horizontal timeline) */}
              <div className="hidden md:block absolute top-1/2 -left-12 transform -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-md"></div>
              </div>
              {/* Mobile version (vertical timeline) */}
              <div className="md:hidden absolute -left-4 top-1/2 transform -translate-y-1/2"> {/* Adjusted position for vertical line */}
                 <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-md"></div>
              </div>

              <h3 className="text-3xl font-extrabold text-blue-700 mb-3">{milestone.year}</h3>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">{milestone.title}</h4>
              <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
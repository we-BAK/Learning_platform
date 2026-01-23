import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-200 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-8xl mb-6 block animate-bounce">🌟</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Our Story
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 mb-12">
            Discover the journey of <span className="font-bold text-blue-600">Bright Autism Center</span> and how we're making a difference in the lives of children with autism in Ethiopia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission & Vision Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🎯</span>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Bright Autism Center, we are committed to providing <span className="font-semibold text-blue-600">tailored education</span> and <span className="font-semibold text-blue-600">therapy</span> to children with Autism Spectrum Disorder (ASD). We believe every child deserves the opportunity to reach their full potential.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">What We Do:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Personalized therapy programs</li>
                  <li>• Specialized educational support</li>
                  <li>• Family guidance and training</li>
                  <li>• Community awareness programs</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 text-center">
              <span className="text-6xl mb-4 block">🌍</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-gray-600">To create an <span className="font-semibold">inclusive environment</span> where autistic children thrive through holistic, personalized care, making Ethiopia a beacon of hope for autism support.</p>
            </div>
          </div>
        </section>

        {/* Location & Impact Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Located in Hawassa, Ethiopia</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Serving the beautiful city of Hawassa and surrounding regions with dedicated autism support services.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <span className="text-5xl mb-4 block">🏥</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Care</h3>
                <p className="text-gray-600">Expert therapists and educators dedicated to your child's development</p>
              </div>
              <div className="text-center">
                <span className="text-5xl mb-4 block">👨‍👩‍👧‍👦</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Family Support</h3>
                <p className="text-gray-600">Comprehensive guidance for families throughout their journey</p>
              </div>
              <div className="text-center">
                <span className="text-5xl mb-4 block">🌱</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Growth & Progress</h3>
                <p className="text-gray-600">Measurable improvements in communication and life skills</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Families Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from families whose lives have been transformed by our services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">💙</span>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Parent Testimonial</h3>
                  <p className="text-blue-600 text-sm">Mother of 6-year-old with ASD</p>
                </div>
              </div>
              <blockquote className="text-blue-700 italic leading-relaxed">
                "Bright Autism Center has transformed our child's life and given us hope. The therapists are incredibly dedicated and the progress we've seen is remarkable."
              </blockquote>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">💜</span>
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">Family Success Story</h3>
                  <p className="text-purple-600 text-sm">Parents of 8-year-old with ASD</p>
                </div>
              </div>
              <blockquote className="text-purple-700 italic leading-relaxed">
                "The personalized approach and family support have made all the difference. Our child is now thriving in ways we never imagined possible."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Support our work and help us reach more families in need of autism support services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donate"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Donate Now 💖
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Contact Us 📞
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Welcome;

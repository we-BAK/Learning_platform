import React from 'react';
import Hero from '../components/Homepage/Hero';
import Features from '../components/Homepage/Features';
import OurJourney from '../components/Homepage/history'; 

function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Our Journey (History) Section */}
      <OurJourney /> 
      
      {/* Features Section */}
      <Features />
    </>
  );
}

export default Home;
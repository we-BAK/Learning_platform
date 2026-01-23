import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, Calendar, BarChart2, Book, Flag, Users, Heart, Zap, Lock, Star, Target } from "lucide-react";

const features = [
  {
    icon: <MessageSquare size={32} className="text-white" />,
    title: "Real-time Messaging",
    description: "Instant communication between parents and therapists with read receipts and typing indicators.",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    benefits: ["Instant notifications", "Read receipts", "File sharing", "Voice messages"]
  },
  {
    icon: <Calendar size={32} className="text-white" />,
    title: "Smart Scheduling",
    description: "Intelligent calendar system for scheduling therapy sessions with automated reminders and confirmations.",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    benefits: ["Auto-reminders", "Conflict detection", "Reschedule options", "Calendar sync"]
  },
  {
    icon: <BarChart2 size={32} className="text-white" />,
    title: "Progress Analytics",
    description: "Comprehensive progress tracking and reporting to keep parents informed about their child's development.",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    benefits: ["Visual charts", "Milestone tracking", "Progress reports", "Goal setting"]
  },
  {
    icon: <Book size={32} className="text-white" />,
    title: "Resource Hub",
    description: "Access to educational materials, exercises, and resources for continuing therapy support at home.",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    benefits: ["Video tutorials", "Printable exercises", "Expert articles", "Community resources"]
  },
  {
    icon: <ShieldCheck size={32} className="text-white" />,
    title: "Enterprise Security",
    description: "HIPAA-compliant communication with advanced encryption to protect sensitive information.",
    bgColor: "bg-gradient-to-br from-red-500 to-red-600",
    benefits: ["End-to-end encryption", "HIPAA compliance", "Regular audits", "Data backup"]
  },
  {
    icon: <Flag size={32} className="text-white" />,
    title: "Goal Management",
    description: "Set and monitor therapeutic goals with visual progress indicators and milestone celebrations.",
    bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    benefits: ["Smart goal setting", "Progress tracking", "Achievement badges", "Parent insights"]
  }
];

const additionalFeatures = [
  {
    icon: <Users size={32} className="text-blue-600" />,
    title: "Family Collaboration",
    description: "Connect multiple family members and caregivers for coordinated support."
  },
  {
    icon: <Heart size={32} className="text-pink-600" />,
    title: "Emotional Support",
    description: "Access to support groups and counseling resources for families."
  },
  {
    icon: <Zap size={32} className="text-yellow-600" />,
    title: "Quick Actions",
    description: "Streamlined workflows for common tasks and emergency situations."
  },
  {
    icon: <Lock size={32} className="text-gray-600" />,
    title: "Privacy Controls",
    description: "Granular privacy settings to control who sees what information."
  },
  {
    icon: <Star size={32} className="text-purple-600" />,
    title: "Quality Assurance",
    description: "Regular quality checks and therapist performance monitoring."
  },
  {
    icon: <Target size={32} className="text-green-600" />,
    title: "Outcome Focus",
    description: "Evidence-based approaches with measurable results and improvements."
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState('core');

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
            <span className="text-8xl mb-6 block animate-bounce">✨</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Platform Features
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 mb-12">
            Discover the powerful tools and features that make Bright Connect the leading platform for autism support and therapy management.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Feature Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('core')}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 ${
              activeTab === 'core'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200 hover:scale-105'
            }`}
          >
            Core Features
          </button>
          <button
            onClick={() => setActiveTab('additional')}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 ${
              activeTab === 'additional'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200 hover:scale-105'
            }`}
          >
            Additional Benefits
          </button>
        </div>

        {/* Core Features */}
        {activeTab === 'core' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${feature.bgColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Benefits List */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Additional Features */}
        {activeTab === 'additional' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {additionalFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families who are already benefiting from our comprehensive autism support platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
              <button className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 
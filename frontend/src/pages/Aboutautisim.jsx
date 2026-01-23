import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mythsFacts = [
  { 
    myth: "Autism is caused by bad parenting.", 
    fact: "Autism is a neurodevelopmental condition with no link to parenting style.",
    icon: "👩‍👧‍👦"
  },
  { 
    myth: "People with autism don't want friends.", 
    fact: "Many people with autism want friends but may struggle with social skills.",
    icon: "🤝"
  },
  { 
    myth: "All autistic people have intellectual disabilities.", 
    fact: "Autism is a spectrum; abilities and challenges vary widely.",
    icon: "🧠"
  },
  { 
    myth: "Autism can be cured.", 
    fact: "There is no cure, but support and therapies can help individuals thrive.",
    icon: "💊"
  },
];

const resources = [
  { 
    name: "Autism Speaks", 
    url: "https://www.autismspeaks.org/",
    description: "Leading autism science and advocacy organization",
    icon: "🔬"
  },
  { 
    name: "Autistic Self Advocacy Network", 
    url: "https://autisticadvocacy.org/",
    description: "Run by and for autistic people",
    icon: "🎯"
  },
  { 
    name: "CDC Autism Information", 
    url: "https://www.cdc.gov/ncbddd/autism/index.html",
    description: "Official health information and resources",
    icon: "🏥"
  },
  { 
    name: "National Autistic Society", 
    url: "https://www.autism.org.uk/",
    description: "UK's leading autism charity",
    icon: "🇬🇧"
  },
];

const earlySigns = [
  { sign: "Limited eye contact or response to name", icon: "👁" },
  { sign: "Delayed speech or language skills", icon: "🗣" },
  { sign: "Repetitive movements (hand-flapping, rocking)", icon: "🔄" },
  { sign: "Strong preference for routines", icon: "📅" },
  { sign: "Difficulty understanding social cues", icon: "🤔" },
  { sign: "Unusual reactions to sounds, smells, or textures", icon: "👃" },
];

const platformBenefits = [
  { benefit: "Connects families with qualified therapists", icon: "👩‍⚕️" },
  { benefit: "Tracks developmental progress and milestones", icon: "📈" },
  { benefit: "Offers resources and educational materials", icon: "📚" },
  { benefit: "Provides a supportive community for sharing experiences", icon: "👥" },
];

function AIChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm here to help answer your questions about autism. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const API_KEY = "AIzaSyBu3DQ6hIABHXuZGKUBsEnCpzcaI8GnQx4";

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `You are an autism awareness expert. Please provide helpful, accurate, and supportive information about: ${input}` }
                ]
              }
            ]
          })
        }
      );
      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't get a response right now. Please try again later.";
      setMessages(msgs => [...msgs, { sender: "ai", text: aiText }]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { sender: "ai", text: "I'm experiencing technical difficulties. Please try again in a moment." }
      ]);
    }
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group"
        aria-label="Open AI Chat"
      >
        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">💬</div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">AI</div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl w-96 z-50 border border-gray-200 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <div>
            <h3 className="font-bold text-lg">Autism AI Assistant</h3>
            <p className="text-blue-100 text-sm">Ask me anything about autism</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-blue-100 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
              msg.sender === "user" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-800 border border-gray-200"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type your question about autism..."
            disabled={loading}
          />
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 font-medium"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Aboutautisim() {
  const [activeSection, setActiveSection] = useState('introduction');
  const navigate = useNavigate();

  // Function to handle scroll and update active section using Intersection Observer
  useEffect(() => {
    const sections = [
      'introduction',
      'causes-diagnosis', 
      'early-signs',
      'support-intervention',
      'platform-help',
      'myths-facts',
      'resources'
    ];

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px', // Triggers when section is 20% from top and 70% from bottom
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Function to handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'causes-diagnosis', 
        'early-signs',
        'support-intervention',
        'platform-help',
        'myths-facts',
        'resources'
      ];
      
      const scrollPosition = window.scrollY + 220; // Increased offset for earlier detection
      
      // Find which section is currently most visible
      let currentSection = 'introduction';
      
      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          
          // Check if we've scrolled past this section's top
          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Increase offset to ensure title is fully visible
      const navHeight = 176; // Increased from 160 to 176 (44 * 4px)
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleGetStarted = () => {
    navigate('/registration'); // Navigate to registration page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Fixed Navigation Tabs - Positioned below main navbar */}
      <nav className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {[
              { id: 'introduction', label: 'Overview', icon: '🧩' },
              { id: 'causes-diagnosis', label: 'Causes', icon: '🧬' },
              { id: 'early-signs', label: 'Early Signs', icon: '👶' },
              { id: 'support-intervention', label: 'Support', icon: '🤝' },
              { id: 'myths-facts', label: 'Myths & Facts', icon: '❓' },
              { id: 'resources', label: 'Resources', icon: '🔗' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Add top padding to main content to account for both navbars */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Hero Section - Redesigned Overview */}
        <section id="introduction" className="text-center mb-20 scroll-mt-44">
          {/* Main Hero - No blue background */}
          <div className="mb-16">
            <span className="text-8xl mb-6 block animate-bounce">🧩</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Understanding Autism
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 mb-8">
              Autism spectrum disorder (ASD) is a neurodevelopmental condition that affects how people communicate, 
              interact, and experience the world.
            </p>
          </div>

          {/* Key Points - Redesigned without blue background */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Spectrum Condition</h3>
              <p className="text-gray-600 leading-relaxed">Each person with autism has unique strengths and challenges, making every individual's experience different.</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🧬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Neurodevelopmental</h3>
              <p className="text-gray-600 leading-relaxed">Autism affects brain development and function, influencing how individuals process information and interact with the world.</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Support Available</h3>
              <p className="text-gray-600 leading-relaxed">Early intervention and support can significantly improve outcomes and help individuals reach their full potential.</p>
            </div>
          </div>

          {/* Statistics Section - Redesigned with better visual hierarchy */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Key Facts About Autism</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 mb-3 group-hover:shadow-md transition-all duration-300">
                  <span className="text-3xl text-blue-600">1 in 36</span>
                </div>
                <p className="text-gray-700 font-medium">Children affected</p>
                <p className="text-gray-500 text-sm">in the United States</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 mb-3 group-hover:shadow-md transition-all duration-300">
                  <span className="text-3xl text-purple-600">2-5 years</span>
                </div>
                <p className="text-gray-700 font-medium">Typical diagnosis age</p>
                <p className="text-gray-500 text-sm">Early detection is key</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 mb-3 group-hover:shadow-md transition-all duration-300">
                  <span className="text-3xl text-green-600">100%</span>
                </div>
                <p className="text-gray-700 font-medium">Unique individuals</p>
                <p className="text-gray-500 text-sm">No two cases alike</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 mb-3 group-hover:shadow-md transition-all duration-300">
                  <span className="text-3xl text-orange-600">24/7</span>
                </div>
                <p className="text-gray-700 font-medium">Support available</p>
                <p className="text-gray-500 text-sm">Through our platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Causes and Diagnosis */}
        <section id="causes-diagnosis" className="mb-20 scroll-mt-44">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🧬</span>
                <h2 className="text-3xl font-bold text-gray-800">Causes and Diagnosis</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The exact causes of autism are not fully understood, but research suggests a combination of 
                genetic and environmental factors. Early diagnosis is crucial for better outcomes.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">Key Points:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Genetic factors play a significant role</li>
                  <li>• Environmental factors may contribute</li>
                  <li>• Diagnosis typically before age 3</li>
                  <li>• Specialized behavioral assessments required</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 text-center">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Early Detection Matters</h3>
              <p className="text-gray-600">The earlier autism is identified, the sooner interventions can begin, leading to better developmental outcomes.</p>
            </div>
          </div>
        </section>

        {/* Early Signs */}
        <section id="early-signs" className="mb-20 scroll-mt-44">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Early Signs of Autism</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recognizing early signs can lead to earlier diagnosis and intervention, which can significantly improve outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earlySigns.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <p className="text-gray-700 font-medium">{item.sign}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Support and Intervention */}
        <section id="support-intervention" className="mb-20 scroll-mt-44">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Support and Intervention</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Early intervention is key to helping children with autism develop essential skills and reach their full potential.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <span className="text-5xl mb-4 block">💬</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Speech Therapy</h3>
                <p className="text-gray-600">Improves communication skills and language development</p>
              </div>
              <div className="text-center">
                <span className="text-5xl mb-4 block">🎯</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Behavioral Therapy</h3>
                <p className="text-gray-600">Helps develop positive behaviors and social skills</p>
              </div>
              <div className="text-center">
                <span className="text-5xl mb-4 block">🤲</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Occupational Therapy</h3>
                <p className="text-gray-600">Enhances daily living skills and motor coordination</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Benefits */}
        <section id="platform-help" className="mb-20 scroll-mt-44">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Our Platform Helps</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support for families and individuals affected by autism.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {platformBenefits.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <p className="text-gray-700 font-medium text-lg">{item.benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Myths vs. Facts */}
        <section id="myths-facts" className="mb-20 scroll-mt-44">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Myths vs. Facts</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Let's dispel common misconceptions about autism with accurate information.
            </p>
          </div>
          <div className="space-y-6">
            {mythsFacts.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">Myth #{idx + 1}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-400">
                    <h4 className="font-bold text-red-700 mb-2">❌ Myth</h4>
                    <p className="text-red-600">{item.myth}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-400">
                    <h4 className="font-bold text-green-700 mb-2">✅ Fact</h4>
                    <p className="text-green-600">{item.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="mb-20 scroll-mt-44">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">External Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore these trusted organizations for more information and support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{res.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors mb-2">
                      {res.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{res.description}</p>
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                      Visit Website →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with qualified therapists and start your journey toward better support and understanding.
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </main>

      <AIChat />
    </div>
  );
}

export default Aboutautisim;

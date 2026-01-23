// src/components/Parentcomponent/Supportingmaterials.jsx (formerly LearningTab)
import { useState } from 'react';
import { Sparkles, Users, Book, PenTool, Mic, MessageCircle, Eye, Dumbbell } from 'lucide-react';

// Import your new static pages
import SelfHelpingPage from './SupportingMaterials/Selfhelping';
import SocialSkillsPage from './SupportingMaterials/SocialSkillsPage';
import BasicKnowledgePage from './SupportingMaterials/Basicknowledge';
import HandwritingPage from './SupportingMaterials/Handwriting';
import SpeechTherapyPage from './SupportingMaterials/Speech'; 
import CommunicationPage from './SupportingMaterials/Communication';
import FocusOnThingsPage from './SupportingMaterials/Focus';
import PhysicalExercisePage from './SupportingMaterials/Physicalexecrise';


export default function SupportingMaterialsTab({ childId }) { // childId might be useful for future dynamic content
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: "self-helping", label: "Self-Helping", icon: Sparkles, description: "Resources to foster independence and life skills." },
    { id: "social-skill", label: "Social Skills", icon: Users, description: "Activities and guides for better interaction with others." },
    { id: "basic-knowledge", label: "Basic Knowledge", icon: Book, description: "Foundational concepts and educational materials for development." },
    { id: "hand-writing", label: "Handwriting", icon: PenTool, description: "Exercises and tools to improve fine motor skills and writing." },
    { id: "speech-therapy", label: "Speech Therapy", icon: Mic, description: "Materials to support speech and language development." },
    { id: "communication", label: "Communication", icon: MessageCircle, description: "Techniques and games to enhance expressive and receptive communication." },
    { id: "focus-on-things", label: "Focus & Attention", icon: Eye, description: "Strategies and practices to improve concentration and attention span." },
    { id: "physical-exercise", label: "Physical Exercise", icon: Dumbbell, description: "Engaging activities for physical development and motor skills." },
  ];

  const renderCategoryPage = () => {
    switch (selectedCategory) {
      case "self-helping": return <SelfHelpingPage onBack={() => setSelectedCategory(null)} />;
      case "social-skill": return <SocialSkillsPage onBack={() => setSelectedCategory(null)} />;
      case "basic-knowledge": return <BasicKnowledgePage onBack={() => setSelectedCategory(null)} />;
      case "hand-writing": return <HandwritingPage onBack={() => setSelectedCategory(null)} />;
      case "speech-therapy": return <SpeechTherapyPage onBack={() => setSelectedCategory(null)} />;
      case "communication": return <CommunicationPage onBack={() => setSelectedCategory(null)} />;
      case "focus-on-things": return <FocusOnThingsPage onBack={() => setSelectedCategory(null)} />;
      case "physical-exercise": return <PhysicalExercisePage onBack={() => setSelectedCategory(null)} />;
      default: return null; // Should not happen if selectedCategory is null
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-full">
      {!selectedCategory ? (
        <>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3 leading-tight">Supporting Materials</h1>
          <p className="text-gray-600 mb-10 text-lg">Explore resources tailored to your child's developmental journey. Click a category to learn more.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-start gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shadow-inner">
                  <category.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-1">{category.label}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        renderCategoryPage()
      )}
    </div>
  );
}
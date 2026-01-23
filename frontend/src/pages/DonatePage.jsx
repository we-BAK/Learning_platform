import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chapaFormRef = useRef(null);

  const presetAmounts = [
    { value: "100", label: "100 ETB", description: "Provides therapy materials" },
    { value: "250", label: "250 ETB", description: "Supports one therapy session" },
    { value: "500", label: "500 ETB", description: "Funds educational resources" },
    { value: "1000", label: "1000 ETB", description: "Sponsors a child for a week" }
  ];

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) < 10) {
      alert("Please enter a valid donation amount (minimum 10 ETB)");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate processing delay
    setTimeout(() => {
      const form = chapaFormRef.current;
      if (form) {
        form.elements.amount.value = amount;
        form.elements.tx_ref.value = `donation-${Date.now()}`;
        form.elements.email.value = email;
        form.submit();
      }
      setIsSubmitting(false);
    }, 2000);
  };

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
            <span className="text-8xl mb-6 block animate-bounce"></span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Make a Difference
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-600 mb-12">
            Your donation helps us provide quality education and therapy to children with Autism Spectrum Disorder. Every contribution makes a real difference in their lives.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Donation Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Support Our Mission</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preset Amounts */}
              <div>
                <label className="block text-gray-700 font-semibold mb-4">
                  Choose an Amount <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handleAmountSelect(preset.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedAmount === preset.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-bold text-lg">{preset.label}</div>
                      <div className="text-sm text-gray-600">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Or Enter Custom Amount (ETB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="10"
                  placeholder="Enter amount (minimum 10 ETB)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum donation: 10 ETB</p>
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Donation...
                  </div>
                ) : (
                  'Donate Now 💖'
                )}
              </button>
            </form>
          </div>

          {/* Impact Information */}
          <div className="space-y-8">
            {/* How Your Donation Helps */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">How Your Donation Helps</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-semibold">Therapy Materials</p>
                    <p className="text-green-100">Educational toys, sensory equipment, and learning resources</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">👩‍⚕️</span>
                  <div>
                    <p className="font-semibold">Professional Training</p>
                    <p className="text-green-100">Continued education for our therapists and staff</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-semibold">Facility Improvements</p>
                    <p className="text-green-100">Better therapy rooms and learning environments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Impact */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">100 ETB</span>
                  <span className="font-semibold text-gray-800">1 therapy session</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">500 ETB</span>
                  <span className="font-semibold text-gray-800">1 week of support</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">1000 ETB</span>
                  <span className="font-semibold text-gray-800">1 month of care</span>
                </div>
              </div>
            </div>

            {/* Alternative Donation Methods */}
            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Other Ways to Help</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <p className="font-semibold text-blue-800">Visit Our Center</p>
                    <p className="text-blue-600">Donate in person at our Hawassa location</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-blue-800">Call Us</p>
                    <p className="text-blue-600">+251 911 234 567 for direct donations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold text-blue-800">Email Us</p>
                    <p className="text-blue-600">info@brightautismcenter.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="mt-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">What Donors Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <blockquote className="text-blue-700 italic leading-relaxed mb-4">
                  "Knowing that my donation directly helps children with autism receive the care they need gives me great satisfaction."
                </blockquote>
                <p className="text-blue-800 font-semibold">— Sarah M., Monthly Donor</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
                <blockquote className="text-purple-700 italic leading-relaxed mb-4">
                  "I've seen the incredible work this center does. Every birr donated makes a real difference in these children's lives."
                </blockquote>
                <p className="text-purple-800 font-semibold">— Dr. Ahmed K., Supporter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Hidden Chapa Form */}
      <form
        ref={chapaFormRef}
        method="POST"
        action="https://api.chapa.co/v1/hosted/pay"
        className="hidden"
      >
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-oXypw6ipgqWUxFtbCqtkzfB4zV4BpEf2" />
        <input type="hidden" name="tx_ref" value="" />
        <input type="hidden" name="amount" value="" />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value="" />
        <input type="hidden" name="first_name" value="Bright" />
        <input type="hidden" name="last_name" value="Supporter" />
        <input type="hidden" name="title" value="Donation to Bright Autism Center" />
        <input type="hidden" name="description" value="Thank you for supporting Bright Autism Center" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
        <input type="hidden" name="return_url" value="https://example.com/thank-you" />
        <input type="hidden" name="meta[title]" value="Donation" />
        <input type="hidden" name="meta[encryption_key]" value="UZrEIaifFSfg06J6D4zTZ8zj" />
      </form>
    </div>
  );
};

export default DonatePage;

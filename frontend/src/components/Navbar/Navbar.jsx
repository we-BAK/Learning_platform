                                                            import React, { useState, useEffect, useCallback } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/favs/favicon.ico';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    setIsScrolled(position > 50);
    setScrollProgress(totalHeight ? (position / totalHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Autism', href: 'about-autism' },
    { name: 'Our History', href: 'Ourstory' },
    { name: 'Features', href: 'features' },
    { name: 'Contact', href: 'contact' }
  ];

  const showButtons = !['/login', '/registration', '/donate'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');
  const isManagerPage = location.pathname.startsWith('/manager');
  const isTherapistPage = location.pathname.startsWith('/therapist');

  // Admin Header
  if (isAdminPage) {
    return (
      <header className="fixed w-full z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/admin" className="text-xl font-bold text-blue-600">Admin Dashboard</Link>
        <Link to="/" className="text-sm text-gray-500 hover:text-blue-500">Back to Website</Link>
      </header>
    );
  }

  // Manager or Therapist Header (Only Logo)
  if (isManagerPage || isTherapistPage) {
    return (
      <header className="fixed w-full z-50 bg-white shadow-md p-4 flex items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">BrightBridge</Link>
        </div>
      </header>
    );
  }

  // Normal Public Header
  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-500 transition-all" style={{ width: `${scrollProgress}%` }} />

      <header className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">BrightBridge</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-6" role="navigation">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-lg text-gray-700 hover:text-blue-500 transition">
                {item.name}
              </a>
            ))}
          </nav>

          {/* Buttons */}
          {showButtons && (
            <div className="hidden xl:flex space-x-4">
              <Link to="/login" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">Log in</Link>
              <Link to="/registration" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">Send request</Link>
              <Link to="/donate" className="px-4 py-2 border border-[#FFA726] text-[#FFA726] rounded-md hover:bg-[#FFA726] hover:text-white transition">Donate</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`xl:hidden fixed inset-0 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button className="absolute top-4 right-4 p-2" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
          <nav className="flex flex-col items-center mt-16 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-lg text-gray-700 hover:text-blue-500 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {showButtons && (
              <div className="flex flex-col space-y-2 mt-4">
                <Link to="/login" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">Log in</Link>
                <Link to="/registration" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">Send request</Link>
                <Link to="/donate" className="px-4 py-2 border border-[#FFA726] text-[#FFA726] rounded-md hover:bg-[#FFA726] hover:text-white transition">Donate</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation;

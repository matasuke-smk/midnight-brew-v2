import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 26; // ヘッダーとセクション名の隙間を1/3に調整
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-midnight-900/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <Coffee className="w-8 h-8 text-gold-500" />
            <span className="text-2xl font-serif font-bold text-midnight-50">
              Midnight Brew
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('commitment')}
              className="text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium"
            >
              こだわり
            </button>
            <button
              onClick={() => scrollToSection('monthly-coffee')}
              className="text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium"
            >
              今月のコーヒー
            </button>
            <button
              onClick={() => scrollToSection('plans')}
              className="text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium"
            >
              プラン
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium"
            >
              お客様の声
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('plans')}
              className="bg-gold-500 text-midnight-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              始める
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-midnight-50 p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-midnight-800/95 backdrop-blur-sm border-b border-gray-700">
            <nav className="flex flex-col py-4 px-4 space-y-4">
              <button
                onClick={() => scrollToSection('commitment')}
                className="text-left text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium py-2"
              >
                こだわり
              </button>
              <button
                onClick={() => scrollToSection('monthly-coffee')}
                className="text-left text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium py-2"
              >
                今月のコーヒー
              </button>
              <button
                onClick={() => scrollToSection('plans')}
                className="text-left text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium py-2"
              >
                プラン
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-midnight-100 hover:text-gold-500 transition-colors duration-200 font-medium py-2"
              >
                お客様の声
              </button>
              <button
                onClick={() => scrollToSection('plans')}
                className="bg-gold-500 text-midnight-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors duration-200 mt-4"
              >
                始める
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
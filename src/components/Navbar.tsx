
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center flex-shrink-0" onClick={closeMenu}>
          <img 
            src="/lovable-uploads/9a6f7ebc-d581-4d89-8381-0a69765dfcd3.png" 
            alt="Connecting Circle Logo" 
            className="h-8 sm:h-10 mr-2" 
          />
          <span className="text-xl sm:text-2xl font-semibold text-black">Connecting Circle</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-4 lg:space-x-8 mr-4 lg:mr-6">
            <Link to="/" className="text-black hover:text-circle transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-black hover:text-circle transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/coaching" className="text-black hover:text-circle transition-colors">
              {t('nav.coaching')}
            </Link>
            <Link to="/programs" className="text-black hover:text-circle transition-colors">
              {t('nav.programs')}
            </Link>
          </div>
          <div className="flex items-center">
            <Button asChild className="bg-circle hover:bg-circle-dark text-white rounded-full mr-4">
              <Link to="/book">{t('nav.book')}</Link>
            </Button>
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Button asChild className="bg-circle hover:bg-circle-dark text-white rounded-full mr-4">
            <Link to="/book" onClick={closeMenu}>{t('nav.book')}</Link>
          </Button>
          <div className="mr-4">
            <LanguageSelector />
          </div>
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute left-0 right-0 top-16 shadow-md animate-fade-in">
          <div className="flex flex-col space-y-4 p-4">
            <Link 
              to="/" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/about" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/coaching" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.coaching')}
            </Link>
            <Link 
              to="/programs" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.programs')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

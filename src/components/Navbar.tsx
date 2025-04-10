
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
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img 
            src="/lovable-uploads/9a6f7ebc-d581-4d89-8381-0a69765dfcd3.png" 
            alt="Connecting Circle Logo" 
            className="h-10 mr-3" 
          />
          <span className="text-2xl font-semibold text-circle-dark">connecting-circle</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-foreground hover:text-circle transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/about" className="text-foreground hover:text-circle transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/coaching" className="text-foreground hover:text-circle transition-colors">
            {t('nav.coaching')}
          </Link>
          <Link to="/programs" className="text-foreground hover:text-circle transition-colors">
            {t('nav.programs')}
          </Link>
          <Button asChild className="bg-circle hover:bg-circle-dark text-white rounded-full">
            <Link to="/book">{t('nav.book')}</Link>
          </Button>
          <div className="ml-4">
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <div className="mr-4">
            <LanguageSelector />
          </div>
          <button onClick={toggleMenu} className="text-circle-dark focus:outline-none">
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
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/coaching" 
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.coaching')}
            </Link>
            <Link 
              to="/programs" 
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              {t('nav.programs')}
            </Link>
            <Button asChild className="bg-circle hover:bg-circle-dark text-white w-full rounded-full">
              <Link to="/book" onClick={closeMenu}>{t('nav.book')}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex space-x-4 lg:space-x-8">
            <Link to="/" className="text-black hover:text-circle transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-black hover:text-circle transition-colors">
              About
            </Link>
            <Link to="/coaching" className="text-black hover:text-circle transition-colors">
              Coaching
            </Link>
            <Link to="/programs" className="text-black hover:text-circle transition-colors">
              Programs
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <Button asChild className="bg-circle hover:bg-circle-dark text-white rounded-full">
              <Link to="/book">Book Now</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center ml-auto">
          <Button asChild className="bg-circle hover:bg-circle-dark text-white rounded-full mr-4">
            <Link to="/book" onClick={closeMenu}>Book Now</Link>
          </Button>
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
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/coaching" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              Coaching
            </Link>
            <Link 
              to="/programs" 
              className="text-black hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              Programs
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

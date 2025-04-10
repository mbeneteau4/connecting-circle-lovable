
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
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <span className="text-2xl font-semibold text-circle-dark">connecting-circle</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-foreground hover:text-circle transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-foreground hover:text-circle transition-colors">
            About
          </Link>
          <Link to="/coaching" className="text-foreground hover:text-circle transition-colors">
            Coaching
          </Link>
          <Link to="/programs" className="text-foreground hover:text-circle transition-colors">
            Programs
          </Link>
          <Button asChild className="bg-circle hover:bg-circle-dark text-white rounded-full">
            <Link to="/book">Book Your Appointment</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
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
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/coaching" 
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              Coaching
            </Link>
            <Link 
              to="/programs" 
              className="text-foreground hover:text-circle transition-colors py-2"
              onClick={closeMenu}
            >
              Programs
            </Link>
            <Button asChild className="bg-circle hover:bg-circle-dark text-white w-full rounded-full">
              <Link to="/book" onClick={closeMenu}>Book Your Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

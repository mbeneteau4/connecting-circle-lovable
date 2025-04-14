
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8 md:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Connecting Circle</h3>
            <p className="mb-4 text-white/80 text-sm md:text-base">
              Authentic connections in a safe environment
            </p>
            <div className="flex items-center">
              <Heart size={16} className="mr-2 text-circle" />
              <span className="text-white/80 text-sm">Made with love in Berlin</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/coaching" className="text-white/80 hover:text-white transition-colors">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/80 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-white/80 hover:text-white transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Contact</h3>
            <p className="text-white/80 mb-2 text-sm md:text-base">
              Sophie Nicole Lemerle McGrath
            </p>
            <p className="text-white/80 mb-2 text-sm md:text-base">
              Berlin, Germany
            </p>
            <p className="text-white/80 text-sm md:text-base">
              <a 
                href="mailto:info@connecting-circle.de" 
                className="hover:text-white transition-colors"
              >
                info@connecting-circle.de
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/20 text-center text-white/60 text-xs md:text-sm">
          <p>&copy; {currentYear} Connecting Circle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

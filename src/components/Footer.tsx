
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">connecting-circle</h3>
            <p className="mb-4 text-white/80">
              Creating spaces for authentic connection, honest communication, and personal growth.
            </p>
            <div className="flex items-center">
              <Heart size={16} className="mr-2 text-circle" />
              <span className="text-white/80">Made with love in Berlin</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
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
                  Book Your Appointment
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-white/80 mb-2">
              Sophie Nicole Lemerle McGrath
            </p>
            <p className="text-white/80 mb-2">
              Berlin, Germany
            </p>
            <p className="text-white/80">
              <a 
                href="mailto:info@connecting-circle.de" 
                className="hover:text-white transition-colors"
              >
                info@connecting-circle.de
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
          <p>&copy; {currentYear} connecting-circle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

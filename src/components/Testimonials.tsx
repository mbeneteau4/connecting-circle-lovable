
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-circle-light/30">
      <div className="container-custom">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-circle-dark text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This section will be filled with testimonials later */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-circle/10 p-3 rounded-full">
                <Quote size={24} className="text-circle" />
              </div>
            </div>
            <p className="text-center text-foreground/80 italic mb-4">
              "Future testimonial will appear here."
            </p>
            <p className="text-center font-semibold text-circle-dark">Coming Soon</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-circle/10 p-3 rounded-full">
                <Quote size={24} className="text-circle" />
              </div>
            </div>
            <p className="text-center text-foreground/80 italic mb-4">
              "Future testimonial will appear here."
            </p>
            <p className="text-center font-semibold text-circle-dark">Coming Soon</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-circle/10 p-3 rounded-full">
                <Quote size={24} className="text-circle" />
              </div>
            </div>
            <p className="text-center text-foreground/80 italic mb-4">
              "Future testimonial will appear here."
            </p>
            <p className="text-center font-semibold text-circle-dark">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

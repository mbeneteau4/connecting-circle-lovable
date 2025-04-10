
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/70 to-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-circle-dark mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Honest communication & authentic encounters
            </motion.h1>
            
            <motion.div
              className="w-24 h-1 bg-circle mx-auto md:mx-0 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            ></motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-foreground/90 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              connecting-circle – where words touch, people connect and growth happens
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Looking for deep connections, honest conversations, and shared growth? connecting-circle 
              invites you to experience new things in a loving, queer-sensitive space – online & in person, 
              in German & English, with open & closed groups. Here you can develop, learn, feel, play, 
              grow and be truly in contact.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img 
              src="/lovable-uploads/5bcc8e2c-cdd5-4c6b-89de-ce9f5f2d9536.png" 
              alt="People embracing in an authentic relating circle" 
              className="rounded-lg shadow-lg max-w-full md:max-w-md lg:max-w-lg h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

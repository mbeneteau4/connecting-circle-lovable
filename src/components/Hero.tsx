
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
      <div className="container-custom text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-circle-dark mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Honest communication & authentic encounters
        </motion.h1>
        
        <motion.div
          className="w-24 h-1 bg-circle mx-auto mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        ></motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          connecting-circle – where words touch, people connect and growth happens
        </motion.p>
        
        <motion.p 
          className="text-base md:text-lg text-foreground/80 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Looking for deep connections, honest conversations, and shared growth? connecting-circle 
          invites you to experience new things in a loving, queer-sensitive space – online & in person, 
          in German & English, with open & closed groups. Here you can develop, learn, feel, play, 
          grow and be truly in contact.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;

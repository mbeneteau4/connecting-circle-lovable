
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/70 to-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            connecting-circle
          </motion.h1>
          
          <motion.div
            className="w-24 h-1 bg-circle mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          ></motion.div>
          
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-black mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {t('hero.main.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Removed the long description text */}
          </motion.div>
          
          <motion.div
            className="flex justify-center md:justify-end mb-6 md:mb-0 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img 
              src="/lovable-uploads/5bcc8e2c-cdd5-4c6b-89de-ce9f5f2d9536.png" 
              alt="People embracing in an authentic relating circle" 
              className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

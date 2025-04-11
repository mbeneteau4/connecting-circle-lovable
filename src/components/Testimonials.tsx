
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-circle-light/30">
      <div className="container-custom">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('testimonials.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* This section will be filled with testimonials later */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-circle/10 p-3 rounded-full">
                <Quote size={24} className="text-circle" />
              </div>
            </div>
            <p className="text-center text-black italic mb-4">
              {t('testimonials.placeholder')}
            </p>
            <p className="text-center font-semibold text-black">{t('testimonials.coming.soon')}</p>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-circle/10 p-3 rounded-full">
                <Quote size={24} className="text-circle" />
              </div>
            </div>
            <p className="text-center text-black italic mb-4">
              {t('testimonials.placeholder')}
            </p>
            <p className="text-center font-semibold text-black">{t('testimonials.coming.soon')}</p>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-circle/10 p-3 rounded-full">
                <Quote size={24} className="text-circle" />
              </div>
            </div>
            <p className="text-center text-black italic mb-4">
              {t('testimonials.placeholder')}
            </p>
            <p className="text-center font-semibold text-black">{t('testimonials.coming.soon')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

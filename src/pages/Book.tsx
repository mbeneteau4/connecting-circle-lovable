
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Book = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-circle-dark mb-6">
              {t('nav.book')}
            </h1>
            <div className="w-24 h-1 bg-circle mx-auto mb-6"></div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Schedule a session to begin your journey of authentic connection and growth.
            </p>
          </div>
        </section>
        
        {/* Booking Content */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="bg-circle-light/30 p-8 rounded-lg text-center">
              <p className="text-lg text-foreground/80">
                Booking functionality will be added soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;


import React from 'react';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import Testimonials from '@/components/Testimonials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" key={`index-page-${language}`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ServicesGrid />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

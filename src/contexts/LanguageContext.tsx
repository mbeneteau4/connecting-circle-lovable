
import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
}

const translations = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "About",
  "nav.coaching": "Coaching",
  "nav.programs": "Programs",
  "nav.book": "Book Your Appointment",
  
  // Hero section
  "hero.title": "Connecting Minds, Building Futures",
  "hero.subtitle": "Personalized coaching and mentorship to help you achieve your goals and transform your life",
  "hero.cta": "Start Your Journey",
  "hero.main.title": "Honest communication & authentic encounters",
  "hero.main.description": "connecting-circle – where words touch, people connect, and growth happens",
  "hero.main.longdesc": "Looking for deep connections, honest conversations, and shared growth? connecting-circle invites you to experience new perspectives in a loving, queer-sensitive space – online & in person, in German & English, in open & closed groups. Together we can develop, learn, feel, play, grow, and be truly in connection.",
  
  // Services section
  "services.title": "Our Services",
  "services.subtitle": "Discover how we can help you grow",
  "services.offerings": "Our Offerings",
  "services.readmore": "Read more",
  
  // Service cards
  "service.authentic.love.title": "Authentic Relating - Love and Sex",
  "service.authentic.love.desc": "A weekly live, in-person group in Berlin exploring authentic connections in love and intimate relationships.",
  
  "service.authentic.english.title": "Authentic Relating in Community - English",
  "service.authentic.english.desc": "A 6-week zoom course of 2 hours weekly. These run every quarter, connecting English speakers worldwide.",
  
  "service.authentic.german.title": "Authentic Relating in Community - German",
  "service.authentic.german.desc": "The same powerful ARC experience, but delivered entirely in German. Join our 6-week journey of connection.",
  
  "service.goldies.title": "connecting-circle GOLDies",
  "service.goldies.desc": "An online German closed group meeting weekly via zoom with twice-yearly live weekends, running January-June and September-December.",
  
  "service.private.title": "Private Sessions",
  "service.private.desc": "Individual or couples counseling providing a safe space to honestly explore relationships with yourself, loved ones, or the world.",
  
  "service.workshops.title": "Other Groups and Workshops",
  "service.workshops.desc": "Sophie leads regular groups and workshops in Berlin, including Cacao ceremonies and Findhorn Circle Dances & Sacred Dance.",
  
  // Testimonials section
  "testimonials.title": "What Our Clients Say",
  "testimonials.coming.soon": "Coming Soon",
  "testimonials.placeholder": "Future testimonials will appear here.",
  
  // Footer
  "footer.rights": "All rights reserved",
  "footer.contact": "Contact Us",
  "footer.slogan": "Creating spaces for authentic connection, honest communication, and personal growth.",
  "footer.made.with.love": "Made with love in Berlin",
  "footer.navigation": "Navigation",
  "footer.copyright": "All rights reserved."
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

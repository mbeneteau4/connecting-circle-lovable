
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
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
    
    // Services section
    "services.title": "Our Services",
    "services.subtitle": "Discover how we can help you grow",
    
    // Testimonials section
    "testimonials.title": "What Our Clients Say",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.contact": "Contact Us",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.coaching": "Coaching",
    "nav.programs": "Programme",
    "nav.book": "Termin buchen",
    
    // Hero section
    "hero.title": "Verbindung von Köpfen, Aufbau von Zukunft",
    "hero.subtitle": "Personalisiertes Coaching und Mentoring, um Ihnen zu helfen, Ihre Ziele zu erreichen und Ihr Leben zu verändern",
    "hero.cta": "Starten Sie Ihre Reise",
    
    // Services section
    "services.title": "Unsere Leistungen",
    "services.subtitle": "Entdecken Sie, wie wir Ihnen beim Wachsen helfen können",
    
    // Testimonials section
    "testimonials.title": "Was unsere Kunden sagen",
    
    // Footer
    "footer.rights": "Alle Rechte vorbehalten",
    "footer.contact": "Kontaktieren Sie uns",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Try to get the user's country using a geolocation API
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // If the user is from Germany, set language to German
        if (data.country_code === 'DE') {
          setLanguage('de');
        }
        
        // Store the detected language in localStorage to avoid repeated API calls
        localStorage.setItem('preferred_language', language);
      } catch (error) {
        console.error('Error detecting user location:', error);
      }
    };
    
    // Check if we have a saved language preference
    const savedLanguage = localStorage.getItem('preferred_language') as Language | null;
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguage(savedLanguage);
    } else {
      // If no saved preference, detect based on location
      detectUserCountry();
    }
  }, []);
  
  // Save language preference whenever it changes
  useEffect(() => {
    localStorage.setItem('preferred_language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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


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
    "hero.main.title": "Ehrliche Kommunikation & authentische Begegnungen",
    "hero.main.description": "connecting-circle – wo Worte berühren, Begegnung verbindet und Wachstum erblühen kann",
    "hero.main.longdesc": "Suchst du nach tiefen Verbindungen, ehrlichen Gesprächen und gemeinsamem Wachstum? connecting-circle lädt dich ein, neue Perspektiven in einem liebevollen, queer-sensiblen Raum zu erleben – online & persönlich, auf Deutsch & Englisch, in offenen & geschlossenen Gruppen. Zusammen können wir uns entwickeln, lernen, fühlen, spielen, wachsen und wirklich in Verbindung sein.",
    
    // Services section
    "services.title": "Unsere Leistungen",
    "services.subtitle": "Entdecken Sie, wie wir Ihnen beim Wachsen helfen können",
    "services.offerings": "Unsere Angebote",
    "services.readmore": "Mehr erfahren",
    
    // Service cards
    "service.authentic.love.title": "Authentic Relating - Liebe und Sexualität",
    "service.authentic.love.desc": "Eine wöchentliche Live-Gruppe in Berlin, die authentische Verbindungen in der Liebe und in intimen Beziehungen erforscht.",
    
    "service.authentic.english.title": "Authentic Relating in der Gemeinschaft - Englisch",
    "service.authentic.english.desc": "Ein 6-wöchiger Zoom-Kurs von 2 Stunden wöchentlich. Diese finden vierteljährlich statt und verbinden englischsprachige Menschen weltweit.",
    
    "service.authentic.german.title": "Authentic Relating in der Gemeinschaft - Deutsch",
    "service.authentic.german.desc": "Die gleiche kraftvolle ARC-Erfahrung, aber vollständig auf Deutsch. Nimm teil an unserer 6-wöchigen Verbindungsreise.",
    
    "service.goldies.title": "connecting-circle GOLDies",
    "service.goldies.desc": "Eine geschlossene deutschsprachige Online-Gruppe, die sich wöchentlich über Zoom trifft, mit halbjährlichen Live-Wochenenden von Januar bis Juni und September bis Dezember.",
    
    "service.private.title": "Einzelsitzungen",
    "service.private.desc": "Einzel- oder Paarberatung, die einen sicheren Raum bietet, um ehrlich die Beziehungen zu dir selbst, deinen Liebsten oder der Welt zu erforschen.",
    
    "service.workshops.title": "Andere Gruppen und Workshops",
    "service.workshops.desc": "Sophie leitet regelmäßige Gruppen und Workshops in Berlin, darunter Kakao-Zeremonien und Findhorn-Kreistänze & Sakraltänze.",
    
    // Testimonials section
    "testimonials.title": "Was unsere Kunden sagen",
    "testimonials.coming.soon": "Demnächst verfügbar",
    "testimonials.placeholder": "Zukünftige Erfahrungsberichte werden hier erscheinen.",
    
    // Footer
    "footer.rights": "Alle Rechte vorbehalten",
    "footer.contact": "Kontaktieren Sie uns",
    "footer.slogan": "Wir schaffen Räume für authentische Verbindung, ehrliche Kommunikation und persönliches Wachstum.",
    "footer.made.with.love": "Mit Liebe in Berlin gemacht",
    "footer.navigation": "Navigation",
    "footer.copyright": "Alle Rechte vorbehalten."
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

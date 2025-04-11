
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Video, Globe, UserRound, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCardProps {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  link: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ titleKey, descriptionKey, icon, link, delay }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="bg-circle-light p-2 sm:p-3 rounded-full mr-2 sm:mr-3 text-black">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-black">{t(titleKey)}</h3>
      </div>
      
      <p className="text-sm sm:text-base text-black mb-4">{t(descriptionKey)}</p>
      
      <Link 
        to={link} 
        className="flex items-center text-circle hover:text-circle-dark font-medium transition-colors"
      >
        {t('services.readmore')} <ArrowRight size={16} className="ml-1" />
      </Link>
    </motion.div>
  );
};

const ServicesGrid: React.FC = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      titleKey: "service.authentic.love.title",
      descriptionKey: "service.authentic.love.desc",
      icon: <Heart size={20} />,
      link: "/programs/authentic-relating",
      delay: 1
    },
    {
      titleKey: "service.authentic.english.title",
      descriptionKey: "service.authentic.english.desc",
      icon: <Video size={20} />,
      link: "/programs/arc-english",
      delay: 2
    },
    {
      titleKey: "service.authentic.german.title",
      descriptionKey: "service.authentic.german.desc",
      icon: <Globe size={20} />,
      link: "/programs/arc-german",
      delay: 3
    },
    {
      titleKey: "service.goldies.title",
      descriptionKey: "service.goldies.desc",
      icon: <Users size={20} />,
      link: "/programs/goldies",
      delay: 4
    },
    {
      titleKey: "service.private.title",
      descriptionKey: "service.private.desc",
      icon: <UserRound size={20} />,
      link: "/private-sessions",
      delay: 5
    },
    {
      titleKey: "service.workshops.title",
      descriptionKey: "service.workshops.desc",
      icon: <MapPin size={20} />,
      link: "/programs/workshops",
      delay: 6
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-8">
            Our offerings
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl sm:text-2xl font-medium text-black mb-4">
              connecting-circle - where words touch, people connect, and growth happens
            </h3>
            <p className="text-base md:text-lg text-black mb-4">
              Looking for deep connections, honest conversations, and shared growth?
            </p>
            <p className="text-base md:text-lg text-black mb-4">
              connecting-circle invites you to experience new perspectives in a loving, queer-sensitive space – online & in person, in German & English, in open & closed groups.
            </p>
            <p className="text-base md:text-lg text-black">
              Together we can develop, learn, feel, play, grow, and be truly in connection.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              titleKey={service.titleKey}
              descriptionKey={service.descriptionKey}
              icon={service.icon}
              link={service.link}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

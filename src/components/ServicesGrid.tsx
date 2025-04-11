
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
        <div className="bg-circle-light p-3 rounded-full mr-3 text-black">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-black">{t(titleKey)}</h3>
      </div>
      
      <p className="text-black mb-4">{t(descriptionKey)}</p>
      
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
      icon: <Heart />,
      link: "/programs/authentic-relating",
      delay: 1
    },
    {
      titleKey: "service.authentic.english.title",
      descriptionKey: "service.authentic.english.desc",
      icon: <Video />,
      link: "/programs/arc-english",
      delay: 2
    },
    {
      titleKey: "service.authentic.german.title",
      descriptionKey: "service.authentic.german.desc",
      icon: <Globe />,
      link: "/programs/arc-german",
      delay: 3
    },
    {
      titleKey: "service.goldies.title",
      descriptionKey: "service.goldies.desc",
      icon: <Users />,
      link: "/programs/goldies",
      delay: 4
    },
    {
      titleKey: "service.private.title",
      descriptionKey: "service.private.desc",
      icon: <UserRound />,
      link: "/coaching/private-sessions",
      delay: 5
    },
    {
      titleKey: "service.workshops.title",
      descriptionKey: "service.workshops.desc",
      icon: <MapPin />,
      link: "/programs/workshops",
      delay: 6
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-black text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('services.offerings')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

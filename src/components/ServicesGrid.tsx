
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Video, Globe, UserRound, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link, delay }) => {
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
        <h3 className="text-lg sm:text-xl font-semibold text-black">{title}</h3>
      </div>
      
      <p className="text-sm sm:text-base text-black mb-4">{description}</p>
      
      <Link 
        to={link} 
        className="flex items-center text-circle hover:text-circle-dark font-medium transition-colors"
      >
        Read more <ArrowRight size={16} className="ml-1" />
      </Link>
    </motion.div>
  );
};

const ServicesGrid: React.FC = () => {
  const services = [
    {
      title: "Authentic Relating Circles",
      description: "Experience deep connection through structured exercises in a safe container.",
      icon: <Heart size={20} />,
      link: "/programs/authentic-relating",
      delay: 1
    },
    {
      title: "Online ARCs in English",
      description: "Join our virtual circles and connect with people from around the world.",
      icon: <Video size={20} />,
      link: "/programs/arc-english",
      delay: 2
    },
    {
      title: "ARCs in German",
      description: "Experience authentic relating in German language for local participants.",
      icon: <Globe size={20} />,
      link: "/programs/arc-german",
      delay: 3
    },
    {
      title: "The Goldies Circle",
      description: "A special group for seniors to connect and share wisdom across generations.",
      icon: <Users size={20} />,
      link: "/programs/goldies",
      delay: 4
    },
    {
      title: "Private Sessions",
      description: "One-on-one coaching for deeper personal work and individual growth.",
      icon: <UserRound size={20} />,
      link: "/coaching/private-sessions",
      delay: 5
    },
    {
      title: "Workshops & Events",
      description: "Special in-person events focused on specific relationship topics.",
      icon: <MapPin size={20} />,
      link: "/programs/workshops",
      delay: 6
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Offerings
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
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


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
        <div className="bg-circle-light p-3 rounded-full mr-3 text-circle-dark">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-circle-dark">{title}</h3>
      </div>
      
      <p className="text-foreground/80 mb-4">{description}</p>
      
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
      title: "Authentic Relating - Love and Sex",
      description: "A weekly live, in-person group in Berlin exploring authentic connections in love and intimate relationships.",
      icon: <Heart />,
      link: "/programs/authentic-relating",
      delay: 1
    },
    {
      title: "Authentic Relating in Community - English",
      description: "A 6-week, zoom course of 2 hours weekly. These run every quarter, connecting English speakers worldwide.",
      icon: <Video />,
      link: "/programs/arc-english",
      delay: 2
    },
    {
      title: "Authentic Relating in Community - German",
      description: "The same powerful ARC experience, but delivered entirely in German. Join our 6-week journey of connection.",
      icon: <Globe />,
      link: "/programs/arc-german",
      delay: 3
    },
    {
      title: "connecting-circle GOLDies",
      description: "An online German closed group meeting weekly via zoom with twice-yearly live weekends, running January-June and September-December.",
      icon: <Users />,
      link: "/programs/goldies",
      delay: 4
    },
    {
      title: "Private Sessions",
      description: "Individual or couples counseling providing a safe space to honestly explore relationships with yourself, loved ones, or the world.",
      icon: <UserRound />,
      link: "/coaching/private-sessions",
      delay: 5
    },
    {
      title: "Other Groups and Workshops",
      description: "Sophie leads regular groups and workshops in Berlin, including Cacao ceremonies and Findhorn Circle Dances & Sacred Dance.",
      icon: <MapPin />,
      link: "/programs/workshops",
      delay: 6
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-circle-dark text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Offerings
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

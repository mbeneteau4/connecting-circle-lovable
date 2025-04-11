
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <img 
                  src="https://connecting-circle.de/wp-content/uploads/2024/02/0105AC7A-DF00-4C7E-AC81-2E5A602CE272.webp" 
                  alt="Sophie Nicole Lemerle McGrath" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-3xl md:text-4xl font-semibold text-circle-dark mb-6">
                  Sophie N. Lemerle-McGrath
                </h1>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-circle-dark mb-4">Credentials</h2>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>Founder of connecting-circle (live groups in Berlin and globally)</li>
                    <li>Gestalt Facilitator</li>
                    <li>Authentic Relating (AR) Facilitator</li>
                    <li>Mediator</li>
                    <li>"Getting-Real" Coach</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-circle-dark mb-4">About Me</h2>
                  <p className="text-foreground/80 mb-4">
                    I want to open spaces, illuminated by the light of love, where you can be free to experience, 
                    unfold, and feel. Spaces where we learn together to express what moves us deep inside.
                  </p>
                  <p className="text-foreground/80 mb-4">
                    All my life I have been fascinated by interpersonal dynamics and the question of what 
                    constitutes a strong foundation in relationships of all kinds - private or professional. 
                    Can we learn to love? How do we use conflicts as learning opportunities and transform 
                    conflict energy into more connection?
                  </p>
                  <p className="text-foreground/80 mb-4">
                    My work is deeply influenced by the teaching & love of Martin and Annette Rubeau, 
                    the Gefühlsschule (School of Feelings) and the Gefühlsschulgemeinschaft (School of Feelings Community).
                  </p>
                  <p className="text-foreground/80 mb-4">
                    I also learn from and with Susan Campbell PhD, and through her work: "Getting Real" et al.
                  </p>
                  <p className="text-foreground/80">
                    The authentic revolution movement and the circling community inspire me, and authentic relating 
                    and AR-games are part of my repertoire. This influence also enriches the connecting-circle and my life.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-semibold text-circle-dark text-center mb-12">
              Testimonials
            </h2>
            
            <div className="bg-circle-light/30 p-8 rounded-lg text-center">
              <p className="text-lg italic text-foreground/80 mb-4">
                "Testimonials will be added here."
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

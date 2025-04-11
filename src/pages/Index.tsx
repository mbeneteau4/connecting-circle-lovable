import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-circle-dark mb-6">
              Welcome to Our Platform
            </h1>
            <div className="w-24 h-1 bg-circle mx-auto mb-6"></div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Explore our services and discover how we can help you achieve your goals.
            </p>
            <div className="mt-10">
              <Button>Get Started</Button>
              <Button 
                variant="outline" 
                className="ml-4"
                asChild
              >
                <a href="/text-editor">Text Editor Tool</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Service 1</h3>
                <p className="text-foreground/80">
                  Description of Service 1.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Service 2</h3>
                <p className="text-foreground/80">
                  Description of Service 2.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Service 3</h3>
                <p className="text-foreground/80">
                  Description of Service 3.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

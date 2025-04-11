
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TextEditor from '@/components/TextEditor';
import { useToast } from '@/hooks/use-toast';

const TextEditorDemo = () => {
  const [savedText, setSavedText] = useState<string>('');
  const { toast } = useToast();
  
  const handleSaveText = (text: string) => {
    setSavedText(text);
    toast({
      title: "Text saved",
      description: "Your text has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-circle-dark mb-6">
              Text Editor
            </h1>
            <div className="w-24 h-1 bg-circle mx-auto mb-6"></div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Edit text with simple formatting options.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Edit your text</h2>
              <TextEditor 
                initialValue="Here is some sample text that you can edit.\n\nTry selecting text and using markdown formatting:\n- **bold text** (between ** symbols)\n- *italic text* (between * symbols)\n- _underlined text_ (between _ symbols)"
                onSave={handleSaveText}
              />
              
              {savedText && (
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Saved Content</h3>
                  <div className="p-4 border rounded-md bg-muted/20">
                    <pre className="whitespace-pre-wrap font-sans">{savedText}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TextEditorDemo;

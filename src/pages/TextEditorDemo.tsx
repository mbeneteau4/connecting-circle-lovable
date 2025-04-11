
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TextEditor from '@/components/TextEditor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const TextEditorDemo = () => {
  const [savedText, setSavedText] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Default to admin mode for the demo
  const { toast } = useToast();
  
  const handleSaveText = (text: string) => {
    setSavedText(text);
    toast({
      title: "Text saved",
      description: "Your text has been saved successfully",
    });
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    toast({
      title: isAdmin ? "Admin mode disabled" : "Admin mode enabled",
      description: isAdmin 
        ? "Advanced editing features are now hidden" 
        : "You now have access to advanced editing features",
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
              Edit text with advanced formatting options.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container-custom max-w-3xl">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Edit your text</h2>
                <Button 
                  variant={isAdmin ? "default" : "outline"} 
                  onClick={toggleAdminMode}
                >
                  {isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
                </Button>
              </div>
              
              <TextEditor 
                initialValue="Here is some sample text that you can edit.\n\nTry selecting text and using markdown formatting:\n- **bold text** (between ** symbols)\n- *italic text* (between * symbols)\n- _underlined text_ (between _ symbols)\n\nWith admin mode enabled, you can also copy, paste, erase, undo, and redo."
                onSave={handleSaveText}
                isAdmin={isAdmin}
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

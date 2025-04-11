
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import TextEditor from '@/components/TextEditor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const Book = () => {
  const { t } = useLanguage();
  const [savedText, setSavedText] = useState<string>('Start writing here...');
  const [savedHtml, setSavedHtml] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleSaveText = (text: string) => {
    setSavedText(text);
    setIsEditing(false);
    
    // Convert the text to HTML (reusing the same conversion logic)
    let html = text;
    
    // Convert headings
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    
    // Convert bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert underline
    html = html.replace(/_(.+?)_/g, '<u>$1</u>');
    
    // Convert links
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    
    // Convert unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>(\n|$))+/g, '<ul>$&</ul>');
    
    // Convert ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>(\n|$))+/g, (match) => {
      // Only convert to ordered list if not already wrapped in <ul>
      return match.includes('<ul>') ? match : '<ol>' + match + '</ol>';
    });
    
    // Convert paragraphs (any line not already converted)
    const paragraphs = html.split('\n');
    html = paragraphs.map(p => {
      // Skip if it's already a block element
      if (p.match(/<(h[1-6]|ul|ol|li|div|p|blockquote)/)) return p;
      if (p.trim() === '') return '';
      return `<p>${p}</p>`;
    }).join('');
    
    setSavedHtml(html);
    
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-circle-dark mb-6">
              {t('nav.book')}
            </h1>
            <div className="w-24 h-1 bg-circle mx-auto mb-6"></div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Write your content below and see it transformed into formatted text.
            </p>
          </div>
        </section>
        
        {/* Text Editor Section */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Write your content</h2>
              
              {isEditing ? (
                <TextEditor 
                  initialValue={savedText}
                  onSave={handleSaveText}
                  isAdmin={false}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div 
                  className="cursor-text p-4 border rounded-md bg-white min-h-[200px] relative"
                  onClick={() => setIsEditing(true)}
                >
                  {savedHtml ? (
                    <div 
                      className="prose max-w-none" 
                      dangerouslySetInnerHTML={{ __html: savedHtml }}
                    />
                  ) : (
                    <div className="text-muted-foreground">{savedText}</div>
                  )}
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                    Click to edit
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

export default Book;

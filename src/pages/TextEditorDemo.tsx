import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TextEditor from '@/components/TextEditor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TextEditorDemo = () => {
  const [savedText, setSavedText] = useState<string>('');
  const [savedHtml, setSavedHtml] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Changed default to false (non-admin mode)
  const { toast } = useToast();
  
  const handleSaveText = (text: string) => {
    setSavedText(text);
    
    // Convert the text to HTML
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

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    toast({
      title: isAdmin ? "Admin mode disabled" : "Admin mode enabled",
      description: isAdmin 
        ? "Advanced editing features are now hidden" 
        : "You now have access to advanced editing features",
    });
  };

  const sampleText = `# Welcome to the Advanced Editor

This is a **WYSIWYG**-like editor with *markdown-style* formatting.

## Formatting Options

You can create various text formats:
- **Bold text** with **double asterisks**
- *Italic text* with *single asterisks*
- _Underlined text_ with _underscores_

### Lists

You can create lists:
- Item 1
- Item 2
- Item 3

Or numbered lists:
1. First item
2. Second item
3. Third item

## Links

You can add [links to websites](https://example.com)

---

With admin mode enabled, you can:
- Copy and paste text
- View the generated HTML code
- Use keyboard shortcuts
- Undo and redo changes`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-circle-light/50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-circle-dark mb-6">
              Advanced Text Editor
            </h1>
            <div className="w-24 h-1 bg-circle mx-auto mb-6"></div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Write content with formatting and see the generated HTML code.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Write your content</h2>
                <Button 
                  variant={isAdmin ? "default" : "outline"} 
                  onClick={toggleAdminMode}
                >
                  {isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
                </Button>
              </div>
              
              <div className="mb-6 bg-muted/20 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Instructions:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Write content in the editor using markdown-style formatting</li>
                  <li>Use the toolbar to format text or insert elements</li>
                  <li>View the rendered preview in the "Preview" tab</li>
                  <li>See and copy the generated HTML code in the "HTML Code" tab</li>
                  <li>Toggle "Admin Mode" to access advanced features</li>
                </ul>
              </div>
              
              <TextEditor 
                initialValue={sampleText}
                onSave={handleSaveText}
                isAdmin={isAdmin}
              />
              
              {savedText && (
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Saved Content</h3>
                  
                  <Tabs defaultValue="raw">
                    <TabsList>
                      <TabsTrigger value="raw">Raw Text</TabsTrigger>
                      <TabsTrigger value="html">HTML Code</TabsTrigger>
                      <TabsTrigger value="rendered">Rendered HTML</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="raw" className="pt-4">
                      <div className="p-4 border rounded-md bg-muted/20">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{savedText}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="html" className="pt-4">
                      <div className="p-4 border rounded-md bg-muted/20">
                        <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">{savedHtml}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rendered" className="pt-4">
                      <div 
                        className="p-4 border rounded-md bg-white prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: savedHtml }}
                      />
                    </TabsContent>
                  </Tabs>
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

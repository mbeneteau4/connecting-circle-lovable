
import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Copy, Clipboard, Eraser, Undo, Redo, Code, AlignLeft, AlignCenter, AlignRight, Link, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TextEditorProps {
  initialValue?: string;
  placeholder?: string;
  onSave?: (value: string) => void;
  className?: string;
  isAdmin?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialValue = '',
  placeholder = 'Start typing...',
  onSave,
  className,
  isAdmin = false,
}) => {
  const [text, setText] = useState(initialValue);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [previousText, setPreviousText] = useState<string[]>([initialValue]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Convert markdown-like syntax to HTML
  const convertToHtml = (text: string) => {
    if (!text) return '';
    
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
    
    return html;
  };
  
  // Update HTML output when text changes
  useEffect(() => {
    setHtmlOutput(convertToHtml(text));
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelection({ 
      start: target.selectionStart, 
      end: target.selectionEnd 
    });
  };

  const applyFormatting = (format: string, properties?: any) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;
    
    if (selStart === selEnd && ['bold', 'italic', 'underline'].includes(format)) {
      toast({
        title: "No text selected",
        description: "Please select some text to format",
      });
      return;
    }
    
    const selectedText = text.substring(selStart, selEnd);
    let formattedText = '';
    let cursorPosition = selEnd;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = selEnd + 4;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = selEnd + 2;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        cursorPosition = selEnd + 2;
        break;
      case 'heading1':
        // Insert at the beginning of the line
        const lineStartH1 = text.substring(0, selStart).lastIndexOf('\n') + 1;
        const lineTextH1 = text.substring(lineStartH1);
        formattedText = `# ${selectedText || lineTextH1}`;
        if (selectedText) {
          const newText = text.substring(0, lineStartH1) + formattedText + text.substring(selEnd);
          setText(newText);
          saveToHistory(newText);
          return;
        }
        cursorPosition = selStart + 2;
        break;
      case 'heading2':
        const lineStartH2 = text.substring(0, selStart).lastIndexOf('\n') + 1;
        const lineTextH2 = text.substring(lineStartH2);
        formattedText = `## ${selectedText || lineTextH2}`;
        if (selectedText) {
          const newText = text.substring(0, lineStartH2) + formattedText + text.substring(selEnd);
          setText(newText);
          saveToHistory(newText);
          return;
        }
        cursorPosition = selStart + 3;
        break;
      case 'heading3':
        const lineStartH3 = text.substring(0, selStart).lastIndexOf('\n') + 1;
        const lineTextH3 = text.substring(lineStartH3);
        formattedText = `### ${selectedText || lineTextH3}`;
        if (selectedText) {
          const newText = text.substring(0, lineStartH3) + formattedText + text.substring(selEnd);
          setText(newText);
          saveToHistory(newText);
          return;
        }
        cursorPosition = selStart + 4;
        break;
      case 'list':
        // Insert at the beginning of the line
        const lineStart = text.substring(0, selStart).lastIndexOf('\n') + 1;
        formattedText = `- ${selectedText || ''}`;
        if (selectedText) {
          // For multiple lines, add list marker to each line
          if (selectedText.includes('\n')) {
            formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
          }
        }
        cursorPosition = lineStart + 2 + (selectedText ? selectedText.length : 0);
        break;
      case 'orderedList':
        const olLineStart = text.substring(0, selStart).lastIndexOf('\n') + 1;
        formattedText = `1. ${selectedText || ''}`;
        if (selectedText) {
          // For multiple lines, add numbered list markers
          if (selectedText.includes('\n')) {
            formattedText = selectedText.split('\n').map((line, i) => `${i+1}. ${line}`).join('\n');
          }
        }
        cursorPosition = olLineStart + 3 + (selectedText ? selectedText.length : 0);
        break;
      case 'link':
        if (properties && properties.url) {
          formattedText = `[${selectedText || properties.text || 'Link text'}](${properties.url})`;
          cursorPosition = selStart + formattedText.length;
        } else {
          formattedText = `[${selectedText || 'Link text'}](https://example.com)`;
          cursorPosition = selStart + formattedText.length;
        }
        break;
      default:
        return;
    }
    
    const newText = 
      text.substring(0, selStart) + 
      formattedText + 
      text.substring(selEnd);
    
    saveToHistory(newText);
    setText(newText);
    
    // Set cursor position after the operation
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = cursorPosition;
        textareaRef.current.selectionEnd = cursorPosition;
      }
    }, 0);
  };

  const saveToHistory = (newText: string) => {
    // Trim history if we're not at the end (i.e., if we've used undo)
    const newHistory = previousText.slice(0, currentHistoryIndex + 1);
    // Add the new text to history and update the index
    setPreviousText([...newHistory, newText]);
    setCurrentHistoryIndex(newHistory.length);
  };

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setText(previousText[currentHistoryIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < previousText.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setText(previousText[currentHistoryIndex + 1]);
    }
  };

  const handleCopy = () => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;
    
    if (selStart === selEnd) {
      toast({
        title: "No text selected",
        description: "Please select some text to copy",
      });
      return;
    }
    
    const selectedText = text.substring(selStart, selEnd);
    navigator.clipboard.writeText(selectedText).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Selected text has been copied to clipboard",
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlOutput).then(() => {
      toast({
        title: "HTML copied to clipboard",
        description: "Generated HTML code has been copied to clipboard",
      });
    }).catch(err => {
      console.error('Failed to copy HTML: ', err);
    });
  };

  const handlePaste = async () => {
    if (!textareaRef.current) return;
    
    try {
      const clipboardText = await navigator.clipboard.readText();
      const cursorPos = textareaRef.current.selectionStart;
      
      const newText = 
        text.substring(0, cursorPos) + 
        clipboardText + 
        text.substring(cursorPos);
      
      saveToHistory(newText);
      setText(newText);
      
      // Update cursor position after paste
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = cursorPos + clipboardText.length;
          textareaRef.current.selectionEnd = cursorPos + clipboardText.length;
        }
      }, 0);
      
      toast({
        title: "Pasted from clipboard",
        description: "Text has been pasted from clipboard",
      });
    } catch (err) {
      console.error('Failed to paste text: ', err);
      toast({
        title: "Failed to paste",
        description: "Could not access clipboard",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    saveToHistory(text); // save current state before clearing
    setText('');
    toast({
      title: "Text cleared",
      description: "All text has been erased",
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(text);
    }
  };

  const handleInsertLink = () => {
    if (!textareaRef.current) return;
    
    const linkText = window.prompt("Enter link text:", "Link text") || "Link text";
    const linkUrl = window.prompt("Enter URL:", "https://") || "https://example.com";
    
    applyFormatting('link', { text: linkText, url: linkUrl });
  };

  // If not in editing mode and not admin, show the readonly view
  if (!isEditing && !isAdmin) {
    return (
      <div 
        className={cn("relative p-4 rounded-md border border-input bg-background cursor-text", className)}
        onClick={() => setIsEditing(true)}
      >
        {text ? (
          <div className="whitespace-pre-wrap">
            {text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line || <>&nbsp;</>}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground">{placeholder}</div>
        )}
        <div className="absolute top-2 right-2 text-xs text-muted-foreground">
          Click to edit
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border border-input rounded-md p-2", className)}>
      <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="p-0">
          <div className="flex items-center gap-2 mb-2 bg-muted/20 p-2 rounded flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Bold"
                  onClick={() => applyFormatting('bold')}
                >
                  <Bold size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2" side="bottom">
                <div className="text-xs">
                  Use <code className="bg-muted px-1">**text**</code> for bold text
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Italic"
                  onClick={() => applyFormatting('italic')}
                >
                  <Italic size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2" side="bottom">
                <div className="text-xs">
                  Use <code className="bg-muted px-1">*text*</code> for italic text
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Underline"
                  onClick={() => applyFormatting('underline')}
                >
                  <Underline size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2" side="bottom">
                <div className="text-xs">
                  Use <code className="bg-muted px-1">_text_</code> for underlined text
                </div>
              </PopoverContent>
            </Popover>

            <div className="h-6 w-px bg-border mx-1"></div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Heading 1"
              onClick={() => applyFormatting('heading1')}
            >
              <Heading1 size={16} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Heading 2"
              onClick={() => applyFormatting('heading2')}
            >
              <Heading2 size={16} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Heading 3"
              onClick={() => applyFormatting('heading3')}
            >
              <Heading3 size={16} />
            </Button>
            
            <div className="h-6 w-px bg-border mx-1"></div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Bulleted List"
              onClick={() => applyFormatting('list')}
            >
              <List size={16} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Numbered List"
              onClick={() => applyFormatting('orderedList')}
            >
              <ListOrdered size={16} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Insert Link"
              onClick={handleInsertLink}
            >
              <Link size={16} />
            </Button>

            {/* Admin functions */}
            {isAdmin && (
              <>
                <div className="h-6 w-px bg-border mx-1"></div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Copy"
                  onClick={handleCopy}
                >
                  <Copy size={16} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Paste"
                  onClick={handlePaste}
                >
                  <Clipboard size={16} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Clear"
                  onClick={handleClear}
                >
                  <Eraser size={16} />
                </Button>
                
                <div className="h-6 w-px bg-border mx-1"></div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Undo"
                  onClick={handleUndo}
                  disabled={currentHistoryIndex <= 0}
                >
                  <Undo size={16} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Redo"
                  onClick={handleRedo}
                  disabled={currentHistoryIndex >= previousText.length - 1}
                >
                  <Redo size={16} />
                </Button>

                <div className="h-6 w-px bg-border mx-1"></div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="View HTML"
                  onClick={() => setActiveTab("html")}
                >
                  <Code size={16} />
                </Button>
              </>
            )}
          </div>
          
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onSelect={handleTextareaSelect}
            placeholder={placeholder}
            className="min-h-[200px] resize-y"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="bg-white p-4 border rounded-md min-h-[200px]">
          <div 
            ref={previewRef}
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </TabsContent>
        
        <TabsContent value="html" className="p-0">
          <div className="flex items-center justify-between mb-2 bg-muted/20 p-2 rounded">
            <div className="text-sm font-medium">HTML Output</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyHtml}
              className="h-8"
            >
              <Copy size={14} className="mr-2" />
              Copy HTML
            </Button>
          </div>
          <Textarea
            value={htmlOutput}
            readOnly
            className="min-h-[200px] resize-y font-mono text-sm"
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-2 gap-2">
        <Button variant="outline" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;


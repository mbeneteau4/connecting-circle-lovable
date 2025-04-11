
import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, Copy, Clipboard, Eraser, Undo, Redo } from 'lucide-react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [previousText, setPreviousText] = useState<string[]>([initialValue]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
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

  const applyFormatting = (format: 'bold' | 'italic' | 'underline') => {
    if (!selection) return;
    
    const selectedText = text.substring(selection.start, selection.end);
    if (!selectedText) return;
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        break;
    }
    
    const newText = 
      text.substring(0, selection.start) + 
      formattedText + 
      text.substring(selection.end);
    
    saveToHistory(newText);
    setText(newText);
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
    if (!selection || selection.start === selection.end) return;
    
    const selectedText = text.substring(selection.start, selection.end);
    navigator.clipboard.writeText(selectedText).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Selected text has been copied to clipboard",
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
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

        {/* New functionality for admin editors */}
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

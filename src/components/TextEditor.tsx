
import React, { useState } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  initialValue?: string;
  placeholder?: string;
  onSave?: (value: string) => void;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialValue = '',
  placeholder = 'Start typing...',
  onSave,
  className,
}) => {
  const [text, setText] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);

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
    
    setText(newText);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(text);
    }
  };

  if (!isEditing) {
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
      <div className="flex items-center gap-2 mb-2 bg-muted/20 p-2 rounded">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Bold"
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
      </div>
      
      <Textarea
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

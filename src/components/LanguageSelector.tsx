
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center focus:outline-none">
        <Globe size={20} className="text-black" />
        <span className="ml-1 text-black uppercase">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem 
          className={`${language === 'en' ? 'bg-accent text-black' : 'text-black'}`}
          onClick={() => setLanguage('en')}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${language === 'de' ? 'bg-accent text-black' : 'text-black'}`}
          onClick={() => setLanguage('de')}
        >
          Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

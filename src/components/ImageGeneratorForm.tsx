import React, { useState, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';

interface ImageGeneratorFormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
}

const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "A cyberpunk city at night with neon lights...",
    "A serene landscape with mountains and a lake...",
    "An astronaut riding a horse on Mars...",
    "A futuristic sports car in a desert setting...",
    "A magical forest with glowing mushrooms and fairies..."
  ];
  
  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGenerating && prompt.trim()) {
      onGenerate();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="relative">
        <div className="flex">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              disabled={isGenerating}
              className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder-gray-500 text-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Sparkles size={18} className={isGenerating ? 'animate-pulse' : ''} />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={`px-6 py-3 rounded-r-lg flex items-center justify-center transition-all duration-300 ${
              isGenerating
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-500 active:bg-gray-700'
            }`}
          >
            {isGenerating ? (
              <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-400">
        Try to be descriptive and include details like style, lighting, and composition.
      </div>
    </form>
  );
};

export default ImageGeneratorForm;
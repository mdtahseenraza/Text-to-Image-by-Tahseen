import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Clock } from 'lucide-react';

interface ImageDisplayProps {
  image: string;
  isGenerating: boolean;
  prompt: string;
  timer: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  image,
  isGenerating,
  prompt,
  timer
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset loaded state when image changes
    if (image) {
      setIsLoaded(false);
      
      // Add a small delay for animation purposes
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const downloadImage = () => {
    if (!image || isGenerating) return;
    
    const link = document.createElement('a');
    link.href = image;
    link.download = `image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-black/40 aspect-square max-h-[512px] w-full flex items-center justify-center">
      {/* Timer overlay when generating */}
      {isGenerating && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center z-10">
          <Clock size={14} className="mr-1 text-cyan-400" />
          <span>{formatTime(timer)}</span>
        </div>
      )}
      
      {/* Loading overlay */}
      {isGenerating && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/60 backdrop-blur-sm">
          <RefreshCw size={48} className="text-cyan-400 animate-spin mb-4" />
          <p className="text-center max-w-md px-6">
            <span className="text-lg font-medium">Creating your masterpiece</span>
            <span className="block mt-2 text-sm text-gray-400">
              {prompt ? `"${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"` : 'Processing...'}
            </span>
          </p>
        </div>
      )}
      
      {/* Image */}
      <img
        src={image}
        alt={prompt || 'Generated image'}
        onLoad={handleImageLoad}
        className={`max-h-full max-w-full object-contain transition-all duration-700 ${
          isLoaded && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
      
      {/* Download button */}
      {!isGenerating && isLoaded && (
        <button
          onClick={downloadImage}
          className="absolute bottom-4 right-4 p-2 bg-black/70 hover:bg-black/90 rounded-full transition-all duration-300 text-white"
          title="Download image"
        >
          <Download size={20} />
        </button>
      )}
    </div>
  );
};

export default ImageDisplay;
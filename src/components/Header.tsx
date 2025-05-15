import React, { useEffect, useState } from 'react';
import { ImageIcon, Sparkles, Github, Linkedin, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[40vh] flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />
      
      <header className="pt-20 pb-10 px-6 text-center relative">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="block text-white mb-4">Text to Image Generator</span>
              <span className="text-4xl md:text-5xl block text-gray-400 font-light">
                by Md. Tahseen Raza
              </span>
            </h1>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl mb-8">
              Transform your imagination into stunning visuals with our advanced AI-powered image generation tool
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
              <a 
                href="https://github.com/mdtahseenraza" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/md-tahseen-raza/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://portfolio-tahseen.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Globe size={20} />
                <span>Portfolio</span>
              </a>
            </div>

           </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-0 left-[10%] w-64 h-64 bg-gray-700/20 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-gray-800/20 rounded-full filter blur-3xl animate-float-delayed" />
        </div>
      </header>

      <div className="w-full h-24 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </div>
  );
};

export default Header;
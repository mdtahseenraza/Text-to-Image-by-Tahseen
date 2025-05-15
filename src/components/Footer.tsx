import React from 'react';
import { Heart, Github, Twitter, Linkedin, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 bg-black/60 backdrop-blur-md border-t border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
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
          
          <div className="flex items-center text-sm text-gray-400">
            <p className="flex items-center">
              Made by Md. Tahseen Raza
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import ImageGeneratorForm from './components/ImageGeneratorForm';
import ImageDisplay from './components/ImageDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import AdvancedSettings from './components/AdvancedSettings';
import HistoryPanel from './components/HistoryPanel';
import { ImageHistoryItem } from './types';
import './index.css';

// Your Hugging Face API key (move to environment variables for production)
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('/placeholder.jpg');
  const [isGenerating, setIsGenerating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ImageHistoryItem[]>([]);
  const [settings, setSettings] = useState({
    negativePrompt: '',
    width: 1024,
    height: 1024,
    guidance: 5.0,
    steps: 28,
    seed: Math.floor(Math.random() * 1000000),
    randomizeSeed: true
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating && timer >= 0) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isGenerating, timer]);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    const previousImage = image;
    setIsGenerating(true);
    setTimer(0);
    
    if (settings.randomizeSeed) {
      setSettings(prev => ({
        ...prev,
        seed: Math.floor(Math.random() * 1000000)
      }));
    }
    
    const defaultKeywords = "high quality, 8k, high details, real, realistic";
    const finalPrompt = `${prompt.trim()}, ${defaultKeywords}`;
    const negativePrompt = settings.negativePrompt || "low quality, blurry, distorted";

    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: finalPrompt,
          parameters: {
            negative_prompt: negativePrompt,
            width: settings.width,
            height: settings.height,
            guidance_scale: settings.guidance,
            num_inference_steps: settings.steps,
            seed: settings.seed
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText} (${response.status})`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
      
      const newHistoryItem: ImageHistoryItem = {
        id: Date.now().toString(),
        prompt: prompt,
        imageUrl: imageUrl,
        timestamp: new Date(),
        settings: { ...settings }
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      alert("Please enter a meaningful prompt or try again later");
      setImage(previousImage);
    } finally {
      setIsGenerating(false);
    }
  };

  const loadFromHistory = (historyItem: ImageHistoryItem) => {
    setPrompt(historyItem.prompt);
    setImage(historyItem.imageUrl);
    setSettings(historyItem.settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50">
          <ImageGeneratorForm 
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={generateImage}
            isGenerating={isGenerating}
          />
          
          <div className="mt-4">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-gray-300 hover:text-white transition-colors text-sm"
            >
              <Settings size={16} className="mr-1" />
              Advanced Settings
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {showAdvanced && (
              <div className="mt-4 animate-fadeIn">
                <AdvancedSettings 
                  settings={settings}
                  setSettings={setSettings}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col lg:flex-row items-start justify-center gap-6 max-w-7xl">
        <div className="w-full lg:w-3/4 bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700/50">
          <div className="mb-8">
            <ImageDisplay 
              image={image} 
              isGenerating={isGenerating} 
              prompt={prompt}
              timer={timer} 
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/4">
          <HistoryPanel 
            history={history}
            onSelectItem={loadFromHistory}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
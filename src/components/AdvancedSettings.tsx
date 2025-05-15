import React from 'react';
import { ImageSettings } from '../types';
import { Dices } from 'lucide-react';

interface AdvancedSettingsProps {
  settings: ImageSettings;
  setSettings: React.Dispatch<React.SetStateAction<ImageSettings>>;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  setSettings
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setSettings(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }
    
    if (type === 'number') {
      setSettings(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
      return;
    }
    
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const generateRandomSeed = () => {
    setSettings(prev => ({
      ...prev,
      seed: Math.floor(Math.random() * 1000000)
    }));
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800/50 space-y-4">
      <div>
        <label htmlFor="negativePrompt" className="block text-sm font-medium text-gray-300 mb-1">
          Negative Prompt
        </label>
        <textarea
          id="negativePrompt"
          name="negativePrompt"
          value={settings.negativePrompt}
          onChange={handleChange}
          rows={2}
          placeholder="Elements to avoid in the image (e.g., blurry, low quality, etc.)"
          className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder-gray-500 text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-300 mb-1">
            Width
          </label>
          <input
            type="number"
            id="width"
            name="width"
            value={settings.width}
            onChange={handleChange}
            min={256}
            max={1024}
            step={64}
            className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white"
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-1">
            Height
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={settings.height}
            onChange={handleChange}
            min={256}
            max={1024}
            step={64}
            className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guidance" className="block text-sm font-medium text-gray-300 mb-1">
            Guidance Scale ({settings.guidance})
          </label>
          <input
            type="range"
            id="guidance"
            name="guidance"
            value={settings.guidance}
            onChange={handleChange}
            min={1}
            max={20}
            step={0.1}
            className="w-full accent-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">How closely to follow the prompt (higher = more faithful)</p>
        </div>
        
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-300 mb-1">
            Steps ({settings.steps})
          </label>
          <input
            type="range"
            id="steps"
            name="steps"
            value={settings.steps}
            onChange={handleChange}
            min={10}
            max={50}
            step={1}
            className="w-full accent-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">Number of denoising steps (higher = better quality but slower)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <div className="flex justify-between">
            <label htmlFor="seed" className="block text-sm font-medium text-gray-300 mb-1">
              Seed
            </label>
            <button 
              onClick={generateRandomSeed}
              className="text-gray-400 hover:text-gray-300 text-xs flex items-center"
              type="button"
            >
              <Dices size={12} className="mr-1" />
              Randomize
            </button>
          </div>
          <div className="flex">
            <input
              type="number"
              id="seed"
              name="seed"
              value={settings.seed}
              onChange={handleChange}
              disabled={settings.randomizeSeed}
              className={`w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white ${
                settings.randomizeSeed ? 'opacity-50' : ''
              }`}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="randomizeSeed"
            name="randomizeSeed"
            checked={settings.randomizeSeed}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-700 text-gray-600 focus:ring-gray-500 bg-gray-900"
          />
          <label htmlFor="randomizeSeed" className="ml-2 block text-sm text-gray-300">
            Randomize seed for each generation
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
import React, { useState, useEffect } from 'react';
import { History, ChevronDown, Trash2, RefreshCw } from 'lucide-react';
import { ImageHistoryItem } from '../types';

interface HistoryPanelProps {
  history: ImageHistoryItem[];
  onSelectItem: (item: ImageHistoryItem) => void;
  showHistory: boolean;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelectItem,
  showHistory,
  setShowHistory
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  if (history.length === 0) {
    return (
      <div 
        className={`bg-gray-800/30 backdrop-blur-md rounded-xl p-4 shadow-xl border border-gray-700/50 transition-all duration-700 ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium flex items-center">
            <History size={18} className="mr-2 text-gray-400" /> 
            History
          </h3>
        </div>
        <p className="text-gray-400 text-sm italic">
          Your generation history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gray-800/30 backdrop-blur-md rounded-xl p-4 shadow-xl border border-gray-700/50 transition-all duration-700 ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-medium flex items-center cursor-pointer"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History size={18} className="mr-2 text-cyan-400" /> 
          History
          <ChevronDown 
            size={16} 
            className={`ml-1 transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} 
          />
        </h3>
        <div className="text-xs text-gray-400">
          {history.length} {history.length === 1 ? 'image' : 'images'}
        </div>
      </div>
      
      {showHistory && (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {history.map((item) => (
            <div 
              key={item.id}
              className="bg-gray-900/50 rounded-lg p-3 cursor-pointer hover:bg-gray-800/70 transition-colors duration-200 group"
              onClick={() => onSelectItem(item)}
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-black/30 relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <RefreshCw size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 line-clamp-1">{item.prompt}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTime(item.timestamp)}
                  </p>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <span>{item.settings.width}×{item.settings.height}</span>
                    <span>•</span>
                    <span>Steps: {item.settings.steps}</span>
                  </div>
                </div>
                <button 
                  className="p-1 text-gray-500 hover:text-red-400 self-start opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Delete functionality would go here
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
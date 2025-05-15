export interface ImageSettings {
  negativePrompt: string;
  width: number;
  height: number;
  guidance: number;
  steps: number;
  seed: number;
  randomizeSeed: boolean;
}

export interface ImageHistoryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: Date;
  settings: ImageSettings;
}
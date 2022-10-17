export interface SoundData {
  file: string;
  name: string;
  category: string;
  source: string;
}

export interface SoundButtonProps {
  sound: SoundData;
}
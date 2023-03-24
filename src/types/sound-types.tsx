export interface SoundData {
  file: string;
  name: string;
  tags: string[];
  duration: number;
}

export interface TagActionData {
  tag: string;
  tagSelected: boolean;
}

export interface SelectedSoundData {
  selectedSounds: SoundData[]
}

export enum TagEmojis {
  // Who
  AIRSOFT = "🌀",
  DELBERTINA = "🐠",
  JOE = "☕",
  ROBOSHEEP = "🐑",
  SUNSHINE = "🌻",
  // Types
  MUSICAL = "🎶",
  LAUGH = "😂",
  HOT = "🔥",
}

export enum SortEmojis {
  NAME = "💬",
  WHO = "👤",
  DURATION = "📏"
}

export const DefaultEmoji = "🎺";

export interface SoundData {
  file: string;
  name: string;
  tags: string[];
  duration: number;
}

export const SoundDataSilence: SoundData = {
  file: 'SILENCE',
  name: 'Silence',
  tags: [],
  duration: 1
};

export interface TagActionData {
  tag: string;
  tagSelected: boolean;
}

export interface SelectedSoundData {
  selectedSounds: SoundData[];
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
  DURATION = "📏",
}

export const DefaultEmoji = "🎺";

export const EditIndicationEmoji = "⚙️"

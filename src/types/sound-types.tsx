export interface SoundData {
  file: string;
  name: string;
  tags: string[];
}

export interface FilterData {
  filterTag: string;
  filterSelected: boolean;
}

export enum TagEmojis {
  AIRSOFT = "🌀",
  JOE = "☕",
  ROBOSHEEP = "🐑",
  SUNSHINE = "🌻",
}

export const DefaultEmoji = "🎺";

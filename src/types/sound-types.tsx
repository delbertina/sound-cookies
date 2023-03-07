export interface SoundData {
  file: string;
  name: string;
  who: string;
  category: string;
  source: string;
}

export interface FilterData {
  filterWho: string;
  filterSelected: boolean;
}

export enum WhoEmojis {
  AIRSOFT = "🌀",
  JOE = "☕",
  SUNSHINE = "🌻",
}

export const DefaultEmoji = "🎺";

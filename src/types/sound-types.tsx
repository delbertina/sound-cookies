export interface SoundData {
  file: string;
  name: string;
  tags: string[];
}

export interface TagActionData {
  tag: string;
  tagSelected: boolean;
}

export enum TagEmojis {
  AIRSOFT = "🌀",
  DELBERTINA = "🐠",
  JOE = "☕",
  ROBOSHEEP = "🐑",
  SUNSHINE = "🌻",
}

export enum SortEmojis {
  NAME = "💬",
  WHO = "👤"
}

export const DefaultEmoji = "🎺";

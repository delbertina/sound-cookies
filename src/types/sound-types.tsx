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
  JOE = "☕",
  ROBOSHEEP = "🐑",
  SUNSHINE = "🌻",
  NAME = "💬",
  WHO = "👤"
}

export enum SortEmojis {
  NAME = "💬",
  WHO = "👤"
}

export const DefaultEmoji = "🎺";

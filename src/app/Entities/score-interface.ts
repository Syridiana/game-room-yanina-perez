import { Timestamp } from "firebase/firestore";

export interface ScoreI {
    userEmail?: string;
    userName?: string;
    game: string;
    savedAt: Timestamp | undefined;
    score?: number | string;
  }
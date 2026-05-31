import type { UnlockedWord } from "dragonspeak";

export const fallbackVocabulary: UnlockedWord[] = [
  {
    wordId: "huanying",
    hanzi: "欢迎",
    pinyin: "huanying",
    meaning: "welcome / добро пожаловать",
    status: "reviewing",
    unlockedAt: Date.now() - 1000 * 60 * 60,
  },
  {
    wordId: "guanglin",
    hanzi: "光临",
    pinyin: "guanglin",
    meaning: "to visit a shop / посетить заведение",
    status: "reviewing",
    unlockedAt: Date.now() - 1000 * 50,
  },
  {
    wordId: "he",
    hanzi: "喝",
    pinyin: "he",
    meaning: "to drink / пить",
    status: "new",
    unlockedAt: Date.now() - 1000 * 20,
  },
];

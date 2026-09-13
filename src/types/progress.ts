export interface KanaProgress {
  kanaId: string
  seen: number
  correct: number
  wrong: number
  currentStreak: number
  mastery: number
  lastReviewedAt?: string
}

export type KanaProgressMap = Record<string, KanaProgress>

export type MasteryStatus = 'new' | 'learning' | 'familiar' | 'mastered'

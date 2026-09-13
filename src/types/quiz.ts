import type { KanaGroup, KanaScript } from './kana'

export type QuizScript = KanaScript | 'mixed'
export type QuizDirection = 'kana-to-romaji' | 'romaji-to-kana' | 'mixed'

export interface QuizConfig {
  script: QuizScript
  questionCount: number
  direction: QuizDirection
  groups: KanaGroup[]
}

export interface QuizQuestion {
  id: string
  kanaId: string
  prompt: string
  promptLabel: string
  answer: string
  options: string[]
  direction: Exclude<QuizDirection, 'mixed'>
}

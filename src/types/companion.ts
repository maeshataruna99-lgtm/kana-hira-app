export type CompanionEvent = 'welcome' | 'correct' | 'wrong' | 'repeated_wrong' | 'quiz_complete' | 'perfect'

export type CompanionExpression = 'normal' | 'happy' | 'thinking' | 'worried' | 'cheer'

export interface CompanionState {
  event: CompanionEvent
  expression: CompanionExpression
  message: string
}

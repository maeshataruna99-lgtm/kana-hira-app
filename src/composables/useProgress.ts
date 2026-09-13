import { computed } from 'vue'
import { allKana, hiragana, katakana } from '../data/kana'
import type { Kana } from '../types/kana'
import type { KanaProgress, KanaProgressMap, MasteryStatus } from '../types/progress'
import { useLocalStorage } from './useLocalStorage'

const progress = useLocalStorage<KanaProgressMap>('kana.progress', {})

function emptyProgress(kanaId: string): KanaProgress {
  return { kanaId, seen: 0, correct: 0, wrong: 0, currentStreak: 0, mastery: 0 }
}

function calculateMastery(correct: number, wrong: number): number {
  const attempts = correct + wrong
  if (!attempts) return 0
  const accuracy = correct / attempts
  const experience = Math.min(1, attempts / 5)
  return Math.round(accuracy * experience * 100)
}

function statusFor(mastery: number): MasteryStatus {
  if (mastery <= 20) return 'new'
  if (mastery <= 50) return 'learning'
  if (mastery <= 80) return 'familiar'
  return 'mastered'
}

function averageMastery(items: Kana[]): number {
  if (!items.length) return 0
  return Math.round(items.reduce((total, kana) => total + (progress.value[kana.id]?.mastery ?? 0), 0) / items.length)
}

export function useProgress() {
  const totalCorrect = computed(() => Object.values(progress.value).reduce((sum, item) => sum + item.correct, 0))
  const totalWrong = computed(() => Object.values(progress.value).reduce((sum, item) => sum + item.wrong, 0))
  const accuracy = computed(() => {
    const attempts = totalCorrect.value + totalWrong.value
    return attempts ? Math.round((totalCorrect.value / attempts) * 100) : 0
  })
  const hiraganaMastery = computed(() => averageMastery(hiragana))
  const katakanaMastery = computed(() => averageMastery(katakana))
  const masteredCount = computed(() => allKana.filter((kana) => statusFor(progress.value[kana.id]?.mastery ?? 0) === 'mastered').length)
  const weakKana = computed(() =>
    allKana
      .filter((kana) => (progress.value[kana.id]?.wrong ?? 0) > 0)
      .sort((left, right) => {
        const leftProgress = progress.value[left.id] ?? emptyProgress(left.id)
        const rightProgress = progress.value[right.id] ?? emptyProgress(right.id)
        const leftScore = leftProgress.wrong * 2 - leftProgress.correct
        const rightScore = rightProgress.wrong * 2 - rightProgress.correct
        return rightScore - leftScore
      })
      .slice(0, 6),
  )

  function getProgress(kanaId: string): KanaProgress {
    return progress.value[kanaId] ?? emptyProgress(kanaId)
  }

  function getStatus(kanaId: string): MasteryStatus {
    return statusFor(getProgress(kanaId).mastery)
  }

  function recordAnswer(kanaId: string, correct: boolean) {
    const current = getProgress(kanaId)
    const next = {
      ...current,
      seen: current.seen + 1,
      correct: current.correct + (correct ? 1 : 0),
      wrong: current.wrong + (correct ? 0 : 1),
      currentStreak: correct ? current.currentStreak + 1 : 0,
      lastReviewedAt: new Date().toISOString(),
    }
    progress.value = { ...progress.value, [kanaId]: { ...next, mastery: calculateMastery(next.correct, next.wrong) } }
  }

  function resetProgress() {
    progress.value = {}
  }

  return { accuracy, getProgress, getStatus, hiraganaMastery, katakanaMastery, masteredCount, progress, recordAnswer, resetProgress, totalCorrect, totalWrong, weakKana }
}

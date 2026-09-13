import { computed, ref } from 'vue'
import { allKana, hiragana, katakana } from '../data/kana'
import type { Kana } from '../types/kana'
import type { KanaProgress } from '../types/progress'
import type { QuizConfig, QuizDirection, QuizQuestion } from '../types/quiz'
import { useProgress } from './useProgress'

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function weightedKana(items: Kana[], getProgress: (kanaId: string) => KanaProgress): Kana {
  const weightedItems = items.map((kana) => {
    const progress = getProgress(kana.id)
    const weakKanaBonus = Math.max(0, progress.wrong * 2 - progress.correct)
    const recentReviewBonus = progress.wrong > progress.correct && progress.lastReviewedAt && Date.now() - Date.parse(progress.lastReviewedAt) < 86_400_000 ? 2 : 0
    return { kana, weight: 1 + progress.wrong + weakKanaBonus + recentReviewBonus }
  })
  const totalWeight = weightedItems.reduce((sum, item) => sum + item.weight, 0)
  let ticket = Math.random() * totalWeight
  for (const item of weightedItems) {
    ticket -= item.weight
    if (ticket <= 0) return item.kana
  }
  return weightedItems[weightedItems.length - 1].kana
}

function createQuestion(config: QuizConfig, questionNumber: number, getProgress: (kanaId: string) => KanaProgress): QuizQuestion {
  const source = config.script === 'hiragana' ? hiragana : config.script === 'katakana' ? katakana : allKana
  const eligible = source.filter((kana) => config.groups.includes(kana.group))
  const target = weightedKana(eligible.length ? eligible : source, getProgress)
  const direction: Exclude<QuizDirection, 'mixed'> =
    config.direction === 'mixed' ? (Math.random() > 0.5 ? 'kana-to-romaji' : 'romaji-to-kana') : config.direction
  const optionPool: Kana[] = config.script === 'mixed' ? allKana : source
  const valueFor = (kana: Kana) => (direction === 'kana-to-romaji' ? kana.romaji : kana.character)
  const answer = valueFor(target)
  const distractors = shuffle([...new Set(optionPool.map(valueFor).filter((value) => value !== answer))]).slice(0, 3)

  return {
    id: `${questionNumber}-${target.id}-${direction}`,
    kanaId: target.id,
    prompt: direction === 'kana-to-romaji' ? target.character : target.romaji,
    promptLabel: direction === 'kana-to-romaji' ? 'Apa bacaannya?' : 'Pilih kana yang benar.',
    answer,
    options: shuffle([answer, ...distractors]),
    direction,
  }
}

export function useQuiz() {
  const { getProgress } = useProgress()
  const questions = ref<QuizQuestion[]>([])
  const currentIndex = ref(0)
  const selectedAnswer = ref<string | null>(null)
  const correctAnswers = ref(0)
  const completed = ref(false)

  const currentQuestion = computed(() => questions.value[currentIndex.value])
  const hasAnswered = computed(() => selectedAnswer.value !== null)
  const answerIsCorrect = computed(() => selectedAnswer.value === currentQuestion.value?.answer)
  const score = computed(() => questions.value.length ? Math.round((correctAnswers.value / questions.value.length) * 100) : 0)

  function start(config: QuizConfig) {
    questions.value = Array.from({ length: config.questionCount }, (_, index) => createQuestion(config, index + 1, getProgress))
    currentIndex.value = 0
    selectedAnswer.value = null
    correctAnswers.value = 0
    completed.value = false
  }

  function selectAnswer(answer: string) {
    if (hasAnswered.value || !currentQuestion.value) return
    selectedAnswer.value = answer
    if (answer === currentQuestion.value.answer) correctAnswers.value += 1
  }

  function next() {
    if (!hasAnswered.value) return
    if (currentIndex.value === questions.value.length - 1) {
      completed.value = true
      return
    }
    currentIndex.value += 1
    selectedAnswer.value = null
  }

  function reset() {
    questions.value = []
    currentIndex.value = 0
    selectedAnswer.value = null
    correctAnswers.value = 0
    completed.value = false
  }

  return { answerIsCorrect, completed, correctAnswers, currentIndex, currentQuestion, hasAnswered, next, questions, reset, score, selectAnswer, selectedAnswer, start }
}

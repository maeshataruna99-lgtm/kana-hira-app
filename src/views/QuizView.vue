<script setup lang="ts">
import { ref } from 'vue'
import CompanionBubble from '../components/companion/CompanionBubble.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import AppShell from '../components/navigation/AppShell.vue'
import { kanaGroups } from '../data/kana'
import { useQuiz } from '../composables/useQuiz'
import { useProgress } from '../composables/useProgress'
import { useCompanion } from '../composables/useCompanion'
import { usePronunciation } from '../composables/usePronunciation'
import { useSettings } from '../composables/useSettings'
import type { KanaGroup } from '../types/kana'
import type { QuizConfig } from '../types/quiz'

const config = ref<QuizConfig>({ script: 'mixed', questionCount: 10, direction: 'kana-to-romaji', groups: [...kanaGroups] })
const { answerIsCorrect, completed, correctAnswers, currentIndex, currentQuestion, hasAnswered, next, questions, reset, score, selectAnswer, selectedAnswer, start } = useQuiz()
const { getProgress, recordAnswer } = useProgress()
const { companion, respond } = useCompanion()
const { settings } = useSettings()
const { speak, supported } = usePronunciation()

function toggleGroup(group: KanaGroup) {
  config.value.groups = config.value.groups.includes(group)
    ? config.value.groups.filter((selected) => selected !== group)
    : [...config.value.groups, group]
}

function beginQuiz() {
  if (!config.value.groups.length) return
  start(config.value)
  respond('welcome')
}

function answer(option: string) {
  if (hasAnswered.value || !currentQuestion.value) return
  const correct = option === currentQuestion.value.answer
  const currentProgress = getProgress(currentQuestion.value.kanaId)
  recordAnswer(currentQuestion.value.kanaId, correct)
  respond(correct ? 'correct' : currentProgress.wrong >= 2 ? 'repeated_wrong' : 'wrong')
  selectAnswer(option)
}

function advance() {
  const isLastQuestion = currentIndex.value === questions.value.length - 1
  const perfect = correctAnswers.value === questions.value.length
  next()
  if (isLastQuestion) respond(perfect ? 'perfect' : 'quiz_complete')
}

function speakCurrentKana() {
  if (currentQuestion.value?.direction === 'kana-to-romaji') speak(currentQuestion.value.prompt)
}
</script>

<template>
  <AppShell>
    <section v-if="!questions.length" class="page">
      <div class="section-heading"><div><p class="eyebrow">Siap latihan?</p><h1>Quiz Setup</h1></div></div>

      <section class="setup-block">
        <h2>Kana</h2>
        <div class="choice-row"><button :class="{ active: config.script === 'hiragana' }" @click="config.script = 'hiragana'">Hiragana</button><button :class="{ active: config.script === 'katakana' }" @click="config.script = 'katakana'">Katakana</button><button :class="{ active: config.script === 'mixed' }" @click="config.script = 'mixed'">Mixed</button></div>
      </section>
      <section class="setup-block">
        <h2>Jumlah Soal</h2>
        <div class="choice-row"><button v-for="count in [10, 20, 50, 100]" :key="count" :class="{ active: config.questionCount === count }" @click="config.questionCount = count">{{ count }}</button></div>
        <p class="helper-text">Sesi 100 soal akan merotasi semua kana pilihan terlebih dahulu, lalu beradaptasi pada kana yang masih perlu diulang.</p>
      </section>
      <section class="setup-block">
        <h2>Mode</h2>
        <div class="choice-row choice-row--wide"><button :class="{ active: config.direction === 'kana-to-romaji' }" @click="config.direction = 'kana-to-romaji'">Kana → Romaji</button><button :class="{ active: config.direction === 'romaji-to-kana' }" @click="config.direction = 'romaji-to-kana'">Romaji → Kana</button><button :class="{ active: config.direction === 'mixed' }" @click="config.direction = 'mixed'">Mixed</button></div>
      </section>
      <section class="setup-block">
        <div class="section-heading"><h2>Kelompok</h2><button class="text-button" type="button" @click="config.groups = [...kanaGroups]">Semua</button></div>
        <div class="group-choices"><button v-for="group in kanaGroups" :key="group" :class="{ active: config.groups.includes(group) }" @click="toggleGroup(group)">{{ group }}</button></div>
      </section>
      <p v-if="!config.groups.length" class="form-error">Pilih minimal satu kelompok kana.</p>
      <button class="primary-button" type="button" :disabled="!config.groups.length" @click="beginQuiz">Mulai Quiz</button>
    </section>

    <section v-else-if="!completed && currentQuestion" class="page page--quiz">
      <div class="section-heading"><div><p class="eyebrow">Quiz {{ config.script === 'mixed' ? 'campuran' : config.script }}</p><h1>Kenali kana</h1></div><span class="question-count">{{ currentIndex + 1 }} / {{ questions.length }}</span></div>
      <ProgressBar :value="((currentIndex + 1) / questions.length) * 100" />
      <div class="quiz-card"><p class="quiz-card__kana">{{ currentQuestion.prompt }}</p><p>{{ currentQuestion.promptLabel }}</p><button v-if="settings.pronunciation && currentQuestion.direction === 'kana-to-romaji'" class="audio-button audio-button--compact" type="button" :disabled="!supported" @click="speakCurrentKana">🔊 Dengarkan</button></div>
      <div class="options-grid">
        <button v-for="option in currentQuestion.options" :key="option" class="option-button" :class="{ selected: selectedAnswer === option, correct: hasAnswered && option === currentQuestion.answer, wrong: hasAnswered && selectedAnswer === option && option !== currentQuestion.answer }" :disabled="hasAnswered" @click="answer(option)">{{ option }}</button>
      </div>
      <p class="quiz-feedback" aria-live="polite">{{ !hasAnswered ? 'Pilih satu jawaban.' : answerIsCorrect ? 'Benar! Bagus sekali.' : `Belum tepat. Jawaban yang benar adalah ${currentQuestion.answer}.` }}</p>
      <button v-if="hasAnswered" class="primary-button" type="button" @click="advance">{{ currentIndex + 1 === questions.length ? 'Lihat Hasil' : 'Soal Berikutnya' }}</button>
      <CompanionBubble :compact="true" :message="companion.message" />
    </section>

    <section v-else class="page result-page">
      <p class="eyebrow">Quiz selesai</p>
      <div class="result-card"><span>🌸</span><h1>{{ score }}%</h1><p>{{ correctAnswers }} dari {{ questions.length }} jawaban benar</p></div>
      <CompanionBubble :message="companion.message" />
      <button class="primary-button" type="button" @click="reset">Atur Quiz Baru</button>
    </section>
  </AppShell>
</template>

import { computed } from 'vue'
import { useSettings } from './useSettings'

export function usePronunciation() {
  const { settings } = useSettings()
  const supported = computed(() => typeof window !== 'undefined' && 'speechSynthesis' in window)

  function speak(kana: string) {
    if (!settings.value.pronunciation || !supported.value) return false
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(kana)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.72
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
    return true
  }

  function stop() {
    if (supported.value) window.speechSynthesis.cancel()
  }

  return { speak, stop, supported }
}

import { computed } from 'vue'
import { getKanaAudioUrl } from '../data/kanaAudio'
import { useSettings } from './useSettings'

export function usePronunciation() {
  const { settings } = useSettings()
  const supported = computed(() => typeof window !== 'undefined' && ('Audio' in window || 'speechSynthesis' in window))
  let activeAudio: HTMLAudioElement | null = null

  function speakWithBrowser(kana: string) {
    if (!('speechSynthesis' in window)) return false
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(kana)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.72
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
    return true
  }

  async function speak(kana: string) {
    if (!settings.value.pronunciation || !supported.value) return false
    const audioUrl = getKanaAudioUrl(kana)
    if (audioUrl && 'Audio' in window) {
      try {
        activeAudio?.pause()
        activeAudio = new Audio(audioUrl)
        await activeAudio.play()
        return true
      } catch {
        // A browser voice is a useful fallback when remote audio is unavailable.
      }
    }
    return speakWithBrowser(kana)
  }

  function stop() {
    activeAudio?.pause()
    activeAudio = null
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }

  return { speak, stop, supported }
}

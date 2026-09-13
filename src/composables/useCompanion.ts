import { ref } from 'vue'
import { companionDialogues } from '../data/dialogues'
import type { CompanionEvent, CompanionState } from '../types/companion'

const state = ref<CompanionState>({
  event: 'welcome',
  expression: 'normal',
  message: 'Yuk, kita belajar satu langkah kecil hari ini. 🌸',
})

export function useCompanion() {
  function respond(event: CompanionEvent) {
    const options = companionDialogues[event]
    const dialogue = options[Math.floor(Math.random() * options.length)]
    state.value = { event, ...dialogue }
  }

  return { companion: state, respond }
}

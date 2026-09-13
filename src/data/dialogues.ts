import type { CompanionEvent, CompanionExpression } from '../types/companion'

export interface Dialogue {
  expression: CompanionExpression
  message: string
}

export const companionDialogues: Record<CompanionEvent, Dialogue[]> = {
  welcome: [
    { expression: 'normal', message: 'Tenang saja, ambil waktumu. Kita mulai, ya. 🌸' },
    { expression: 'normal', message: 'Satu soal demi satu soal. Kamu pasti bisa.' },
  ],
  correct: [
    { expression: 'happy', message: 'Benar. Kamu mengenali bentuknya dengan baik. 🌸' },
    { expression: 'happy', message: 'Bagus! Ritmemu mulai terasa lebih mantap.' },
  ],
  wrong: [
    { expression: 'thinking', message: 'Tidak apa-apa. Kita ulangi lagi nanti, ya.' },
    { expression: 'thinking', message: 'Yang ini memang sedikit membingungkan. Pelan-pelan saja.' },
  ],
  repeated_wrong: [
    { expression: 'worried', message: 'Kana ini masih membuatmu ragu. Nanti kita prioritaskan lagi, ya.' },
  ],
  quiz_complete: [
    { expression: 'cheer', message: 'Quiz selesai! Setiap jawaban adalah bagian dari progresmu. 🌸' },
  ],
  perfect: [
    { expression: 'cheer', message: 'Semuanya benar? Luar biasa sekali! Latihanmu membuahkan hasil. 🌸' },
  ],
}

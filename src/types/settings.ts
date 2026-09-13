export type KanaFont = 'noto-sans' | 'meiryo' | 'hiragino' | 'noto-serif'

export interface AppSettings {
  soundEffects: boolean
  pronunciation: boolean
  autoPronunciation: boolean
  companion: boolean
  animations: boolean
  kanaFont: KanaFont
}

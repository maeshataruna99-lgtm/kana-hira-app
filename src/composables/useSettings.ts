import { useLocalStorage } from './useLocalStorage'
import type { AppSettings, KanaFont } from '../types/settings'

const defaultSettings: AppSettings = {
  soundEffects: true,
  pronunciation: false,
  autoPronunciation: false,
  companion: true,
  animations: true,
  kanaFont: 'noto-sans',
}

const settings = useLocalStorage<AppSettings>('kana.settings', defaultSettings)

// Preserve the user's existing preferences when upgrading an older saved setting.
settings.value = { ...defaultSettings, ...settings.value }

export const kanaFontOptions: Array<{ value: KanaFont; label: string; description: string }> = [
  { value: 'noto-sans', label: 'Noto Sans JP', description: 'Jelas dan nyaman untuk pemula' },
  { value: 'meiryo', label: 'Meiryo', description: 'Tajam di layar Windows' },
  { value: 'hiragino', label: 'Hiragino Sans', description: 'Rapi di perangkat Apple' },
  { value: 'noto-serif', label: 'Noto Serif JP', description: 'Gaya cetak buku tradisional' },
]

export function useSettings() {
  return { settings }
}

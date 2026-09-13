import { useLocalStorage } from './useLocalStorage'
import type { AppSettings } from '../types/settings'

const defaultSettings: AppSettings = {
  soundEffects: true,
  pronunciation: false,
  companion: true,
  animations: true,
}

const settings = useLocalStorage<AppSettings>('kana.settings', defaultSettings)

export function useSettings() {
  return { settings }
}

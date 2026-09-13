import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, fallback: T): Ref<T> {
  const read = (): T => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? (JSON.parse(value) as T) : fallback
    } catch {
      return fallback
    }
  }

  const stored = ref<T>(read()) as Ref<T>

  watch(stored, (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The app still works in memory if storage is unavailable.
    }
  }, { deep: true })

  return stored
}

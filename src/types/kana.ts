export type KanaScript = 'hiragana' | 'katakana'

export type KanaGroup = 'A' | 'K' | 'S' | 'T' | 'N' | 'H' | 'M' | 'Y' | 'R' | 'W'

export interface Kana {
  id: string
  script: KanaScript
  character: string
  romaji: string
  group: KanaGroup
}

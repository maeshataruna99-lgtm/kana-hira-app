import type { Kana, KanaGroup, KanaScript } from '../types/kana'

export const kanaGroups: KanaGroup[] = ['A', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W']

const kanaRows: Array<{ group: KanaGroup; romaji: string[]; hiragana: string[]; katakana: string[] }> = [
  { group: 'A', romaji: ['a', 'i', 'u', 'e', 'o'], hiragana: ['あ', 'い', 'う', 'え', 'お'], katakana: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
  { group: 'K', romaji: ['ka', 'ki', 'ku', 'ke', 'ko'], hiragana: ['か', 'き', 'く', 'け', 'こ'], katakana: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
  { group: 'S', romaji: ['sa', 'shi', 'su', 'se', 'so'], hiragana: ['さ', 'し', 'す', 'せ', 'そ'], katakana: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
  { group: 'T', romaji: ['ta', 'chi', 'tsu', 'te', 'to'], hiragana: ['た', 'ち', 'つ', 'て', 'と'], katakana: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
  { group: 'N', romaji: ['na', 'ni', 'nu', 'ne', 'no'], hiragana: ['な', 'に', 'ぬ', 'ね', 'の'], katakana: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
  { group: 'H', romaji: ['ha', 'hi', 'fu', 'he', 'ho'], hiragana: ['は', 'ひ', 'ふ', 'へ', 'ほ'], katakana: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
  { group: 'M', romaji: ['ma', 'mi', 'mu', 'me', 'mo'], hiragana: ['ま', 'み', 'む', 'め', 'も'], katakana: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
  { group: 'Y', romaji: ['ya', 'yu', 'yo'], hiragana: ['や', 'ゆ', 'よ'], katakana: ['ヤ', 'ユ', 'ヨ'] },
  { group: 'R', romaji: ['ra', 'ri', 'ru', 're', 'ro'], hiragana: ['ら', 'り', 'る', 'れ', 'ろ'], katakana: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
  { group: 'W', romaji: ['wa', 'wo', 'n'], hiragana: ['わ', 'を', 'ん'], katakana: ['ワ', 'ヲ', 'ン'] },
]

function buildKana(script: KanaScript): Kana[] {
  return kanaRows.flatMap((row) =>
    row[script].map((character, index) => ({
      id: `${script}-${row.romaji[index]}`,
      script,
      character,
      romaji: row.romaji[index],
      group: row.group,
    })),
  )
}

export const hiragana = buildKana('hiragana')
export const katakana = buildKana('katakana')
export const allKana = [...hiragana, ...katakana]

export function getKanaByGroup(script: KanaScript, group: KanaGroup): Kana[] {
  return (script === 'hiragana' ? hiragana : katakana).filter((kana) => kana.group === group)
}

import { allKana } from './kana'

const sourceFileByRomaji: Record<string, string> = {
  a: 'Ja-A.oga', i: 'Japanese I.ogg', u: 'Japanese U.ogg', e: 'Ja-E.oga', o: 'Japanese O.ogg',
  ka: 'Japanese ka.ogg', ki: 'Japanese ki.ogg', ku: 'Japanese ku.ogg', ke: 'Japanese ke.ogg', ko: 'Japanese ko.ogg',
  sa: 'Japanese sa.ogg', shi: 'Japanese shi.ogg', su: 'Japanese su.ogg', se: 'Japanese se.ogg', so: 'Japanese so.ogg',
  ta: 'Japanese ta.ogg', chi: 'Japanese ti.ogg', tsu: 'Japanese tsu.ogg', te: 'Japanese te.ogg', to: 'Japanese to.ogg',
  na: 'Japanese na.ogg', ni: 'Japanese ni.ogg', nu: 'Japanese nu.ogg', ne: 'Japanese ne.ogg', no: 'Japanese no.ogg',
  ha: 'Japanese ha.ogg', hi: 'Japanese hi.ogg', fu: 'Japanese hu.ogg', he: 'Japanese he.ogg', ho: 'Japanese ho.ogg',
  ma: 'Japanese ma.ogg', mi: 'Japanese mi.ogg', mu: 'Japanese mu.ogg', me: 'Japanese me.ogg', mo: 'Japanese mo.ogg',
  ya: 'Japanese ya.ogg', yu: 'Japanese yu.ogg', yo: 'Japanese yo.ogg', ra: 'Japanese ra.ogg', ri: 'Japanese ri.ogg', ru: 'Japanese ru.ogg', re: 'Japanese re.ogg', ro: 'Japanese ro.ogg', wa: 'Japanese wa.ogg', wo: 'Japanese wo.ogg', n: 'Japanese N.ogg',
}

const sourceFileByCharacter = Object.fromEntries(
  allKana.map((kana) => [kana.character, sourceFileByRomaji[kana.romaji]]),
)

export function getKanaAudioUrl(character: string): string | null {
  const file = sourceFileByCharacter[character]
  return file ? `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}` : null
}

export const kanaAudioAttribution = {
  label: 'Wikimedia Commons — audio pelafalan kana (Domain Publik)',
  url: 'https://commons.wikimedia.org/wiki/Category:Audio_files_of_hiragana_(set_by_Hakatanoshio117117)',
}

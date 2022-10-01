const NO_OF_CHARS = 256;
export interface Data {
  bm: number;
  rgx: number;
}
export function searchWithBoyerMoore(txt: string | any[], pat: any) {
  let res = [];
  let m = pat.length;
  let n = txt.length;
  let badchar = new Array(NO_OF_CHARS);
  badCharHeuristic(pat, m, badchar);
  let s = 0;
  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pat[j] === txt[s + j]) j--;
    if (j < 0) {
      res.push(s);
      s += s + m < n ? m - badchar[txt[s + m].charCodeAt(0)] : 1;
    } else s += max(1, j - badchar[txt[s + j].charCodeAt(0)]);
  }
  return res;
}
function max(a: number, b: number) {
  return a > b ? a : b;
}

function badCharHeuristic(
  str: { [x: string]: string },
  size: number,
  badchar: any[]
) {
  for (let i = 0; i < NO_OF_CHARS; i++) badchar[i] = -1;
  for (let i = 0; i < size; i++) badchar[str[i].charCodeAt(0)] = i;
}
export const calcWinner = ({ bm, rgx }: Data): string => {
  if (bm === 0 || rgx === 0) return "-";
  return bm < rgx ? "Boyer Moore" : "Regex";
};

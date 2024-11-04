export function lastStringIndex(str: string, reg: RegExp) {
  const parts = str.split(reg);
  const lastPart = parts.pop();
  const index = str.lastIndexOf(lastPart!);
  return index;
}

export function trimClassType(str: string) {
  return str.slice(0, lastStringIndex(str, /[A-Z]/) - 1);
}

export function limitSymbol(text: string, number: number = 250): string {
  const str = [];
  for (let index = 0; text.length > index; index++) {
    if (index > number) {
      str.push("...");
      break;
    }
    str.push(text[index]);
  }

  return str.join("");
}

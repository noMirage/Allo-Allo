export const formatPhone = (digits: string, prefix: string) => {
  digits = digits.slice(0, 9);

  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 5);
  const part3 = digits.slice(5, 9);

  let formatted = prefix;
  if (part1) formatted += " " + part1;
  if (part2) formatted += " " + part2;
  if (part3) formatted += " " + part3;

  return formatted;
};

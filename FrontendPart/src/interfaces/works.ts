export interface IBaseinfoWorkers {
  id: number;
  title: string;
  text: string;
  logo: string;
  rating: number;
  reviews: number;
}

export type TMajors =
  | "сантехнік"
  | "зварювальник"
  | "будівельник"
  | "електрик"
  | "перевізник"
  | "мебельник";

export interface IBaseinfoWorkers {
  id: number;
  title: string;
  text: string;
  logo: string;
  rating: number;
  reviews: number;
}

export type TCategoryWorks =
  | "сантехніка"
  | "зварювання"
  | "електрика"
  | "перевізник"
  | "збирання меблів";

export type TMajors =
  | "сантехнік"
  | "зварювальник"
  | "будівельник"
  | "електрик"
  | "перевізник"
  | "мебельник";

import { IUser } from "./user";

export type TCategory = {
  created_at: string;
  id: number;
  name: TCategoryWorks;
  slug: string;
  updated_at: string;
};

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

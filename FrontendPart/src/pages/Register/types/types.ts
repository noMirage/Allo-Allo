export type TConditionResponses =
  | "Користувача знайдено"
  | "Код підтвердження надіслано на email";

export type TMajors =
  | "сантехнік"
  | "зварювальник"
  | "будівельник"
  | "електрик"
  | "перевізник"
  | "мебельник";

export interface IFieldUser {
  name: string;
  surname: string;
  phone: string;
  majors: TMajors | "";
  [key: string]: string | TMajors | "";
}

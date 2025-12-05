import { TMajors } from "../../../interfaces/works";

export type TConditionResponses =
  | "Користувача знайдено"
  | "Код підтвердження надіслано на email";

export interface IFieldUser {
  name: string;
  surname: string;
  phone: string;
  majors: TMajors | "";
  [key: string]: string | TMajors | "";
}

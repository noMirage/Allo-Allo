import { TMajors } from "../../../interfaces/works";
export interface IFieldUser {
  name: string;
  surname: string;
  phone: string;
  majors: TMajors | "";
  [key: string]: string | TMajors | "";
}

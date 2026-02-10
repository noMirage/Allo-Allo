import { TCategoryWorks } from "../../../interfaces/works";

export type TUserDataVacancy = {
  category: TCategoryWorks;
  title: string;
  description: string;
  images: string;
  [key: string]: TCategoryWorks | string;
};

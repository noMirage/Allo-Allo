import { TCategoryWorks } from "../interfaces/works";

export type TWorks = {
  category: TCategoryWorks;
  icon: string;
  to: string;
};

export type TNavigationLinks = {
  name: string;
  to: string;
  icon: string;
};

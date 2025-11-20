import { TNavigationLinks } from "./types";
import contacts from "../assets/Header/contacts.svg";
import aboutUs from "../assets/Header/aboutUs.svg";
import vacancy from "../assets/Header/vacancy.svg";
import works from "../assets/Header/works.svg";
import { ABOUT_US_PATH, CONTACTS_PATH, VACANCIES_PATH } from "../routs/routs";

export const NAVIGATION_LINKS: TNavigationLinks[] = [
  { name: "Послуги", to: "", icon: works },
  { name: "Вакансії", to: VACANCIES_PATH, icon: vacancy },
  { name: "Про нас", to: ABOUT_US_PATH, icon: aboutUs },
  { name: "Контакти", to: CONTACTS_PATH, icon: contacts },
];

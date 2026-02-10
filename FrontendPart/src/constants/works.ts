import carrier from "../assets/global/carrier.svg";
import engineering from "../assets/global/engineering.svg";
import furniture from "../assets/global/furniture.svg";
import plumber from "../assets/global/plumber.svg";
import welding from "../assets/global/welding.svg";
import { TMajors } from "../interfaces/works";
import { ORDER_WORK_PATH } from "../routs/routs";
import { TWorks } from "./types";


export const WORKS: TWorks[] = [
  { category: "сантехніка", icon: plumber, to: `${ORDER_WORK_PATH}/сантехніка` },
  { category: "зварювання", icon: welding, to: `${ORDER_WORK_PATH}/зварювання` },
  { category: "електрика", icon: engineering, to: `${ORDER_WORK_PATH}/електрика` },
  { category: "перевізник", icon: carrier, to: `${ORDER_WORK_PATH}/перевізник` },
  {
    category: "збирання меблів",
    icon: furniture,
    to: `${ORDER_WORK_PATH}/збирання меблів`,
  },
];

export const MAJORS: TMajors[] = [
  "будівельник",
  "електрик",
  "зварювальник",
  "мебельник",
  "перевізник",
  "сантехнік",
];

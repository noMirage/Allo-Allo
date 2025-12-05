import carrier from "../assets/global/carrier.svg";
import engineering from "../assets/global/engineering.svg";
import furniture from "../assets/global/furniture.svg";
import plumber from "../assets/global/plumber.svg";
import welding from "../assets/global/welding.svg";
import { TMajors } from "../interfaces/works";
import { ORDER_WORK_PATH } from "../routs/routs";
import { TWorks } from "./types";

export const WORKS: TWorks[] = [
  { name: "сантехніка", icon: plumber, to: `${ORDER_WORK_PATH}/сантехніка` },
  { name: "зварювання", icon: welding, to: `${ORDER_WORK_PATH}/зварювання` },
  { name: "електрика", icon: engineering, to: `${ORDER_WORK_PATH}/електрика` },
  { name: "перевізник", icon: carrier, to: `${ORDER_WORK_PATH}/перевізник` },
  {
    name: "збирання меблів",
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

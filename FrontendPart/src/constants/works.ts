import carrier from "../assets/global/carrier.svg";
import engineering from "../assets/global/engineering.svg";
import furniture from "../assets/global/furniture.svg";
import plumber from "../assets/global/plumber.svg";
import welding from "../assets/global/welding.svg";
import build from "../assets/Header/works.svg";
import painter from "../assets/global/painter.svg";
import mechanic from "../assets/global/mechanic.svg";
import { TMajors } from "../interfaces/works";
import { ORDER_WORK_PATH } from "../routs/routs";
import { TWorks } from "./types";

export const WORKS: TWorks[] = [
  {
    category: "сантехніка",
    icon: plumber,
    to: `${ORDER_WORK_PATH}/сантехніка`,
  },
  {
    category: "зварювання",
    icon: welding,
    to: `${ORDER_WORK_PATH}/зварювання`,
  },
  {
    category: "електрика",
    icon: engineering,
    to: `${ORDER_WORK_PATH}/електрика`,
  },
  {
    category: "перевізник",
    icon: carrier,
    to: `${ORDER_WORK_PATH}/перевізник`,
  },
  {
    category: "збирання меблів",
    icon: furniture,
    to: `${ORDER_WORK_PATH}/збирання меблів`,
  },
  {
    category: "будівництво",
    icon: build,
    to: `${ORDER_WORK_PATH}/будівництво`,
  },
  {
    category: "фарбування",
    icon: painter,
    to: `${ORDER_WORK_PATH}/фарбування`,
  },
  {
    category: "ремонт машин",
    icon: mechanic,
    to: `${ORDER_WORK_PATH}/ремонт машин`,
  },
];

export const MAJORS: TMajors[] = [
  "будівельник",
  "електрик",
  "зварювальник",
  "мебельник",
  "перевізник",
  "сантехнік",
  "механік",
  "маляр",
];
